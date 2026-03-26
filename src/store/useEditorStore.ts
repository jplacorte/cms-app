import { v4 as uuidv4 } from "uuid"; // We'll need this to generate unique block IDs
import { create } from "zustand";

// 1. The generic shape of any block in our editor
export type EditorBlock = {
  id: string;
  type: string; // e.g., 'HeroSection', 'MetricsGrid'
  data: any; // The specific props for that component
};

// 2. The shape of our entire Zustand store
interface EditorState {
  // The Data
  title: string;
  slug: string;
  blocks: EditorBlock[];

  // The Actions
  setTitle: (title: string) => void;
  setSlug: (slug: string) => void;
  addBlock: (type: string, initialData?: any) => void;
  updateBlock: (id: string, newData: any) => void;
  removeBlock: (id: string) => void;
  moveBlock: (dragIndex: number, hoverIndex: number) => void;
  reorderBlocks: (oldIndex: number, newIndex: number) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  // Initial State
  title: "New Page",
  slug: "new-page",
  blocks: [],

  // Simple string updaters
  setTitle: (title) => set({ title }),
  setSlug: (slug) => set({ slug }),

  // Add a new block to the end of the array
  addBlock: (type, initialData = {}) =>
    set((state) => ({
      blocks: [
        ...state.blocks,
        {
          id: uuidv4(),
          type,
          data: initialData,
        },
      ],
    })),

  // Find a block by ID and merge its new data
  updateBlock: (id, newData) =>
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id
          ? { ...block, data: { ...block.data, ...newData } }
          : block,
      ),
    })),

  // Filter out a specific block
  removeBlock: (id) =>
    set((state) => ({
      blocks: state.blocks.filter((block) => block.id !== id),
    })),

  // Reorder blocks (crucial for drag-and-drop later)
  moveBlock: (dragIndex, hoverIndex) =>
    set((state) => {
      const updatedBlocks = [...state.blocks];
      const draggedBlock = updatedBlocks[dragIndex];

      updatedBlocks.splice(dragIndex, 1);
      updatedBlocks.splice(hoverIndex, 0, draggedBlock);

      return { blocks: updatedBlocks };
    }),

  reorderBlocks: (oldIndex: number, newIndex: number) =>
    set((state) => {
      const updatedBlocks = [...state.blocks];
      const [movedBlock] = updatedBlocks.splice(oldIndex, 1);
      updatedBlocks.splice(newIndex, 0, movedBlock);
      return { blocks: updatedBlocks };
    }),
}));
