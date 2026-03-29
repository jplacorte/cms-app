"use client";

import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

export type EditorBlock = {
  id: string;
  type: string;
  data: Record<string, unknown>;
  children?: EditorBlock[];
};

interface EditorState {
  title: string;
  slug: string;
  blocks: EditorBlock[];
  activeBlockId: string | null;
  setTitle: (title: string) => void;
  setSlug: (slug: string) => void;
  setActiveBlock: (id: string | null) => void;
  addBlock: (type: string, initialData?: Record<string, unknown>, parentId?: string | null) => void;
  updateBlock: (id: string, newData: Record<string, unknown>) => void;
  removeBlock: (id: string) => void;
  moveBlock: (activeId: string, overId: string | null) => void;
}

// Recursive Helpers
const updateInTree = (
  blocks: EditorBlock[],
  id: string,
  newData: Record<string, unknown>,
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
    if (block.id === parentId)
      return { ...block, children: [...(block.children || []), newBlock] };
    if (block.children)
      return {
        ...block,
        children: addToTree(block.children, parentId, newBlock),
      };
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
        if (type === "NavbarBlock" || type === "SidebarNavBlock") {
          return { blocks: [newBlock, ...state.blocks] };
        }
        return { blocks: [...state.blocks, newBlock] };
      }
      return { blocks: addToTree(state.blocks, parentId, newBlock) };
    }),

  updateBlock: (id, newData) =>
    set((state) => ({ blocks: updateInTree(state.blocks, id, newData) })),

  removeBlock: (id) =>
    set((state) => ({
      blocks: removeFromTree(state.blocks, id),
      activeBlockId: state.activeBlockId === id ? null : state.activeBlockId,
    })),

  moveBlock: (activeId, overId) =>
    set((state) => {
      if (activeId === overId) return state;

      const newBlocks = JSON.parse(JSON.stringify(state.blocks));

      let activeItem: EditorBlock | null = null;
      let activeParentList: EditorBlock[] | null = null;
      let activeIndex = -1;

      let overItem: EditorBlock | null = null;
      let overParentList: EditorBlock[] | null = null;
      let overIndex = -1;

      const findNodes = (list: EditorBlock[]) => {
        for (let i = 0; i < list.length; i++) {
          const node = list[i];
          if (node.id === activeId) {
            activeItem = node;
            activeParentList = list;
            activeIndex = i;
          }
          if (node.id === overId) {
            overItem = node;
            overParentList = list;
            overIndex = i;
          }
          if (node.children) {
            findNodes(node.children);
          }
        }
      };

      findNodes(newBlocks);

      if (!activeItem || !activeParentList) return state;

      // Handle dropping onto a container explicitly
      if (overId !== null && typeof overId === "string" && overId.startsWith("container-")) {
        const targetId = overId.replace("container-", "");
        
        if (targetId === "root" || !targetId) {
          (activeParentList as EditorBlock[]).splice(activeIndex, 1);
          newBlocks.push(activeItem);
          return { blocks: newBlocks };
        }

        let targetContainer: EditorBlock | null = null;
        const findTarget = (list: EditorBlock[]) => {
          for (const node of list) {
            if (node.id === targetId) { targetContainer = node; return; }
            if (node.children) findTarget(node.children);
          }
        };
        findTarget(newBlocks);

        if (targetContainer) {
          (activeParentList as EditorBlock[]).splice(activeIndex, 1);
          if (!(targetContainer as EditorBlock).children) (targetContainer as EditorBlock).children = [];
          (targetContainer as EditorBlock).children!.push(activeItem);
        }
        return { blocks: newBlocks };
      }

      // Handle dropping before/after a specific item (same list or different list)
      if (overItem && overParentList) {
        if (activeParentList === overParentList) {
          // Same list - standard array move
          (activeParentList as EditorBlock[]).splice(activeIndex, 1);
          (activeParentList as EditorBlock[]).splice(overIndex, 0, activeItem);
        } else {
          // Cross-container move
          (activeParentList as EditorBlock[]).splice(activeIndex, 1);
          (overParentList as EditorBlock[]).splice(overIndex, 0, activeItem);
        }
        return { blocks: newBlocks };
      }

      return state;
    }),
}));
