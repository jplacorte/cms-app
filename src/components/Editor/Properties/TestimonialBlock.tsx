import { ColorInput } from "@/lib/ui/ColorInput";
import { ImageUploadInput } from "@/lib/ui/ImageUploadInput";
import { Row } from "@/lib/ui/Row";
import { SectionHeading } from "@/lib/ui/SectionHeading";
import { TextArea } from "@/lib/ui/TextArea";
import { TextInput } from "@/lib/ui/TextInput";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  handleChange: (key: string, value: unknown) => void;
}

export default function TestimonialBlock({
  data,
  handleChange,
}: Props) {
  return (
    <div className="space-y-4">
      <SectionHeading>Testimonial</SectionHeading>
      <TextArea
        label="Quote"
        value={data.quote || ""}
        onChange={(v) => handleChange("quote", v)}
        rows={3}
      />
      <Row>
        <TextInput
          label="Name"
          value={data.name || ""}
          onChange={(v) => handleChange("name", v)}
        />
        <TextInput
          label="Title"
          value={data.title || ""}
          onChange={(v) => handleChange("title", v)}
        />
      </Row>
      <ImageUploadInput
        label="Avatar URL"
        value={data.avatarUrl || ""}
        onChange={(v) => handleChange("avatarUrl", v)}
        placeholder="https://..."
      />
      <SectionHeading>Colors</SectionHeading>
      <Row>
        <ColorInput
          label="Background"
          value={data.bgColor || "#f8fafc"}
          onChange={(v) => handleChange("bgColor", v)}
        />
        <ColorInput
          label="Quote"
          value={data.quoteColor || "#334155"}
          onChange={(v) => handleChange("quoteColor", v)}
        />
      </Row>
      <TextInput
        label="Border Radius"
        value={data.borderRadius || "16px"}
        onChange={(v) => handleChange("borderRadius", v)}
      />
    </div>
  );
}
