import { ColorInput } from "@/lib/ui/ColorInput";
import { Row } from "@/lib/ui/Row";
import { SectionHeading } from "@/lib/ui/SectionHeading";
import { TextInput } from "@/lib/ui/TextInput";
import { FooterColumn, NavLink } from "@/lib/types";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  handleChange: (key: string, value: unknown) => void;
}

export default function FooterBlock({
  data,
  handleChange,
}: Props) {
  const columns = (data.columns as FooterColumn[] || []);

  const updateColumnHeading = (ci: number, heading: string) => {
    const newColumns = [...columns];
    newColumns[ci] = { ...newColumns[ci], heading };
    handleChange("columns", newColumns);
  };

  const removeColumn = (ci: number) => {
    const newColumns = [...columns];
    newColumns.splice(ci, 1);
    handleChange("columns", newColumns);
  };

  const addColumn = () => {
    const newColumn: FooterColumn = {
      heading: "New Column",
      links: [{ label: "Link", href: "#" }],
    };
    handleChange("columns", [...columns, newColumn]);
  };

  const updateLink = (ci: number, li: number, field: keyof NavLink, value: string) => {
    const newColumns = [...columns];
    const newLinks = [...newColumns[ci].links];
    newLinks[li] = { ...newLinks[li], [field]: value };
    newColumns[ci] = { ...newColumns[ci], links: newLinks };
    handleChange("columns", newColumns);
  };

  const removeLink = (ci: number, li: number) => {
    const newColumns = [...columns];
    const newLinks = [...newColumns[ci].links];
    newLinks.splice(li, 1);
    newColumns[ci] = { ...newColumns[ci], links: newLinks };
    handleChange("columns", newColumns);
  };

  const addLink = (ci: number) => {
    const newColumns = [...columns];
    const newLinks = [...newColumns[ci].links, { label: "New Link", href: "#" }];
    newColumns[ci] = { ...newColumns[ci], links: newLinks };
    handleChange("columns", newColumns);
  };

  return (
    <div className="space-y-4">
      <SectionHeading>Footer</SectionHeading>
      <Row>
        <ColorInput
          label="Background"
          value={data.bgColor || "#0f172a"}
          onChange={(v) => handleChange("bgColor", v)}
        />
        <ColorInput
          label="Heading"
          value={data.headingColor || "#94a3b8"}
          onChange={(v) => handleChange("headingColor", v)}
        />
      </Row>
      <Row>
        <ColorInput
          label="Links"
          value={data.linkColor || "#cbd5e1"}
          onChange={(v) => handleChange("linkColor", v)}
        />
        <ColorInput
          label="Border"
          value={data.borderColor || "#1e293b"}
          onChange={(v) => handleChange("borderColor", v)}
        />
      </Row>
      <TextInput
        label="Copyright"
        value={data.copyrightText || ""}
        onChange={(v) => handleChange("copyrightText", v)}
        placeholder="© 2025 YourBrand"
      />
      <SectionHeading>Columns</SectionHeading>
      {columns.map((col, ci) => (
        <div key={ci} className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={col.heading}
              onChange={(e) => updateColumnHeading(ci, e.target.value)}
              className="text-sm font-semibold text-black border border-slate-200 rounded p-1 flex-1"
            />
            <button
              onClick={() => removeColumn(ci)}
              className="text-red-400 hover:text-red-600 text-sm ml-2"
            >
              ×
            </button>
          </div>
          {(col.links || []).map((link, li) => (
            <div key={li} className="flex gap-1 items-center">
              <input
                type="text"
                value={link.label}
                onChange={(e) => updateLink(ci, li, "label", e.target.value)}
                className="flex-1 text-xs text-black border border-slate-200 rounded p-1.5"
                placeholder="Label"
              />
              <input
                type="text"
                value={link.href}
                onChange={(e) => updateLink(ci, li, "href", e.target.value)}
                className="flex-1 text-xs text-black border border-slate-200 rounded p-1.5"
                placeholder="/path"
              />
              <button onClick={() => removeLink(ci, li)} className="text-red-400 text-xs">
                ×
              </button>
            </div>
          ))}
          <button onClick={() => addLink(ci)} className="text-xs text-blue-500 hover:underline">
            + Add link
          </button>
        </div>
      ))}
      <button
        onClick={addColumn}
        className="w-full py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
      >
        + Add Column
      </button>
    </div>
  );
}
