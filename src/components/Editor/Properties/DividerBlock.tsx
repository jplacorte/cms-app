import {
  ColorInput,
  NumberInput,
  Row,
  SectionHeading,
  SelectInput,
} from "@/lib/ui";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  handleChange: (key: string, value: unknown) => void;
}

export default function DividerBlock({ data, handleChange }: Props) {
  return (
    <div className="space-y-4">
      <SectionHeading>Divider</SectionHeading>
      <Row>
        <ColorInput
          label="Color"
          value={data.color || "#e2e8f0"}
          onChange={(v) => handleChange("color", v)}
        />
        <NumberInput
          label="Thickness"
          value={data.thickness || 1}
          onChange={(v) => handleChange("thickness", v)}
          min={1}
          max={10}
        />
      </Row>
      <Row>
        <SelectInput
          label="Style"
          value={data.style || "solid"}
          onChange={(v) => handleChange("style", v)}
          options={[
            { value: "solid", label: "Solid" },
            { value: "dashed", label: "Dashed" },
            { value: "dotted", label: "Dotted" },
          ]}
        />
        <NumberInput
          label="Width (%)"
          value={data.width || 100}
          onChange={(v) => handleChange("width", v)}
          min={10}
          max={100}
        />
      </Row>
      <NumberInput
        label="Vertical Padding"
        value={data.paddingY || 16}
        onChange={(v) => handleChange("paddingY", v)}
      />
    </div>
  );
}
