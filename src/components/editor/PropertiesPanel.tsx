"use client";

import { EditorBlock, useEditorStore } from "@/store/useEditorStore";
import { AccordionItem, FooterColumn, FormField, NavLink, PricingTier, SocialLink, StatCardData } from "@/lib/types";

// Recursive helper to find a block anywhere in the nested tree
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

// --- Reusable field components ---

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs text-slate-500 mb-1">{children}</label>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-slate-800 border-b pb-2">
      {children}
    </h3>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm border border-slate-200 rounded p-2 outline-none focus:border-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm border border-slate-200 rounded p-2 outline-none focus:border-blue-500"
        rows={rows || 3}
      />
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex-1">
      <FieldLabel>{label}</FieldLabel>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full text-sm border border-slate-200 rounded p-2"
      />
    </div>
  );
}

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const isTransparent = value === "transparent";

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1">
        <label className="block text-xs text-slate-500">{label}</label>
        <button
          onClick={() => onChange(isTransparent ? "#000000" : "transparent")}
          className={`text-[10px] px-1.5 py-0.5 rounded transition-colors ${
            isTransparent
              ? "bg-blue-100 text-blue-700"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
          }`}
          title="Toggle Transparent / None"
        >
          {isTransparent ? "Solid" : "None"}
        </button>
      </div>
      <input
        type="color"
        value={isTransparent ? "#ffffff" : value}
        disabled={isTransparent}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-8 rounded border border-slate-200 p-0.5 transition-opacity ${
          isTransparent ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
        }`}
      />
    </div>
  );
}

function SelectInput({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex-1">
      <FieldLabel>{label}</FieldLabel>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm border border-slate-200 rounded p-2 outline-none focus:border-blue-500 bg-white"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-4">{children}</div>;
}

// --- Main Component ---

export default function PropertiesPanel() {
  const { blocks, activeBlockId, updateBlock, setActiveBlock } =
    useEditorStore();

  const activeBlock = activeBlockId
    ? findBlockInTree(blocks, activeBlockId)
    : undefined;

  if (!activeBlock) {
    return (
      <div className="w-96 bg-slate-50 border-l border-slate-200 p-6 flex flex-col items-center justify-center text-center text-slate-400 z-10 shrink-0">
        <p className="text-sm">
          Select a block on the canvas to edit its properties.
        </p>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = (activeBlock.data || {}) as any;
  const handleChange = (key: string, value: unknown) => {
    updateBlock(activeBlock.id, { [key]: value });
  };

  return (
    <div className="w-96 bg-white border-l border-slate-200 flex flex-col h-full shadow-[-4px_0_24px_rgba(0,0,0,0.02)] z-10 overflow-y-auto shrink-0">
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
        {/* HERO SECTION */}
        {activeBlock.type === "HeroSection" && (
          <>
            <div className="space-y-4">
              <SectionHeading>Content</SectionHeading>
              <TextInput label="Heading" value={data.heading || ""} onChange={(v) => handleChange("heading", v)} />
              <TextArea label="Subheading" value={data.subheading || ""} onChange={(v) => handleChange("subheading", v)} />
            </div>
            <div className="space-y-4">
              <SectionHeading>Colors</SectionHeading>
              <Row>
                <ColorInput label="Background" value={data.bgColor || "#0f172a"} onChange={(v) => handleChange("bgColor", v)} />
                <ColorInput label="Heading" value={data.headingColor || "#ffffff"} onChange={(v) => handleChange("headingColor", v)} />
              </Row>
              <Row>
                <ColorInput label="Subheading" value={data.subheadingColor || "#94a3b8"} onChange={(v) => handleChange("subheadingColor", v)} />
                <SelectInput label="Text Align" value={data.textAlign || "center"} onChange={(v) => handleChange("textAlign", v)} options={[
                  { value: "left", label: "Left" },
                  { value: "center", label: "Center" },
                  { value: "right", label: "Right" },
                ]} />
              </Row>
            </div>
            <div className="space-y-4">
              <SectionHeading>Button</SectionHeading>
              <TextInput label="Button Text" value={data.ctaText || ""} onChange={(v) => handleChange("ctaText", v)} />
              <TextInput label="Button Link" value={data.ctaLink || ""} onChange={(v) => handleChange("ctaLink", v)} />
              <Row>
                <ColorInput label="Button BG" value={data.buttonBgColor || "#2563eb"} onChange={(v) => handleChange("buttonBgColor", v)} />
                <ColorInput label="Button Text" value={data.buttonTextColor || "#ffffff"} onChange={(v) => handleChange("buttonTextColor", v)} />
              </Row>
              <SelectInput label="Border Radius" value={data.buttonRadius || "9999px"} onChange={(v) => handleChange("buttonRadius", v)} options={[
                { value: "0px", label: "Square" },
                { value: "8px", label: "Rounded (Small)" },
                { value: "16px", label: "Rounded (Large)" },
                { value: "9999px", label: "Pill" },
              ]} />
            </div>
          </>
        )}

        {/* CUSTOM BUTTON */}
        {activeBlock.type === "CustomButton" && (
          <div className="space-y-4">
            <SectionHeading>Button Styles</SectionHeading>
            <TextInput label="Button Text" value={data.text || ""} onChange={(v) => handleChange("text", v)} />
            <TextInput label="Link URL" value={data.href || ""} onChange={(v) => handleChange("href", v)} placeholder="https://..." />
            <Row>
              <ColorInput label="Background" value={data.bgColor || "#000000"} onChange={(v) => handleChange("bgColor", v)} />
              <ColorInput label="Text Color" value={data.textColor || "#ffffff"} onChange={(v) => handleChange("textColor", v)} />
            </Row>
            <Row>
              <NumberInput label="Padding X" value={data.paddingX || 24} onChange={(v) => handleChange("paddingX", v)} />
              <NumberInput label="Padding Y" value={data.paddingY || 12} onChange={(v) => handleChange("paddingY", v)} />
            </Row>
            <Row>
              <NumberInput label="Font Size" value={data.fontSize || 16} onChange={(v) => handleChange("fontSize", v)} />
              <SelectInput label="Font Weight" value={data.fontWeight || "600"} onChange={(v) => handleChange("fontWeight", v)} options={[
                { value: "400", label: "Normal" },
                { value: "500", label: "Medium" },
                { value: "600", label: "Semibold" },
                { value: "700", label: "Bold" },
              ]} />
            </Row>
            <TextInput label="Border Radius" value={data.borderRadius || "4px"} onChange={(v) => handleChange("borderRadius", v)} />
            <Row>
              <NumberInput label="Border Width" value={data.borderWidth || 0} onChange={(v) => handleChange("borderWidth", v)} min={0} />
              <ColorInput label="Border Color" value={data.borderColor || "#000000"} onChange={(v) => handleChange("borderColor", v)} />
            </Row>
          </div>
        )}

        {/* TEXT BLOCK */}
        {activeBlock.type === "TextBlock" && (
          <div className="space-y-4">
            <SectionHeading>Typography Settings</SectionHeading>
            <TextArea label="Content" value={data.content || ""} onChange={(v) => handleChange("content", v)} rows={4} />
            <Row>
              <SelectInput label="HTML Tag" value={data.tag || "p"} onChange={(v) => handleChange("tag", v)} options={[
                { value: "h1", label: "Heading 1" },
                { value: "h2", label: "Heading 2" },
                { value: "h3", label: "Heading 3" },
                { value: "h4", label: "Heading 4" },
                { value: "p", label: "Paragraph" },
              ]} />
              <ColorInput label="Color" value={data.textColor || "#334155"} onChange={(v) => handleChange("textColor", v)} />
            </Row>
            <Row>
              <NumberInput label="Font Size" value={data.fontSize || 16} onChange={(v) => handleChange("fontSize", v)} />
              <SelectInput label="Weight" value={data.fontWeight || "400"} onChange={(v) => handleChange("fontWeight", v)} options={[
                { value: "300", label: "Light" },
                { value: "400", label: "Normal" },
                { value: "500", label: "Medium" },
                { value: "600", label: "Semibold" },
                { value: "700", label: "Bold" },
                { value: "800", label: "Extra Bold" },
              ]} />
            </Row>
            <Row>
              <SelectInput label="Alignment" value={data.textAlign || "left"} onChange={(v) => handleChange("textAlign", v)} options={[
                { value: "left", label: "Left" },
                { value: "center", label: "Center" },
                { value: "right", label: "Right" },
              ]} />
              <SelectInput label="Line Height" value={data.lineHeight || "1.6"} onChange={(v) => handleChange("lineHeight", v)} options={[
                { value: "1", label: "Tight" },
                { value: "1.4", label: "Normal" },
                { value: "1.6", label: "Relaxed" },
                { value: "2", label: "Loose" },
              ]} />
            </Row>
            <NumberInput label="Letter Spacing (px)" value={data.letterSpacing || 0} onChange={(v) => handleChange("letterSpacing", v)} />
          </div>
        )}

        {/* IMAGE BLOCK */}
        {activeBlock.type === "ImageBlock" && (
          <div className="space-y-4">
            <SectionHeading>Image Settings</SectionHeading>
            <TextInput label="Image URL" value={data.src || ""} onChange={(v) => handleChange("src", v)} placeholder="https://..." />
            <TextInput label="Alt Text" value={data.alt || ""} onChange={(v) => handleChange("alt", v)} placeholder="Description of image" />
            <Row>
              <NumberInput label="Width (%)" value={data.width || 100} onChange={(v) => handleChange("width", v)} max={100} />
              <TextInput label="Radius" value={data.borderRadius || "0px"} onChange={(v) => handleChange("borderRadius", v)} />
            </Row>
            <Row>
              <SelectInput label="Object Fit" value={data.objectFit || "cover"} onChange={(v) => handleChange("objectFit", v)} options={[
                { value: "cover", label: "Cover" },
                { value: "contain", label: "Contain" },
                { value: "fill", label: "Fill" },
              ]} />
              <SelectInput label="Shadow" value={data.boxShadow ? "true" : "false"} onChange={(v) => handleChange("boxShadow", v === "true")} options={[
                { value: "false", label: "None" },
                { value: "true", label: "Soft Shadow" },
              ]} />
            </Row>
          </div>
        )}

        {/* GRID CONTAINER */}
        {activeBlock.type === "GridContainer" && (
          <div className="space-y-4">
            <SectionHeading>Grid Settings</SectionHeading>
            <Row>
              <NumberInput label="Columns" value={data.columns || 2} onChange={(v) => handleChange("columns", v)} min={1} max={6} />
              <NumberInput label="Gap (px)" value={data.gap || 24} onChange={(v) => handleChange("gap", v)} />
            </Row>
            <SelectInput label="Align Items" value={data.alignItems || "stretch"} onChange={(v) => handleChange("alignItems", v)} options={[
              { value: "stretch", label: "Stretch" },
              { value: "start", label: "Top" },
              { value: "center", label: "Center" },
              { value: "end", label: "Bottom" },
            ]} />
            <Row>
              <NumberInput label="Padding X" value={data.paddingX || 0} onChange={(v) => handleChange("paddingX", v)} />
              <NumberInput label="Padding Y" value={data.paddingY || 24} onChange={(v) => handleChange("paddingY", v)} />
            </Row>
            <ColorInput label="Background" value={data.bgColor || "transparent"} onChange={(v) => handleChange("bgColor", v)} />
            <Row>
              <NumberInput label="Border Width" value={data.borderWidth || 0} onChange={(v) => handleChange("borderWidth", v)} />
              <ColorInput label="Border Color" value={data.borderColor || "transparent"} onChange={(v) => handleChange("borderColor", v)} />
            </Row>
            <Row>
              <TextInput label="Radius" value={data.borderRadius || "0px"} onChange={(v) => handleChange("borderRadius", v)} />
              <SelectInput label="Shadow" value={data.shadow ? "true" : "false"} onChange={(v) => handleChange("shadow", v === "true")} options={[
                { value: "false", label: "None" },
                { value: "true", label: "Soft Shadow" },
              ]} />
            </Row>
          </div>
        )}

        {/* CONTAINER SECTION */}
        {activeBlock.type === "ContainerSection" && (
          <div className="space-y-4">
            <SectionHeading>Section Settings</SectionHeading>
            <ColorInput label="Background Color" value={data.bgColor || "#f8fafc"} onChange={(v) => handleChange("bgColor", v)} />
            <Row>
              <NumberInput label="Padding X" value={data.paddingX || 24} onChange={(v) => handleChange("paddingX", v)} />
              <NumberInput label="Padding Y" value={data.paddingY || 40} onChange={(v) => handleChange("paddingY", v)} />
            </Row>
            <Row>
              <NumberInput label="Gap (px)" value={data.gap || 16} onChange={(v) => handleChange("gap", v)} />
              <NumberInput label="Min Height" value={parseInt(data.minHeight) || 150} onChange={(v) => handleChange("minHeight", `${v}px`)} />
            </Row>
            <Row>
              <SelectInput label="Direction" value={data.direction || "column"} onChange={(v) => handleChange("direction", v)} options={[
                { value: "column", label: "Vertical" },
                { value: "row", label: "Horizontal" },
              ]} />
              <SelectInput label="Align Items" value={data.alignItems || "center"} onChange={(v) => handleChange("alignItems", v)} options={[
                { value: "flex-start", label: "Start" },
                { value: "center", label: "Center" },
                { value: "flex-end", label: "End" },
                { value: "stretch", label: "Stretch" },
              ]} />
            </Row>
            <SelectInput label="Justify Content" value={data.justifyContent || "flex-start"} onChange={(v) => handleChange("justifyContent", v)} options={[
              { value: "flex-start", label: "Start" },
              { value: "center", label: "Center" },
              { value: "flex-end", label: "End" },
              { value: "space-between", label: "Space Between" },
              { value: "space-evenly", label: "Space Evenly" },
            ]} />
            <Row>
              <NumberInput label="Border Width" value={data.borderWidth || 0} onChange={(v) => handleChange("borderWidth", v)} />
              <ColorInput label="Border Color" value={data.borderColor || "transparent"} onChange={(v) => handleChange("borderColor", v)} />
            </Row>
            <Row>
              <TextInput label="Border Radius" value={data.borderRadius || "8px"} onChange={(v) => handleChange("borderRadius", v)} />
              <SelectInput label="Shadow" value={data.shadow ? "true" : "false"} onChange={(v) => handleChange("shadow", v === "true")} options={[
                { value: "false", label: "None" },
                { value: "true", label: "Soft Shadow" },
              ]} />
            </Row>
          </div>
        )}

        {/* METRICS GRID */}
        {activeBlock.type === "MetricsGrid" && (
          <div className="space-y-4">
            <SectionHeading>Metrics Grid</SectionHeading>
            <NumberInput label="Number of Columns (lg)" value={data.columns || 4} onChange={(v) => handleChange("columns", v)} min={1} max={6} />
            <SectionHeading>Cards Data</SectionHeading>
            {(data.metrics as StatCardData[] || []).map((metric: StatCardData, index: number) => (
              <div key={index} className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-500">Metric {index + 1}</span>
                  <button onClick={() => {
                    const m = [...(data.metrics as StatCardData[] || [])]; m.splice(index, 1); handleChange("metrics", m);
                  }} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                </div>
                <SelectInput label="Layout Type" value={metric.layoutType} onChange={(v) => {
                  const m = [...(data.metrics as StatCardData[] || [])]; m[index] = { ...m[index], layoutType: v as "standard" | "highlight" }; handleChange("metrics", m);
                }} options={[{ value: "standard", label: "Standard" }, { value: "highlight", label: "Highlight" }]} />
                <TextInput label="Title" value={metric.title} onChange={(v) => {
                  const m = [...(data.metrics as StatCardData[] || [])]; m[index] = { ...m[index], title: v }; handleChange("metrics", m);
                }} />
                <TextInput label="Value" value={metric.value} onChange={(v) => {
                  const m = [...(data.metrics as StatCardData[] || [])]; m[index] = { ...m[index], value: v }; handleChange("metrics", m);
                }} />
                <TextInput label="Subtext" value={metric.subtext} onChange={(v) => {
                  const m = [...(data.metrics as StatCardData[] || [])]; m[index] = { ...m[index], subtext: v }; handleChange("metrics", m);
                }} />
                {metric.layoutType === "highlight" && (
                  <NumberInput label="Progress (%)" value={metric.progressPercentage || 0} onChange={(v) => {
                    const m = [...(data.metrics as StatCardData[] || [])]; m[index] = { ...m[index], progressPercentage: v }; handleChange("metrics", m);
                  }} min={0} max={100} />
                )}
              </div>
            ))}
            <button onClick={() => {
              handleChange("metrics", [...(data.metrics as StatCardData[] || []), {
                id: Math.random().toString(), layoutType: "standard", title: "NEW METRIC", value: "100", subtext: "Metric description"
              }]);
            }} className="w-full py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
              + Add Metric Card
            </button>
          </div>
        )}

        {/* SPACER BLOCK */}
        {activeBlock.type === "SpacerBlock" && (
          <div className="space-y-4">
            <SectionHeading>Spacer</SectionHeading>
            <NumberInput label="Height (px)" value={data.height || 40} onChange={(v) => handleChange("height", v)} min={4} max={400} />
          </div>
        )}

        {/* DIVIDER BLOCK */}
        {activeBlock.type === "DividerBlock" && (
          <div className="space-y-4">
            <SectionHeading>Divider</SectionHeading>
            <Row>
              <ColorInput label="Color" value={data.color || "#e2e8f0"} onChange={(v) => handleChange("color", v)} />
              <NumberInput label="Thickness" value={data.thickness || 1} onChange={(v) => handleChange("thickness", v)} min={1} max={10} />
            </Row>
            <Row>
              <SelectInput label="Style" value={data.style || "solid"} onChange={(v) => handleChange("style", v)} options={[
                { value: "solid", label: "Solid" },
                { value: "dashed", label: "Dashed" },
                { value: "dotted", label: "Dotted" },
              ]} />
              <NumberInput label="Width (%)" value={data.width || 100} onChange={(v) => handleChange("width", v)} min={10} max={100} />
            </Row>
            <NumberInput label="Vertical Padding" value={data.paddingY || 16} onChange={(v) => handleChange("paddingY", v)} />
          </div>
        )}

        {/* VIDEO BLOCK */}
        {activeBlock.type === "VideoBlock" && (
          <div className="space-y-4">
            <SectionHeading>Video</SectionHeading>
            <TextInput label="Video URL" value={data.url || ""} onChange={(v) => handleChange("url", v)} placeholder="YouTube, Vimeo, or direct URL" />
            <SelectInput label="Aspect Ratio" value={data.aspectRatio || "16/9"} onChange={(v) => handleChange("aspectRatio", v)} options={[
              { value: "16/9", label: "16:9 (Widescreen)" },
              { value: "4/3", label: "4:3 (Standard)" },
              { value: "1/1", label: "1:1 (Square)" },
              { value: "9/16", label: "9:16 (Vertical)" },
            ]} />
            <TextInput label="Border Radius" value={data.borderRadius || "8px"} onChange={(v) => handleChange("borderRadius", v)} />
          </div>
        )}

        {/* ACCORDION BLOCK */}
        {activeBlock.type === "AccordionBlock" && (
          <div className="space-y-4">
            <SectionHeading>Accordion / FAQ</SectionHeading>
            {(data.items as AccordionItem[] || []).map((item: AccordionItem, index: number) => (
              <div key={index} className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-500">Item {index + 1}</span>
                  <button
                    onClick={() => {
                      const newItems = [...(data.items as AccordionItem[] || [])];
                      newItems.splice(index, 1);
                      handleChange("items", newItems);
                    }}
                    className="text-xs text-red-400 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => {
                    const newItems = [...(data.items as AccordionItem[] || [])];
                    newItems[index] = { ...newItems[index], question: e.target.value };
                    handleChange("items", newItems);
                  }}
                  className="w-full text-sm border border-slate-200 rounded p-2"
                  placeholder="Question"
                />
                <textarea
                  value={item.answer}
                  onChange={(e) => {
                    const newItems = [...(data.items as AccordionItem[] || [])];
                    newItems[index] = { ...newItems[index], answer: e.target.value };
                    handleChange("items", newItems);
                  }}
                  className="w-full text-sm border border-slate-200 rounded p-2"
                  rows={2}
                  placeholder="Answer"
                />
              </div>
            ))}
            <button
              onClick={() => {
                const newItems = [...(data.items as AccordionItem[] || []), { question: "New Question", answer: "Answer here..." }];
                handleChange("items", newItems);
              }}
              className="w-full py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
            >
              + Add Item
            </button>
            <SectionHeading>Colors</SectionHeading>
            <Row>
              <ColorInput label="Text" value={data.textColor || "#1e293b"} onChange={(v) => handleChange("textColor", v)} />
              <ColorInput label="Answer" value={data.answerColor || "#64748b"} onChange={(v) => handleChange("answerColor", v)} />
            </Row>
            <Row>
              <ColorInput label="Background" value={data.bgColor || "#ffffff"} onChange={(v) => handleChange("bgColor", v)} />
              <ColorInput label="Border" value={data.borderColor || "#e2e8f0"} onChange={(v) => handleChange("borderColor", v)} />
            </Row>
          </div>
        )}

        {/* TESTIMONIAL BLOCK */}
        {activeBlock.type === "TestimonialBlock" && (
          <div className="space-y-4">
            <SectionHeading>Testimonial</SectionHeading>
            <TextArea label="Quote" value={data.quote || ""} onChange={(v) => handleChange("quote", v)} rows={3} />
            <Row>
              <TextInput label="Name" value={data.name || ""} onChange={(v) => handleChange("name", v)} />
              <TextInput label="Title" value={data.title || ""} onChange={(v) => handleChange("title", v)} />
            </Row>
            <TextInput label="Avatar URL" value={data.avatarUrl || ""} onChange={(v) => handleChange("avatarUrl", v)} placeholder="https://..." />
            <SectionHeading>Colors</SectionHeading>
            <Row>
              <ColorInput label="Background" value={data.bgColor || "#f8fafc"} onChange={(v) => handleChange("bgColor", v)} />
              <ColorInput label="Quote" value={data.quoteColor || "#334155"} onChange={(v) => handleChange("quoteColor", v)} />
            </Row>
            <TextInput label="Border Radius" value={data.borderRadius || "16px"} onChange={(v) => handleChange("borderRadius", v)} />
          </div>
        )}

        {/* PRICING TABLE BLOCK */}
        {activeBlock.type === "PricingTableBlock" && (
          <div className="space-y-4">
            <SectionHeading>Pricing Table</SectionHeading>
            <ColorInput label="Accent Color" value={data.accentColor || "#2563eb"} onChange={(v) => handleChange("accentColor", v)} />
            {(data.tiers as PricingTier[] || []).map((tier: PricingTier, index: number) => (
              <div key={index} className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-500">Tier {index + 1}</span>
                  <button
                    onClick={() => {
                      const newTiers = [...(data.tiers as PricingTier[] || [])];
                      newTiers.splice(index, 1);
                      handleChange("tiers", newTiers);
                    }}
                    className="text-xs text-red-400 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
                <input type="text" value={tier.name} onChange={(e) => {
                  const t = [...(data.tiers as PricingTier[] || [])]; t[index] = { ...t[index], name: e.target.value }; handleChange("tiers", t);
                }} className="w-full text-sm border border-slate-200 rounded p-2" placeholder="Tier name" />
                <div className="flex gap-2">
                  <input type="text" value={tier.price} onChange={(e) => {
                    const t = [...(data.tiers as PricingTier[] || [])]; t[index] = { ...t[index], price: e.target.value }; handleChange("tiers", t);
                  }} className="flex-1 text-sm border border-slate-200 rounded p-2" placeholder="$29" />
                  <input type="text" value={tier.period} onChange={(e) => {
                    const t = [...(data.tiers as PricingTier[] || [])]; t[index] = { ...t[index], period: e.target.value }; handleChange("tiers", t);
                  }} className="flex-1 text-sm border border-slate-200 rounded p-2" placeholder="/month" />
                </div>
                <textarea value={(tier.features || []).join("\n")} onChange={(e) => {
                  const t = [...(data.tiers as PricingTier[] || [])]; t[index] = { ...t[index], features: e.target.value.split("\n") }; handleChange("tiers", t);
                }} className="w-full text-sm border border-slate-200 rounded p-2" rows={3} placeholder="One feature per line" />
                <div className="flex gap-2">
                  <input type="text" value={tier.ctaText || ""} onChange={(e) => {
                    const t = [...(data.tiers as PricingTier[] || [])]; t[index] = { ...t[index], ctaText: e.target.value }; handleChange("tiers", t);
                  }} className="flex-1 text-sm border border-slate-200 rounded p-2" placeholder="CTA Text" />
                  <label className="flex items-center gap-1 text-xs text-slate-500">
                    <input type="checkbox" checked={tier.highlighted || false} onChange={(e) => {
                      const t = [...(data.tiers as PricingTier[] || [])]; t[index] = { ...t[index], highlighted: e.target.checked }; handleChange("tiers", t);
                    }} />
                    Featured
                  </label>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                const newTiers = [...(data.tiers as PricingTier[] || []), {
                  name: "New Tier", price: "$0", period: "/month", features: ["Feature 1"], ctaText: "Get Started", ctaLink: "#", highlighted: false,
                }];
                handleChange("tiers", newTiers);
              }}
              className="w-full py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
            >
              + Add Tier
            </button>
          </div>
        )}

        {/* NAVBAR BLOCK */}
        {activeBlock.type === "NavbarBlock" && (
          <div className="space-y-4">
            <SectionHeading>Navbar</SectionHeading>
            <TextInput label="Logo Text" value={data.logoText || ""} onChange={(v) => handleChange("logoText", v)} />
            <TextInput label="Logo Image URL" value={data.logoUrl || ""} onChange={(v) => handleChange("logoUrl", v)} placeholder="https://..." />
            <Row>
              <ColorInput label="Background" value={data.bgColor || "#ffffff"} onChange={(v) => handleChange("bgColor", v)} />
              <ColorInput label="Text" value={data.textColor || "#0f172a"} onChange={(v) => handleChange("textColor", v)} />
            </Row>
            <ColorInput label="Link Color" value={data.linkColor || "#475569"} onChange={(v) => handleChange("linkColor", v)} />
            <SectionHeading>Navigation Links</SectionHeading>
            {(data.links as NavLink[] || []).map((link: NavLink, index: number) => (
              <div key={index} className="space-y-2 border border-slate-200 p-3 rounded-lg bg-slate-50">
                <div className="flex gap-2 items-center">
                  <input type="text" value={link.label} onChange={(e) => {
                    const l = [...(data.links as NavLink[] || [])]; l[index] = { ...l[index], label: e.target.value }; handleChange("links", l);
                  }} className="flex-[0.8] min-w-0 text-sm border border-slate-300 rounded p-2" placeholder="Label" />
                  <input type="text" value={link.href} onChange={(e) => {
                    const l = [...(data.links as NavLink[] || [])]; l[index] = { ...l[index], href: e.target.value }; handleChange("links", l);
                  }} className="flex-1 min-w-0 text-sm border border-slate-300 rounded p-2" placeholder="/path" />
                  <button onClick={() => {
                    const l = [...(data.links as NavLink[] || [])]; l.splice(index, 1); handleChange("links", l);
                  }} className="text-red-400 hover:text-red-600 text-sm">×</button>
                </div>
                {/* SUBLINKS */}
                <div className="pl-4 space-y-2 border-l-2 border-slate-200">
                  <div className="text-xs font-medium text-slate-500">Dropdown Links</div>
                  {(link.sublinks || []).map((sublink, subIndex) => (
                    <div key={subIndex} className="flex gap-2 items-center">
                      <input type="text" value={sublink.label} onChange={(e) => {
                        const l = [...(data.links as NavLink[] || [])]; 
                        l[index].sublinks = [...(l[index].sublinks || [])];
                        l[index].sublinks![subIndex] = { ...l[index].sublinks![subIndex], label: e.target.value };
                        handleChange("links", l);
                      }} className="flex-[0.8] min-w-0 text-xs border border-slate-200 rounded p-1.5" placeholder="Sub-label" />
                      <input type="text" value={sublink.href} onChange={(e) => {
                        const l = [...(data.links as NavLink[] || [])]; 
                        l[index].sublinks = [...(l[index].sublinks || [])];
                        l[index].sublinks![subIndex] = { ...l[index].sublinks![subIndex], href: e.target.value };
                        handleChange("links", l);
                      }} className="flex-1 min-w-0 text-xs border border-slate-200 rounded p-1.5" placeholder="/sub-path" />
                      <button onClick={() => {
                        const l = [...(data.links as NavLink[] || [])]; 
                        l[index].sublinks = [...(l[index].sublinks || [])];
                        l[index].sublinks!.splice(subIndex, 1);
                        handleChange("links", l);
                      }} className="text-red-400 hover:text-red-600 text-sm">×</button>
                    </div>
                  ))}
                  <button onClick={() => {
                    const l = [...(data.links as NavLink[] || [])];
                    l[index].sublinks = [...(l[index].sublinks || []), { label: "New Sublink", href: "#" }];
                    handleChange("links", l);
                  }} className="text-xs text-blue-600 font-medium">
                    + Add Dropdown Link
                  </button>
                </div>
              </div>
            ))}
            <button onClick={() => {
              handleChange("links", [...(data.links as NavLink[] || []), { label: "New Link", href: "#" }]);
            }} className="w-full py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
              + Add Root Link
            </button>
            <SectionHeading>Styles & Layout</SectionHeading>
            <Row>
              <SelectInput label="Border Style" value={data.borderStyle || "solid"} onChange={(v) => handleChange("borderStyle", v)} options={[
                { value: "none", label: "None" },
                { value: "solid", label: "Solid" },
                { value: "dashed", label: "Dashed" },
              ]} />
              <NumberInput label="Border Width" value={data.borderWidth as number ?? 1} onChange={(v) => handleChange("borderWidth", v)} />
            </Row>
            <Row>
              <ColorInput label="Border Color" value={data.borderColor || "#e2e8f0"} onChange={(v) => handleChange("borderColor", v)} />
              <SelectInput label="Shadow" value={data.shadow ? "true" : "false"} onChange={(v) => handleChange("shadow", v === "true")} options={[
                { value: "false", label: "None" },
                { value: "true", label: "Soft Shadow" },
              ]} />
            </Row>
            <Row>
              <SelectInput label="Outline Style" value={data.outlineStyle || "none"} onChange={(v) => handleChange("outlineStyle", v)} options={[
                { value: "none", label: "None" },
                { value: "solid", label: "Solid" },
                { value: "dashed", label: "Dashed" },
              ]} />
              <ColorInput label="Outline Color" value={data.outlineColor || "#3b82f6"} onChange={(v) => handleChange("outlineColor", v)} />
            </Row>
            <SectionHeading>CTA Button</SectionHeading>
            <TextInput label="CTA Text" value={data.ctaText || ""} onChange={(v) => handleChange("ctaText", v)} />
            <TextInput label="CTA Link" value={data.ctaLink || ""} onChange={(v) => handleChange("ctaLink", v)} />
            <Row>
              <ColorInput label="CTA BG" value={data.ctaBgColor || "#2563eb"} onChange={(v) => handleChange("ctaBgColor", v)} />
              <ColorInput label="CTA Text" value={data.ctaTextColor || "#ffffff"} onChange={(v) => handleChange("ctaTextColor", v)} />
            </Row>
          </div>
        )}

        {/* SIDEBAR NAV BLOCK */}
        {activeBlock.type === "SidebarNavBlock" && (
          <div className="space-y-4">
            <SectionHeading>Sidebar Navigation</SectionHeading>
            <TextInput label="Logo Text" value={data.logoText || ""} onChange={(v) => handleChange("logoText", v)} />
            <TextInput label="Logo Image URL" value={data.logoUrl || ""} onChange={(v) => handleChange("logoUrl", v)} placeholder="https://..." />
            <Row>
              <ColorInput label="Background" value={data.bgColor || "#ffffff"} onChange={(v) => handleChange("bgColor", v)} />
              <ColorInput label="Border Color" value={data.borderColor || "#e2e8f0"} onChange={(v) => handleChange("borderColor", v)} />
            </Row>
            <Row>
              <ColorInput label="Text" value={data.textColor || "#0f172a"} onChange={(v) => handleChange("textColor", v)} />
              <ColorInput label="Link Color" value={data.linkColor || "#475569"} onChange={(v) => handleChange("linkColor", v)} />
            </Row>
            <Row>
              <NumberInput label="Padding X" value={data.paddingX || 24} onChange={(v) => handleChange("paddingX", v)} />
              <NumberInput label="Padding Y" value={data.paddingY || 32} onChange={(v) => handleChange("paddingY", v)} />
            </Row>
            <SectionHeading>Navigation Links</SectionHeading>
            {(data.links as NavLink[] || []).map((link: NavLink, index: number) => (
              <div key={index} className="flex gap-2 items-center">
                <input type="text" value={link.label} onChange={(e) => {
                  const l = [...(data.links as NavLink[] || [])]; l[index] = { ...l[index], label: e.target.value }; handleChange("links", l);
                }} className="flex-1 text-sm border border-slate-200 rounded p-2" placeholder="Label" />
                <input type="text" value={link.href} onChange={(e) => {
                  const l = [...(data.links as NavLink[] || [])]; l[index] = { ...l[index], href: e.target.value }; handleChange("links", l);
                }} className="flex-1 text-sm border border-slate-200 rounded p-2" placeholder="/path" />
                <button onClick={() => {
                  const l = [...(data.links as NavLink[] || [])]; l.splice(index, 1); handleChange("links", l);
                }} className="text-red-400 hover:text-red-600 text-sm">×</button>
              </div>
            ))}
            <button onClick={() => {
              handleChange("links", [...(data.links as NavLink[] || []), { label: "New Link", href: "#" }]);
            }} className="w-full py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
              + Add Link
            </button>
            <SectionHeading>CTA Button</SectionHeading>
            <TextInput label="CTA Text" value={data.ctaText || ""} onChange={(v) => handleChange("ctaText", v)} />
            <TextInput label="CTA Link" value={data.ctaLink || ""} onChange={(v) => handleChange("ctaLink", v)} />
            <Row>
              <ColorInput label="CTA BG" value={data.ctaBgColor || "#2563eb"} onChange={(v) => handleChange("ctaBgColor", v)} />
              <ColorInput label="CTA Text" value={data.ctaTextColor || "#ffffff"} onChange={(v) => handleChange("ctaTextColor", v)} />
            </Row>
          </div>
        )}

        {/* FOOTER BLOCK */}
        {activeBlock.type === "FooterBlock" && (
          <div className="space-y-4">
            <SectionHeading>Footer</SectionHeading>
            <Row>
              <ColorInput label="Background" value={data.bgColor || "#0f172a"} onChange={(v) => handleChange("bgColor", v)} />
              <ColorInput label="Heading" value={data.headingColor || "#94a3b8"} onChange={(v) => handleChange("headingColor", v)} />
            </Row>
            <Row>
              <ColorInput label="Links" value={data.linkColor || "#cbd5e1"} onChange={(v) => handleChange("linkColor", v)} />
              <ColorInput label="Border" value={data.borderColor || "#1e293b"} onChange={(v) => handleChange("borderColor", v)} />
            </Row>
            <TextInput label="Copyright" value={data.copyrightText || ""} onChange={(v) => handleChange("copyrightText", v)} placeholder="© 2025 YourBrand" />
            <SectionHeading>Columns</SectionHeading>
            {(data.columns as FooterColumn[] || []).map((col: FooterColumn, ci: number) => (
              <div key={ci} className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex justify-between items-center">
                  <input type="text" value={col.heading} onChange={(e) => {
                    const c = [...(data.columns as FooterColumn[] || [])]; c[ci] = { ...c[ci], heading: e.target.value }; handleChange("columns", c);
                  }} className="text-sm font-semibold border border-slate-200 rounded p-1 flex-1" />
                  <button onClick={() => {
                    const c = [...(data.columns as FooterColumn[] || [])]; c.splice(ci, 1); handleChange("columns", c);
                  }} className="text-red-400 hover:text-red-600 text-sm ml-2">×</button>
                </div>
                {(col.links || []).map((link: NavLink, li: number) => (
                  <div key={li} className="flex gap-1 items-center">
                    <input type="text" value={link.label} onChange={(e) => {
                      const c = [...(data.columns as FooterColumn[] || [])]; const links = [...c[ci].links]; links[li] = { ...links[li], label: e.target.value }; c[ci] = { ...c[ci], links }; handleChange("columns", c);
                    }} className="flex-1 text-xs border border-slate-200 rounded p-1.5" placeholder="Label" />
                    <input type="text" value={link.href} onChange={(e) => {
                      const c = [...(data.columns as FooterColumn[] || [])]; const links = [...c[ci].links]; links[li] = { ...links[li], href: e.target.value }; c[ci] = { ...c[ci], links }; handleChange("columns", c);
                    }} className="flex-1 text-xs border border-slate-200 rounded p-1.5" placeholder="/path" />
                    <button onClick={() => {
                      const c = [...(data.columns as FooterColumn[] || [])]; const links = [...c[ci].links]; links.splice(li, 1); c[ci] = { ...c[ci], links }; handleChange("columns", c);
                    }} className="text-red-400 text-xs">×</button>
                  </div>
                ))}
                <button onClick={() => {
                  const c = [...(data.columns as FooterColumn[] || [])]; const links = [...c[ci].links, { label: "New Link", href: "#" }]; c[ci] = { ...c[ci], links }; handleChange("columns", c);
                }} className="text-xs text-blue-500 hover:underline">+ Add link</button>
              </div>
            ))}
            <button onClick={() => {
              handleChange("columns", [...(data.columns as FooterColumn[] || []), { heading: "New Column", links: [{ label: "Link", href: "#" }] }]);
            }} className="w-full py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
              + Add Column
            </button>
          </div>
        )}

        {/* CONTACT FORM BLOCK */}
        {activeBlock.type === "ContactFormBlock" && (
          <div className="space-y-4">
            <SectionHeading>Contact Form</SectionHeading>
            <TextInput label="Heading" value={data.heading || ""} onChange={(v) => handleChange("heading", v)} />
            <TextInput label="Subheading" value={data.subheading || ""} onChange={(v) => handleChange("subheading", v)} />
            <TextInput label="Submit Button Text" value={data.submitText || "Send Message"} onChange={(v) => handleChange("submitText", v)} />
            <Row>
              <ColorInput label="Accent Color" value={data.accentColor || "#2563eb"} onChange={(v) => handleChange("accentColor", v)} />
              <ColorInput label="Background" value={data.bgColor || "#ffffff"} onChange={(v) => handleChange("bgColor", v)} />
            </Row>
            <SectionHeading>Form Fields</SectionHeading>
            {(data.fields as FormField[] || []).map((field: FormField, index: number) => (
              <div key={index} className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-500">Field {index + 1}</span>
                  <button onClick={() => {
                    const f = [...(data.fields as FormField[] || [])]; f.splice(index, 1); handleChange("fields", f);
                  }} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                </div>
                <input type="text" value={field.label} onChange={(e) => {
                  const f = [...(data.fields as FormField[] || [])]; f[index] = { ...f[index], label: e.target.value }; handleChange("fields", f);
                }} className="w-full text-sm border border-slate-200 rounded p-2" placeholder="Field label" />
                <div className="flex gap-2">
                  <select value={field.type} onChange={(e) => {
                    const f = [...(data.fields as FormField[] || [])]; f[index] = { ...f[index], type: e.target.value }; handleChange("fields", f);
                  }} className="flex-1 text-sm border border-slate-200 rounded p-2 bg-white">
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="tel">Phone</option>
                    <option value="textarea">Textarea</option>
                  </select>
                  <input type="text" value={field.placeholder} onChange={(e) => {
                    const f = [...(data.fields as FormField[] || [])]; f[index] = { ...f[index], placeholder: e.target.value }; handleChange("fields", f);
                  }} className="flex-1 text-sm border border-slate-200 rounded p-2" placeholder="Placeholder" />
                </div>
              </div>
            ))}
            <button onClick={() => {
              handleChange("fields", [...(data.fields as FormField[] || []), { label: "New Field", type: "text", placeholder: "" }]);
            }} className="w-full py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
              + Add Field
            </button>
          </div>
        )}

        {/* CARD BLOCK */}
        {activeBlock.type === "CardBlock" && (
          <div className="space-y-4">
            <SectionHeading>Card</SectionHeading>
            <TextInput label="Image URL" value={data.imageUrl || ""} onChange={(v) => handleChange("imageUrl", v)} placeholder="https://..." />
            <NumberInput label="Image Height (px)" value={parseInt(data.imageHeight) || 200} onChange={(v) => handleChange("imageHeight", `${v}px`)} />
            <TextInput label="Title" value={data.title || ""} onChange={(v) => handleChange("title", v)} />
            <TextArea label="Description" value={data.description || ""} onChange={(v) => handleChange("description", v)} />
            <Row>
              <TextInput label="Link Text" value={data.linkText || ""} onChange={(v) => handleChange("linkText", v)} />
              <TextInput label="Link URL" value={data.linkUrl || ""} onChange={(v) => handleChange("linkUrl", v)} placeholder="https://..." />
            </Row>
            <SectionHeading>Styles</SectionHeading>
            <Row>
              <ColorInput label="Background" value={data.bgColor || "#ffffff"} onChange={(v) => handleChange("bgColor", v)} />
              <ColorInput label="Text" value={data.textColor || "#0f172a"} onChange={(v) => handleChange("textColor", v)} />
            </Row>
            <TextInput label="Border Radius" value={data.borderRadius || "12px"} onChange={(v) => handleChange("borderRadius", v)} />
            <SelectInput label="Shadow" value={data.shadow ? "true" : "false"} onChange={(v) => handleChange("shadow", v === "true")} options={[
              { value: "false", label: "None" },
              { value: "true", label: "Soft Shadow" },
            ]} />
          </div>
        )}

        {/* SOCIAL LINKS BLOCK */}
        {activeBlock.type === "SocialLinksBlock" && (
          <div className="space-y-4">
            <SectionHeading>Social Links</SectionHeading>
            <Row>
              <ColorInput label="Icon Color" value={data.iconColor || "#64748b"} onChange={(v) => handleChange("iconColor", v)} />
              <NumberInput label="Icon Size" value={data.iconSize || 20} onChange={(v) => handleChange("iconSize", v)} min={12} max={48} />
            </Row>
            <Row>
              <SelectInput label="Alignment" value={data.alignment || "center"} onChange={(v) => handleChange("alignment", v)} options={[
                { value: "flex-start", label: "Left" },
                { value: "center", label: "Center" },
                { value: "flex-end", label: "Right" },
              ]} />
              <NumberInput label="Gap (px)" value={data.gap || 16} onChange={(v) => handleChange("gap", v)} />
            </Row>
            <SectionHeading>Links</SectionHeading>
            {(data.links as SocialLink[] || []).map((link: SocialLink, index: number) => (
              <div key={index} className="flex gap-2 items-center">
                <select value={link.platform} onChange={(e) => {
                  const l = [...(data.links as SocialLink[] || [])]; l[index] = { ...l[index], platform: e.target.value }; handleChange("links", l);
                }} className="flex-1 text-sm border border-slate-200 rounded p-2 bg-white">
                  <option value="twitter">Twitter</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="youtube">YouTube</option>
                  <option value="github">GitHub</option>
                </select>
                <input type="text" value={link.url} onChange={(e) => {
                  const l = [...(data.links as SocialLink[] || [])]; l[index] = { ...l[index], url: e.target.value }; handleChange("links", l);
                }} className="flex-1 text-sm border border-slate-200 rounded p-2" placeholder="https://..." />
                <button onClick={() => {
                  const l = [...(data.links as SocialLink[] || [])]; l.splice(index, 1); handleChange("links", l);
                }} className="text-red-400 hover:text-red-600 text-sm">×</button>
              </div>
            ))}
            <button onClick={() => {
              handleChange("links", [...(data.links as SocialLink[] || []), { platform: "twitter", url: "#" }]);
            }} className="w-full py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
              + Add Social Link
            </button>
          </div>
        )}

        {/* GLOBAL ADVANCED SETTINGS */}
        <div className="space-y-4 pt-4 border-t border-slate-200 mt-6">
          <SectionHeading>Advanced Settings</SectionHeading>
          <TextInput 
            label="Font Family" 
            value={data.fontFamily as string || ""} 
            onChange={(v) => handleChange("fontFamily", v)} 
            placeholder="e.g. Inter, Roboto, sans-serif" 
          />
          <TextInput 
            label="Custom Tailwind Classes" 
            value={data.className || ""} 
            onChange={(v) => handleChange("className", v)} 
            placeholder="e.g. hidden md:flex shadow-xl" 
          />
        </div>
      </div>
    </div>
  );
}
