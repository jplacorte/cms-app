import {
  ColorInput,
  NumberInput,
  Row,
  SectionHeading,
  SelectInput,
  TextInput,
} from "@/lib/ui";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  handleChange: (key: string, value: unknown) => void;
  weightOptions: { value: string; label: string }[];
}

export default function CustomButton({
  data,
  handleChange,
  weightOptions,
}: Props) {
  return (
    <div className="space-y-4">
      <SectionHeading>Button Styles</SectionHeading>
      <TextInput
        label="Button Text"
        value={data.text || ""}
        onChange={(v) => handleChange("text", v)}
      />
      <TextInput
        label="Link URL"
        value={data.href || ""}
        onChange={(v) => handleChange("href", v)}
        placeholder="https://..."
      />
      <Row>
        <ColorInput
          label="Background"
          value={data.bgColor || "#000000"}
          onChange={(v) => handleChange("bgColor", v)}
        />
        <ColorInput
          label="Text Color"
          value={data.textColor || "#ffffff"}
          onChange={(v) => handleChange("textColor", v)}
        />
      </Row>
      <Row>
        <NumberInput
          label="Padding X"
          value={data.paddingX || 24}
          onChange={(v) => handleChange("paddingX", v)}
        />
        <NumberInput
          label="Padding Y"
          value={data.paddingY || 12}
          onChange={(v) => handleChange("paddingY", v)}
        />
      </Row>
      <Row>
        <NumberInput
          label="Font Size"
          value={data.fontSize || 16}
          onChange={(v) => handleChange("fontSize", v)}
        />
        <SelectInput
          label="Font Weight"
          value={data.fontWeight || "600"}
          onChange={(v) => handleChange("fontWeight", v)}
          options={weightOptions}
        />
      </Row>
      <TextInput
        label="Border Radius"
        value={data.borderRadius || "4px"}
        onChange={(v) => handleChange("borderRadius", v)}
      />
      <Row>
        <NumberInput
          label="Border Width"
          value={data.borderWidth || 0}
          onChange={(v) => handleChange("borderWidth", v)}
          min={0}
        />
        <ColorInput
          label="Border Color"
          value={data.borderColor || "#000000"}
          onChange={(v) => handleChange("borderColor", v)}
        />
      </Row>
    </div>
  );
}
