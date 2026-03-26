"use client";
import { savePageAction } from "@/actions/save-page";
import EditorCanvas from "@/components/editor/EditorCanvas";
import EditorSidebar from "@/components/editor/Sidebar";
import { useEditorStore } from "@/store/useEditorStore";

export default function NewPageEditor() {
  const { title, slug, blocks, setTitle } = useEditorStore();

  const handleSave = async () => {
    const result = await savePageAction({ title, slug, blocks });
    if (result.success) {
      alert("Page saved successfully!");
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top Navbar */}
      <header className="h-14 border-b flex items-center justify-between px-6 bg-white z-10">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-bold outline-none text-slate-800 placeholder-slate-300"
          placeholder="Page Title..."
        />
        <button
          onClick={handleSave}
          className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          Save Page
        </button>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        <EditorSidebar />
        <EditorCanvas />
      </div>
    </div>
  );
}
