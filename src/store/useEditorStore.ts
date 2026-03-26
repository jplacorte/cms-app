import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

export type EditorBlock = {
  id: string;
  type: string;
  data: any;
  children?: EditorBlock[]; // <-- The magic key for nesting!
};

interface EditorState {
  title: string;
  slug: string;
  blocks: EditorBlock[];
  activeBlockId: string | null;

  setTitle: (title: string) => void;
  setSlug: (slug: string) => void;
  setActiveBlock: (id: string | null) => void;

  // Notice we added an optional parentId so you can add blocks directly inside sections
  addBlock: (type: string, initialData?: any, parentId?: string | null) => void;
  updateBlock: (id: string, newData: any) => void;
  removeBlock: (id: string) => void;
  // Reordering in a tree requires knowing WHICH array the block is currently in
  reorderBlocks: (
    containerId: string | null,
    oldIndex: number,
    newIndex: number,
  ) => void;
  moveBlockBetweenContainers: (
    activeId: string,
    overContainerId: string | null,
    newIndex: number,
  ) => void;
}

// --- Recursive Helpers ---
const updateInTree = (
  blocks: EditorBlock[],
  id: string,
  newData: any,
): EditorBlock[] => {
  return blocks.map((block) => {
    if (block.id === id)
      return { ...block, data: { ...block.data, ...newData } };
    if (block.children)
      return { ...block, children: updateInTree(block.children, id, newData) };
    return block;
  });
};

const removeFromTree = (blocks: EditorBlock[], id: string): EditorBlock[] => {
  return blocks
    .filter((b) => b.id !== id)
    .map((b) => ({
      ...b,
      children: b.children ? removeFromTree(b.children, id) : [],
    }));
};

const addToTree = (
  blocks: EditorBlock[],
  parentId: string,
  newBlock: EditorBlock,
): EditorBlock[] => {
  return blocks.map((block) => {
    if (block.id === parentId) {
      return { ...block, children: [...(block.children || []), newBlock] };
    }
    if (block.children) {
      return {
        ...block,
        children: addToTree(block.children, parentId, newBlock),
      };
    }
    return block;
  });
};

export const useEditorStore = create<EditorState>((set) => ({
  title: "New Page",
  slug: "new-page",
  blocks: [],
  activeBlockId: null,

  setTitle: (title) => set({ title }),
  setSlug: (slug) => set({ slug }),
  setActiveBlock: (id) => set({ activeBlockId: id }),

  addBlock: (type, initialData = {}, parentId = null) =>
    set((state) => {
      const newBlock = { id: uuidv4(), type, data: initialData, children: [] };
      if (!parentId) {
        return { blocks: [...state.blocks, newBlock] }; // Add to root
      }
      return { blocks: addToTree(state.blocks, parentId, newBlock) }; // Add to specific container
    }),

  updateBlock: (id, newData) =>
    set((state) => ({ blocks: updateInTree(state.blocks, id, newData) })),

  removeBlock: (id) =>
    set((state) => {
      const newBlocks = removeFromTree(state.blocks, id);
      return {
        blocks: newBlocks,
        activeBlockId: state.activeBlockId === id ? null : state.activeBlockId,
      };
    }),

  reorderBlocks: (containerId, oldIndex, newIndex) =>
    set((state) => {
      // Simplified for this step: Currently handles root reordering.
      // Full nested reordering requires traversing and splicing the exact array.
      if (!containerId) {
        const updated = [...state.blocks];
        const [moved] = updated.splice(oldIndex, 1);
        updated.splice(newIndex, 0, moved);
        return { blocks: updated };
      }
      return state;
    }),

  moveBlockBetweenContainers: (activeId, overContainerId, newIndex) =>
    set((state) => {
      // Logic for dragging a button out of one section and into another
      // (We will wire this up to dnd-kit in the next step)
      return state;
    }),
}));
