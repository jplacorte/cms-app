import {
  ColorInput,
  ImageUploadInput,
  NumberInput,
  Row,
  SectionHeading,
  SelectInput,
  TextArea,
  TextInput,
} from "@/lib/ui";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  handleChange: (key: string, value: unknown) => void;
}

export default function CardBlock({ data, handleChange }: Props) {
  return (
    <div className="space-y-4">
      <SectionHeading>Card</SectionHeading>
      <ImageUploadInput
        label="Image URL"
        value={data.imageUrl || ""}
        onChange={(v) => handleChange("imageUrl", v)}
        placeholder="https://..."
      />
      <NumberInput
        label="Image Height (px)"
        value={parseInt(data.imageHeight) || 200}
        onChange={(v) => handleChange("imageHeight", `${v}px`)}
      />
      <TextInput
        label="Title"
        value={data.title || ""}
        onChange={(v) => handleChange("title", v)}
      />
      <TextArea
        label="Description"
        value={data.description || ""}
        onChange={(v) => handleChange("description", v)}
      />
      <Row>
        <TextInput
          label="Link Text"
          value={data.linkText || ""}
          onChange={(v) => handleChange("linkText", v)}
        />
        <TextInput
          label="Link URL"
          value={data.linkUrl || ""}
          onChange={(v) => handleChange("linkUrl", v)}
          placeholder="https://..."
        />
      </Row>
      <SectionHeading>Styles</SectionHeading>
      <Row>
        <ColorInput
          label="Background"
          value={data.bgColor || "#ffffff"}
          onChange={(v) => handleChange("bgColor", v)}
        />
        <ColorInput
          label="Text"
          value={data.textColor || "#0f172a"}
          onChange={(v) => handleChange("textColor", v)}
        />
      </Row>
      <TextInput
        label="Border Radius"
        value={data.borderRadius || "12px"}
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
    </div>
  );
}
