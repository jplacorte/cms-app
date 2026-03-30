import { ColorInput } from "@/lib/ui/ColorInput";
import { ImageUploadInput } from "@/lib/ui/ImageUploadInput";
import { NumberInput } from "@/lib/ui/NumberInput";
import { Row } from "@/lib/ui/Row";
import { SectionHeading } from "@/lib/ui/SectionHeading";
import { TextInput } from "@/lib/ui/TextInput";
import { NavLink } from "@/lib/types";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  handleChange: (key: string, value: unknown) => void;
}

export default function SidebarNavBlock({
  data,
  handleChange,
}: Props) {
  const links = (data.links as NavLink[] || []);

  const updateLink = (index: number, field: keyof NavLink, value: string) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    handleChange("links", newLinks);
  };

  const removeLink = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    handleChange("links", newLinks);
  };

  const addLink = () => {
    const newLink: NavLink = {
      label: "New Link",
      href: "#",
    };
    handleChange("links", [...links, newLink]);
  };

  return (
    <div className="space-y-4">
      <SectionHeading>Sidebar Navigation</SectionHeading>
      <TextInput
        label="Logo Text"
        value={data.logoText || ""}
        onChange={(v) => handleChange("logoText", v)}
      />
      <ImageUploadInput
        label="Logo Image URL"
        value={data.logoUrl || ""}
        onChange={(v) => handleChange("logoUrl", v)}
        placeholder="https://..."
      />
      <NumberInput
        label="Logo Height (px)"
        value={data.logoHeight || 32}
        onChange={(v) => handleChange("logoHeight", v)}
        min={16}
        max={120}
      />
      <Row>
        <ColorInput
          label="Background"
          value={data.bgColor || "#ffffff"}
          onChange={(v) => handleChange("bgColor", v)}
        />
        <ColorInput
          label="Border Color"
          value={data.borderColor || "#e2e8f0"}
          onChange={(v) => handleChange("borderColor", v)}
        />
      </Row>
      <Row>
        <ColorInput
          label="Text"
          value={data.textColor || "#0f172a"}
          onChange={(v) => handleChange("textColor", v)}
        />
        <ColorInput
          label="Link Color"
          value={data.linkColor || "#475569"}
          onChange={(v) => handleChange("linkColor", v)}
        />
      </Row>
      <Row>
        <NumberInput label="Padding X" value={data.paddingX || 24} onChange={(v) => handleChange("paddingX", v)} />
        <NumberInput label="Padding Y" value={data.paddingY || 32} onChange={(v) => handleChange("paddingY", v)} />
      </Row>
      <SectionHeading>Navigation Links</SectionHeading>
      {links.map((link, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            type="text"
            value={link.label}
            onChange={(e) => updateLink(index, "label", e.target.value)}
            className="flex-1 text-sm text-black border border-slate-200 rounded p-2"
            placeholder="Label"
          />
          <input
            type="text"
            value={link.href}
            onChange={(e) => updateLink(index, "href", e.target.value)}
            className="flex-1 text-sm text-black border border-slate-200 rounded p-2"
            placeholder="/path"
          />
          <button
            onClick={() => removeLink(index)}
            className="text-red-400 hover:text-red-600 text-sm"
          >
            ×
          </button>
        </div>
      ))}
      <button
        onClick={addLink}
        className="w-full py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
      >
        + Add Link
      </button>
      <SectionHeading>CTA Button</SectionHeading>
      <TextInput
        label="CTA Text"
        value={data.ctaText || ""}
        onChange={(v) => handleChange("ctaText", v)}
      />
      <TextInput
        label="CTA Link"
        value={data.ctaLink || ""}
        onChange={(v) => handleChange("ctaLink", v)}
      />
      <Row>
        <ColorInput
          label="CTA BG"
          value={data.ctaBgColor || "#2563eb"}
          onChange={(v) => handleChange("ctaBgColor", v)}
        />
        <ColorInput
          label="CTA Text"
          value={data.ctaTextColor || "#ffffff"}
          onChange={(v) => handleChange("ctaTextColor", v)}
        />
      </Row>
    </div>
  );
}
