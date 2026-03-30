import { ColorInput } from "@/lib/ui/ColorInput";
import { NumberInput } from "@/lib/ui/NumberInput";
import { Row } from "@/lib/ui/Row";
import { SectionHeading } from "@/lib/ui/SectionHeading";
import { SelectInput } from "@/lib/ui/SelectInput";
import { TextArea } from "@/lib/ui/TextArea";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  handleChange: (key: string, value: unknown) => void;
  weightOptions: { value: string; label: string }[];
  textAlignOptions: { value: string; label: string }[];
}

export default function TextBlock({
  data,
  handleChange,
  weightOptions,
  textAlignOptions,
}: Props) {
  return (
    <div className="space-y-4">
      <SectionHeading>Typography Settings</SectionHeading>
      <TextArea
        label="Content"
        value={data.content || ""}
        onChange={(v) => handleChange("content", v)}
        rows={4}
      />
      <Row>
        <SelectInput
          label="HTML Tag"
          value={data.tag || "p"}
          onChange={(v) => handleChange("tag", v)}
          options={[
            { value: "h1", label: "Heading 1" },
            { value: "h2", label: "Heading 2" },
            { value: "h3", label: "Heading 3" },
            { value: "h4", label: "Heading 4" },
            { value: "p", label: "Paragraph" },
          ]}
        />
        <ColorInput
          label="Color"
          value={data.textColor || "#334155"}
          onChange={(v) => handleChange("textColor", v)}
        />
      </Row>
      <Row>
        <NumberInput
          label="Font Size"
          value={data.fontSize || 16}
          onChange={(v) => handleChange("fontSize", v)}
        />
        <SelectInput
          label="Weight"
          value={data.fontWeight || "400"}
          onChange={(v) => handleChange("fontWeight", v)}
          options={weightOptions}
        />
      </Row>
      <Row>
        <SelectInput
          label="Alignment"
          value={data.textAlign || "left"}
          onChange={(v) => handleChange("textAlign", v)}
          options={textAlignOptions}
        />
        <SelectInput
          label="Line Height"
          value={data.lineHeight || "1.4"}
          onChange={(v) => handleChange("lineHeight", v)}
          options={[
            { value: "1", label: "Tight" },
            { value: "1.4", label: "Normal" },
            { value: "1.6", label: "Relaxed" },
            { value: "2", label: "Loose" },
          ]}
        />
      </Row>
      <NumberInput
        label="Letter Spacing (px)"
        value={data.letterSpacing || 0}
        onChange={(v) => handleChange("letterSpacing", v)}
      />
    </div>
  );
}
