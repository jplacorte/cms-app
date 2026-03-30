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
}

export default function ContainerSection({ data, handleChange }: Props) {
  return (
    <div className="space-y-4">
      <SectionHeading>Section Settings</SectionHeading>
      <ColorInput
        label="Background Color"
        value={data.bgColor || "#f8fafc"}
        onChange={(v) => handleChange("bgColor", v)}
      />
      <Row>
        <NumberInput
          label="Padding X"
          value={data.paddingX || 24}
          onChange={(v) => handleChange("paddingX", v)}
        />
        <NumberInput
          label="Padding Y"
          value={data.paddingY || 40}
          onChange={(v) => handleChange("paddingY", v)}
        />
      </Row>
      <Row>
        <NumberInput
          label="Gap (px)"
          value={data.gap || 16}
          onChange={(v) => handleChange("gap", v)}
        />
        <NumberInput
          label="Min Height"
          value={parseInt(data.minHeight) || 150}
          onChange={(v) => handleChange("minHeight", `${v}px`)}
        />
      </Row>
      <Row>
        <SelectInput
          label="Direction"
          value={data.direction || "column"}
          onChange={(v) => handleChange("direction", v)}
          options={[
            { value: "column", label: "Vertical" },
            { value: "row", label: "Horizontal" },
          ]}
        />
        <SelectInput
          label="Align Items"
          value={data.alignItems || "center"}
          onChange={(v) => handleChange("alignItems", v)}
          options={[
            { value: "flex-start", label: "Start" },
            { value: "center", label: "Center" },
            { value: "flex-end", label: "End" },
            { value: "stretch", label: "Stretch" },
          ]}
        />
      </Row>
      <SelectInput
        label="Justify Content"
        value={data.justifyContent || "flex-start"}
        onChange={(v) => handleChange("justifyContent", v)}
        options={[
          { value: "flex-start", label: "Start" },
          { value: "center", label: "Center" },
          { value: "flex-end", label: "End" },
          { value: "space-between", label: "Space Between" },
          { value: "space-evenly", label: "Space Evenly" },
        ]}
      />
      <Row>
        <NumberInput
          label="Border Width"
          value={data.borderWidth || 0}
          onChange={(v) => handleChange("borderWidth", v)}
        />
        <ColorInput
          label="Border Color"
          value={data.borderColor || "transparent"}
          onChange={(v) => handleChange("borderColor", v)}
        />
      </Row>
      <Row>
        <TextInput
          label="Border Radius"
          value={data.borderRadius || "8px"}
          onChange={(v) => handleChange("borderRadius", v)}
        />
        <SelectInput
          label="Shadow"
          value={data.shadow ? "true" : "false"}
          onChange={(v) => handleChange("shadow", v === "true")}
          options={[
            { value: "false", label: "None" },
            { value: "true", label: "Soft Shadow" },
          ]}
        />
      </Row>
    </div>
  );
}
