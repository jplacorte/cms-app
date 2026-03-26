"use client";

import { EditorBlock, useEditorStore } from "@/store/useEditorStore";

// 1. Recursive helper to find the active block ANYWHERE in the nested tree
const findBlockInTree = (
  blocks: EditorBlock[],
  id: string,
): EditorBlock | undefined => {
  for (const block of blocks) {
    if (block.id === id) return block;
    if (block.children) {
      const found = findBlockInTree(block.children, id);
      if (found) return found;
    }
  }
  return undefined;
};

export default function PropertiesPanel() {
  const { blocks, activeBlockId, updateBlock, setActiveBlock } =
    useEditorStore();

  // Find the currently selected block, even if it is nested inside a container!
  const activeBlock = activeBlockId
    ? findBlockInTree(blocks, activeBlockId)
    : undefined;

  // If nothing is clicked (or we can't find it), hide the panel
  if (!activeBlock) {
    return (
      <div className="w-80 bg-slate-50 border-l border-slate-200 p-6 flex flex-col items-center justify-center text-center text-slate-400 z-10">
        <p className="text-sm">
          Select a block on the canvas to edit its properties.
        </p>
      </div>
    );
  }

  // 2. THE FIX: Safely fallback to an empty object if `data` is undefined
  const data = activeBlock.data || {};

  const handleChange = (key: string, value: string | number) => {
    updateBlock(activeBlock.id, { [key]: value });
  };

  return (
    <div className="w-80 bg-white border-l border-slate-200 flex flex-col h-full shadow-[-4px_0_24px_rgba(0,0,0,0.02)] z-10 overflow-y-auto">
      <div className="flex justify-between items-center p-4 border-b border-slate-100 sticky top-0 bg-white z-20">
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Edit {activeBlock.type}
        </h2>
        <button
          onClick={() => setActiveBlock(null)}
          className="text-slate-400 hover:text-slate-600 text-lg"
        >
          &times;
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* --- HERO SECTION PROPERTIES --- */}
        {activeBlock.type === "HeroSection" && (
          <>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-800 border-b pb-2">
                Content
              </h3>
              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  Heading
                </label>
                <input
                  type="text"
                  // Use our safe `data` object here!
                  value={data.heading || ""}
                  onChange={(e) => handleChange("heading", e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded p-2 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  Subheading
                </label>
                <textarea
                  value={data.subheading || ""}
                  onChange={(e) => handleChange("subheading", e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded p-2 outline-none focus:border-blue-500 h-24"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-800 border-b pb-2">
                Button Customization
              </h3>
              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  value={data.ctaText || ""}
                  onChange={(e) => handleChange("ctaText", e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded p-2 outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs text-slate-500 mb-1">
                    Background
                  </label>
                  <input
                    type="color"
                    value={data.buttonBgColor || "#2563eb"}
                    onChange={(e) =>
                      handleChange("buttonBgColor", e.target.value)
                    }
                    className="w-full h-8 cursor-pointer rounded border border-slate-200 p-0.5"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-slate-500 mb-1">
                    Text Color
                  </label>
                  <input
                    type="color"
                    value={data.buttonTextColor || "#ffffff"}
                    onChange={(e) =>
                      handleChange("buttonTextColor", e.target.value)
                    }
                    className="w-full h-8 cursor-pointer rounded border border-slate-200 p-0.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  Border Radius
                </label>
                <select
                  value={data.buttonRadius || "9999px"}
                  onChange={(e) => handleChange("buttonRadius", e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded p-2 outline-none focus:border-blue-500 bg-white"
                >
                  <option value="0px">Square</option>
                  <option value="8px">Rounded (Small)</option>
                  <option value="16px">Rounded (Large)</option>
                  <option value="9999px">Pill</option>
                </select>
              </div>
            </div>
          </>
        )}

        {/* --- CUSTOM BUTTON PROPERTIES --- */}
        {activeBlock.type === "CustomButton" && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-800 border-b pb-2">
              Button Styles
            </h3>

            <div>
              <label className="block text-xs text-slate-500 mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={data.text || ""}
                onChange={(e) => handleChange("text", e.target.value)}
                className="w-full text-sm border border-slate-200 rounded p-2"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">
                  Background
                </label>
                <input
                  type="color"
                  value={data.bgColor || "#000000"}
                  onChange={(e) => handleChange("bgColor", e.target.value)}
                  className="w-full h-8 cursor-pointer rounded border border-slate-200 p-0.5"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">
                  Text
                </label>
                <input
                  type="color"
                  value={data.textColor || "#ffffff"}
                  onChange={(e) => handleChange("textColor", e.target.value)}
                  className="w-full h-8 cursor-pointer rounded border border-slate-200 p-0.5"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">
                  Padding X
                </label>
                <input
                  type="number"
                  value={data.paddingX || 24}
                  onChange={(e) =>
                    handleChange("paddingX", Number(e.target.value))
                  }
                  className="w-full text-sm border border-slate-200 rounded p-2"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">
                  Padding Y
                </label>
                <input
                  type="number"
                  value={data.paddingY || 12}
                  onChange={(e) =>
                    handleChange("paddingY", Number(e.target.value))
                  }
                  className="w-full text-sm border border-slate-200 rounded p-2"
                />
              </div>
            </div>
          </div>
        )}

        {/* --- TEXT BLOCK PROPERTIES --- */}
        {activeBlock.type === "TextBlock" && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-800 border-b pb-2">
              Typography Settings
            </h3>

            <div>
              <label className="block text-xs text-slate-500 mb-1">
                Content
              </label>
              <textarea
                value={data.content || ""}
                onChange={(e) => handleChange("content", e.target.value)}
                className="w-full text-sm border border-slate-200 rounded p-2 h-24"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">
                  HTML Tag
                </label>
                <select
                  value={data.tag || "p"}
                  onChange={(e) => handleChange("tag", e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded p-2 bg-white"
                >
                  <option value="h1">Heading 1</option>
                  <option value="h2">Heading 2</option>
                  <option value="h3">Heading 3</option>
                  <option value="p">Paragraph</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">
                  Color
                </label>
                <input
                  type="color"
                  value={data.textColor || "#334155"}
                  onChange={(e) => handleChange("textColor", e.target.value)}
                  className="w-full h-8 cursor-pointer rounded border border-slate-200 p-0.5"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">
                  Font Size (px)
                </label>
                <input
                  type="number"
                  value={data.fontSize || 16}
                  onChange={(e) =>
                    handleChange("fontSize", Number(e.target.value))
                  }
                  className="w-full text-sm border border-slate-200 rounded p-2"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">
                  Alignment
                </label>
                <select
                  value={data.textAlign || "left"}
                  onChange={(e) => handleChange("textAlign", e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded p-2 bg-white"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* --- IMAGE BLOCK PROPERTIES --- */}
        {activeBlock.type === "ImageBlock" && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-800 border-b pb-2">
              Image Settings
            </h3>

            <div>
              <label className="block text-xs text-slate-500 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={data.src || ""}
                onChange={(e) => handleChange("src", e.target.value)}
                className="w-full text-sm border border-slate-200 rounded p-2"
                placeholder="https://..."
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">
                  Width (%)
                </label>
                <input
                  type="number"
                  max="100"
                  value={data.width || 100}
                  onChange={(e) =>
                    handleChange("width", Number(e.target.value))
                  }
                  className="w-full text-sm border border-slate-200 rounded p-2"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">
                  Radius (px)
                </label>
                <input
                  type="text"
                  value={data.borderRadius || "0px"}
                  onChange={(e) => handleChange("borderRadius", e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded p-2"
                />
              </div>
            </div>
          </div>
        )}

        {/* --- GRID PROPERTIES --- */}
        {activeBlock.type === "GridContainer" && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-800 border-b pb-2">
              Layout Settings
            </h3>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">
                  Columns
                </label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={data.columns || 2}
                  onChange={(e) =>
                    handleChange("columns", Number(e.target.value))
                  }
                  className="w-full text-sm border border-slate-200 rounded p-2"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">
                  Gap (px)
                </label>
                <input
                  type="number"
                  value={data.gap || 24}
                  onChange={(e) => handleChange("gap", Number(e.target.value))}
                  className="w-full text-sm border border-slate-200 rounded p-2"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
