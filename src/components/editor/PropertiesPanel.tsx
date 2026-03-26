"use client";

import { useEditorStore } from "@/store/useEditorStore";

export default function PropertiesPanel() {
  const { blocks, activeBlockId, updateBlock, setActiveBlock } =
    useEditorStore();

  // Find the currently selected block
  const activeBlock = blocks.find((b) => b.id === activeBlockId);

  // If nothing is clicked, hide the panel
  if (!activeBlock) {
    return (
      <div className="w-80 bg-slate-50 border-l border-slate-200 p-6 flex flex-col items-center justify-center text-center text-slate-400 z-10">
        <p className="text-sm">
          Select a block on the canvas to edit its properties.
        </p>
      </div>
    );
  }

  // A helper function to make updating nested data easier
  const handleChange = (key: string, value: string) => {
    updateBlock(activeBlock.id, { [key]: value });
  };

  return (
    <div className="w-80 bg-white border-l border-slate-200 flex flex-col h-full shadow-[-4px_0_24px_rgba(0,0,0,0.02)] z-10 overflow-y-auto">
      <div className="flex justify-between items-center p-4 border-b border-slate-100 sticky top-0 bg-white">
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
        {/* Render specific forms based on the block type */}

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
                  value={activeBlock.data.heading || ""}
                  onChange={(e) => handleChange("heading", e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded p-2 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  Subheading
                </label>
                <textarea
                  value={activeBlock.data.subheading || ""}
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
                  value={activeBlock.data.ctaText || ""}
                  onChange={(e) => handleChange("ctaText", e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded p-2 outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs text-slate-500 mb-1">
                    Background Color
                  </label>
                  <input
                    type="color"
                    value={activeBlock.data.buttonBgColor || "#2563eb"}
                    onChange={(e) =>
                      handleChange("buttonBgColor", e.target.value)
                    }
                    className="w-full h-8 cursor-pointer rounded border border-slate-200"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-slate-500 mb-1">
                    Text Color
                  </label>
                  <input
                    type="color"
                    value={activeBlock.data.buttonTextColor || "#ffffff"}
                    onChange={(e) =>
                      handleChange("buttonTextColor", e.target.value)
                    }
                    className="w-full h-8 cursor-pointer rounded border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  Border Radius
                </label>
                <select
                  value={activeBlock.data.buttonRadius || "9999px"}
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
                value={activeBlock.data.text || ""}
                onChange={(e) => handleChange("text", e.target.value)}
                className="w-full text-sm border border-slate-200 rounded p-2"
              />
            </div>

            <div className="flex gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  Background
                </label>
                <input
                  type="color"
                  value={activeBlock.data.bgColor || "#000000"}
                  onChange={(e) => handleChange("bgColor", e.target.value)}
                  className="w-full h-8 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  Text Color
                </label>
                <input
                  type="color"
                  value={activeBlock.data.textColor || "#ffffff"}
                  onChange={(e) => handleChange("textColor", e.target.value)}
                  className="w-full h-8 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  Padding X (px)
                </label>
                <input
                  type="number"
                  value={activeBlock.data.paddingX || 24}
                  onChange={(e) =>
                    handleChange("paddingX", Number(e.target.value))
                  }
                  className="w-full text-sm border border-slate-200 rounded p-2"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  Padding Y (px)
                </label>
                <input
                  type="number"
                  value={activeBlock.data.paddingY || 12}
                  onChange={(e) =>
                    handleChange("paddingY", Number(e.target.value))
                  }
                  className="w-full text-sm border border-slate-200 rounded p-2"
                />
              </div>
            </div>
          </div>
        )}

        {/* You can add another `if (activeBlock.type === 'MetricsGrid')` here later! */}
      </div>
    </div>
  );
}
