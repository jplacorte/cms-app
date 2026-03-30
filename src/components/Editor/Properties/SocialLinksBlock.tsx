import { ColorInput } from "@/lib/ui/ColorInput";
import { NumberInput } from "@/lib/ui/NumberInput";
import { Row } from "@/lib/ui/Row";
import { SectionHeading } from "@/lib/ui/SectionHeading";
import { SelectInput } from "@/lib/ui/SelectInput";
import { SocialLink } from "@/lib/types";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  handleChange: (key: string, value: unknown) => void;
  textAlignOptions: { value: string; label: string }[];
}

export default function SocialLinksBlock({
  data,
  handleChange,
  textAlignOptions,
}: Props) {
  const links = (data.links as SocialLink[] || []);

  const updateLink = (index: number, field: keyof SocialLink, value: string) => {
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
    const newLink: SocialLink = {
      platform: "twitter",
      url: "#",
    };
    handleChange("links", [...links, newLink]);
  };

  return (
    <div className="space-y-4">
      <SectionHeading>Social Links</SectionHeading>
      <Row>
        <ColorInput
          label="Icon Color"
          value={data.iconColor || "#64748b"}
          onChange={(v) => handleChange("iconColor", v)}
        />
        <NumberInput
          label="Icon Size"
          value={data.iconSize || 20}
          onChange={(v) => handleChange("iconSize", v)}
          min={12}
          max={48}
        />
      </Row>
      <Row>
        <SelectInput
          label="Alignment"
          value={data.alignment || "center"}
          onChange={(v) => handleChange("alignment", v)}
          options={textAlignOptions}
        />
        <NumberInput label="Gap (px)" value={data.gap || 16} onChange={(v) => handleChange("gap", v)} />
      </Row>
      <SectionHeading>Links</SectionHeading>
      {links.map((link, index) => (
        <div key={index} className="flex gap-2 items-center">
          <select
            value={link.platform}
            onChange={(e) => updateLink(index, "platform", e.target.value)}
            className="flex-1 text-sm text-black border border-slate-200 rounded p-2 bg-white"
          >
            <option value="twitter">Twitter</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="youtube">YouTube</option>
            <option value="github">GitHub</option>
          </select>
          <input
            type="text"
            value={link.url}
            onChange={(e) => updateLink(index, "url", e.target.value)}
            className="flex-1 text-sm text-black border border-slate-200 rounded p-2"
            placeholder="https://..."
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
        + Add Social Link
      </button>
    </div>
  );
}
