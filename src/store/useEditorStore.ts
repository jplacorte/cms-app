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
  reorderBlocks: (
    containerId: string | null,
    oldIndex: number,
    newIndex: number,
  ) => void;
  moveBlockBetweenContainers: (
    activeId: string,
    targetContainerId: string | null,
  ) => void;
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
      if (!parentId) return { blocks: [...state.blocks, newBlock] };
      return { blocks: addToTree(state.blocks, parentId, newBlock) };
    }),

  updateBlock: (id, newData) =>
    set((state) => ({ blocks: updateInTree(state.blocks, id, newData) })),

  removeBlock: (id) =>
    set((state) => ({
      blocks: removeFromTree(state.blocks, id),
      activeBlockId: state.activeBlockId === id ? null : state.activeBlockId,
    })),

  reorderBlocks: (containerId, oldIndex, newIndex) =>
    set((state) => {
      const newBlocks = JSON.parse(JSON.stringify(state.blocks));
      const reorderInTree = (nodes: EditorBlock[]): boolean => {
        if (!containerId) {
          const [moved] = nodes.splice(oldIndex, 1);
          nodes.splice(newIndex, 0, moved);
          return true;
        }
        for (const node of nodes) {
          if (node.id === containerId && node.children) {
            const [moved] = node.children.splice(oldIndex, 1);
            node.children.splice(newIndex, 0, moved);
            return true;
          }
          if (node.children && reorderInTree(node.children)) return true;
        }
        return false;
      };
      reorderInTree(newBlocks);
      return { blocks: newBlocks };
    }),

  moveBlockBetweenContainers: (activeId, targetContainerId) =>
    set((state) => {
      const newBlocks = JSON.parse(JSON.stringify(state.blocks));
      let foundBlock: EditorBlock | null = null;

      const removeNode = (nodes: EditorBlock[]): boolean => {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === activeId) {
            foundBlock = nodes.splice(i, 1)[0];
            return true;
          }
          const children = nodes[i].children;
          if (children && removeNode(children)) return true;
        }
        return false;
      };

      removeNode(newBlocks);
      if (!foundBlock) return state;

      if (targetContainerId === null) {
        newBlocks.push(foundBlock);
      } else {
        const addNode = (nodes: EditorBlock[]): boolean => {
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i]; // FIX: Local variable allows type narrowing
            if (node.id === targetContainerId) {
              if (!node.children) node.children = [];
              node.children.push(foundBlock!); // Now safe
              return true;
            }
            if (node.children && addNode(node.children)) return true;
          }
          return false;
        };
        addNode(newBlocks);
      }
      return { blocks: newBlocks };
    }),
}));
