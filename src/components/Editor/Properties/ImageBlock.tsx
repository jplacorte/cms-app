import {
  ImageUploadInput,
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

export default function ImageBlock({ data, handleChange }: Props) {
  return (
    <div className="space-y-4">
      <SectionHeading>Image Settings</SectionHeading>
      <ImageUploadInput
        label="Image URL"
        value={data.src || ""}
        onChange={(v) => handleChange("src", v)}
        placeholder="https://..."
      />
      <TextInput
        label="Alt Text"
        value={data.alt || ""}
        onChange={(v) => handleChange("alt", v)}
        placeholder="Description of image"
      />
      <Row>
        <NumberInput
          label="Width (%)"
          value={data.width || 100}
          onChange={(v) => handleChange("width", v)}
          max={100}
        />
        <TextInput
          label="Radius"
          value={data.borderRadius || "0px"}
          onChange={(v) => handleChange("borderRadius", v)}
        />
      </Row>
      <Row>
        <SelectInput
          label="Object Fit"
          value={data.objectFit || "cover"}
          onChange={(v) => handleChange("objectFit", v)}
          options={[
            { value: "cover", label: "Cover" },
            { value: "contain", label: "Contain" },
            { value: "fill", label: "Fill" },
          ]}
        />
        <SelectInput
          label="Shadow"
          value={data.boxShadow ? "true" : "false"}
          onChange={(v) => handleChange("boxShadow", v === "true")}
          options={[
            { value: "false", label: "None" },
            { value: "true", label: "Soft Shadow" },
          ]}
        />
      </Row>
    </div>
  );
}
