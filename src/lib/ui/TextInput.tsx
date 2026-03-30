import { FieldLabel } from "./FieldLabel";

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm text-black border border-slate-200 rounded p-2 outline-none focus:border-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
}