import { SectionHeading, SelectInput, TextInput } from "@/lib/ui";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  handleChange: (key: string, value: unknown) => void;
}

export default function VideoBlock({ data, handleChange }: Props) {
  return (
    <div className="space-y-4">
      <SectionHeading>Video</SectionHeading>
      <TextInput
        label="Video URL"
        value={data.url || ""}
        onChange={(v) => handleChange("url", v)}
        placeholder="YouTube, Vimeo, or direct URL"
      />
      <SelectInput
        label="Aspect Ratio"
        value={data.aspectRatio || "16/9"}
        onChange={(v) => handleChange("aspectRatio", v)}
        options={[
          { value: "16/9", label: "16:9 (Widescreen)" },
          { value: "4/3", label: "4:3 (Standard)" },
          { value: "1/1", label: "1:1 (Square)" },
          { value: "9/16", label: "9:16 (Vertical)" },
        ]}
      />
      <TextInput
        label="Border Radius"
        value={data.borderRadius || "8px"}
        onChange={(v) => handleChange("borderRadius", v)}
      />
    </div>
  );
}
