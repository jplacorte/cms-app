import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

export type EditorBlock = {
  id: string;
  type: string;
  data: any;
  children?: EditorBlock[]; // <-- The magic key for nesting!
};

interface EditorState {
  // --- The Data ---
  title: string;
  slug: string;
  blocks: EditorBlock[];
  activeBlockId: string | null;

  // --- Basic State Setters ---
  setTitle: (title: string) => void;
  setSlug: (slug: string) => void;
  setActiveBlock: (id: string | null) => void;

  // --- Block Manipulation Actions ---
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

  // Moves a block from one part of the tree to another
  moveBlockBetweenContainers: (
    activeId: string,
    targetContainerId: string | null,
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

  moveBlockBetweenContainers: (activeId, targetContainerId) =>
    set((state) => {
      // 1. Create a deep copy of the blocks to safely mutate
      const newBlocks = JSON.parse(JSON.stringify(state.blocks));
      let foundBlock: EditorBlock | null = null; // Added explicit type here

      // 2. Helper to find and remove the block from its current location
      const removeNode = (nodes: EditorBlock[]): boolean => {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === activeId) {
            foundBlock = nodes.splice(i, 1)[0];
            return true;
          }
          // THE FIX: Extract to a variable so TypeScript knows it is safely defined
          const children = nodes[i].children;
          if (children && removeNode(children)) return true;
        }
        return false;
      };

      removeNode(newBlocks);

      // Failsafe in case the block wasn't found
      if (!foundBlock) return state;

      // 3. Helper to drop it into the new target container
      if (targetContainerId === null) {
        newBlocks.push(foundBlock); // Drop on main canvas root
      } else {
        const addNode = (nodes: EditorBlock[]): boolean => {
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].id === targetContainerId) {
              nodes[i].children = nodes[i].children || [];
              // We use foundBlock! here because we already checked if(!foundBlock) above
              nodes[i].children.push(foundBlock!);
              return true;
            }
            // THE FIX: Extract to a variable again for the addNode recursive call
            const children = nodes[i].children;
            if (children && addNode(children)) return true;
          }
          return false;
        };
        addNode(newBlocks);
      }

      return { blocks: newBlocks };
    }),
}));
