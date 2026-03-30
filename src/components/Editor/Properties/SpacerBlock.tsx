import { NumberInput } from "@/lib/ui/NumberInput";
import { SectionHeading } from "@/lib/ui/SectionHeading";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  handleChange: (key: string, value: unknown) => void;
}

export default function SpacerBlock({
  data,
  handleChange,
}: Props) {
  return (
    <div className="space-y-4">
      <SectionHeading>Spacer</SectionHeading>
      <NumberInput
        label="Height (px)"
        value={data.height || 40}
        onChange={(v) => handleChange("height", v)}
        min={4}
        max={400}
      />
    </div>
  );
}
