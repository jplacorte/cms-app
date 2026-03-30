import { ColorInput } from "@/lib/ui/ColorInput";
import { NumberInput } from "@/lib/ui/NumberInput";
import { Row } from "@/lib/ui/Row";
import { SectionHeading } from "@/lib/ui/SectionHeading";
import { SelectInput } from "@/lib/ui/SelectInput";
import { TextInput } from "@/lib/ui/TextInput";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  handleChange: (key: string, value: unknown) => void;
}

export default function GridContainer({
  data,
  handleChange,
}: Props) {
  return (
    <div className="space-y-4">
      <SectionHeading>Grid Settings</SectionHeading>
      <Row>
        <NumberInput
          label="Columns"
          value={data.columns || 2}
          onChange={(v) => handleChange("columns", v)}
          min={1}
          max={6}
        />
        <NumberInput label="Gap (px)" value={data.gap || 24} onChange={(v) => handleChange("gap", v)} />
      </Row>
      <SelectInput
        label="Align Items"
        value={data.alignItems || "stretch"}
        onChange={(v) => handleChange("alignItems", v)}
        options={[
          { value: "stretch", label: "Stretch" },
          { value: "start", label: "Top" },
          { value: "center", label: "Center" },
          { value: "end", label: "Bottom" },
        ]}
      />
      <Row>
        <NumberInput label="Padding X" value={data.paddingX || 0} onChange={(v) => handleChange("paddingX", v)} />
        <NumberInput label="Padding Y" value={data.paddingY || 24} onChange={(v) => handleChange("paddingY", v)} />
      </Row>
      <ColorInput
        label="Background"
        value={data.bgColor || "transparent"}
        onChange={(v) => handleChange("bgColor", v)}
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
          label="Radius"
          value={data.borderRadius || "0px"}
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
