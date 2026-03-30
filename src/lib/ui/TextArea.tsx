import { FieldLabel } from "./FieldLabel";

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}

export function TextArea({
  label,
  value,
  onChange,
  rows,
}: Props) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm text-black border border-slate-200 rounded p-2 outline-none focus:border-blue-500"
        rows={rows || 3}
      />
    </div>
  );
}
