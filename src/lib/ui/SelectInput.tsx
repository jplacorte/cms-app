import { FieldLabel } from "./FieldLabel";

export function SelectInput({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex-1">
      <FieldLabel>{label}</FieldLabel>
      <select
        value={String(value)}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm text-black border border-slate-200 rounded p-2 outline-none focus:border-blue-500 bg-white"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}