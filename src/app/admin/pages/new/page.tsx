"use client";
import { savePageAction } from "@/actions/save-page";
import EditorCanvas from "@/components/editor/EditorCanvas";
import PropertiesPanel from "@/components/editor/PropertiesPanel";
import EditorSidebar from "@/components/editor/Sidebar";
import { useEditorStore } from "@/store/useEditorStore";

export default function NewPageEditor() {
  const { title, slug, blocks, setTitle, setSlug } = useEditorStore();

  const handleSave = async () => {
    const result = await savePageAction({ title, slug, blocks });
    if (result.success) {
      alert("Page saved successfully!");
    } else {
      alert("Error: " + result.error);
    }
  };

  // Helper to auto-generate a URL-friendly slug from the title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    // Only auto-update the slug if it hasn't been manually heavily edited yet
    if (
      slug === "new-page" ||
      slug === title.toLowerCase().replace(/\s+/g, "-")
    ) {
      setSlug(
        newTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
      );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top Navbar */}
      <header className="h-16 border-b flex items-center justify-between px-6 bg-white z-10">
        <div className="flex flex-col gap-1 w-1/2">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="text-lg font-bold outline-none text-slate-800 placeholder-slate-300"
            placeholder="Page Title..."
          />
          <div className="flex items-center text-xs text-slate-400">
            <span className="mr-1">/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) =>
                setSlug(
                  e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, ""),
                )
              }
              className="outline-none bg-transparent w-full hover:bg-slate-50 focus:bg-slate-50 rounded px-1 transition-colors"
              placeholder="page-slug"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="bg-slate-900 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm"
        >
          Save Page
        </button>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        <EditorSidebar />
        <EditorCanvas />
        <PropertiesPanel /> {/* Add it here! */}
      </div>
    </div>
  );
}
