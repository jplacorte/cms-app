export function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const isTransparent = value === "transparent" || value === "none";

  let pickerValue = "#000000";
  if (!isTransparent && value) {
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      pickerValue = value;
    } else if (/^#[0-9A-F]{3}$/i.test(value)) {
      pickerValue = `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`;
    }
  }

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1">
        <label className="block text-xs text-slate-500">{label}</label>
        <button
          onClick={() => onChange(isTransparent ? "#000000" : "transparent")}
          className={`text-[10px] px-1.5 py-0.5 rounded transition-colors ${
            isTransparent
              ? "bg-blue-100 text-blue-700"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
          }`}
          title="Toggle Transparent / None"
        >
          {isTransparent ? "Solid" : "None"}
        </button>
      </div>

      <div
        className={`flex items-center gap-2 p-1 border border-slate-200 rounded bg-white focus-within:border-blue-500 transition-colors ${
          isTransparent ? "opacity-50" : ""
        }`}
      >
        <div
          className="relative w-6 h-6 rounded border border-slate-200 overflow-hidden shrink-0"
          style={{ backgroundColor: isTransparent ? "#ffffff" : value }}
        >
          <input
            type="color"
            value={pickerValue}
            disabled={isTransparent}
            onChange={(e) => onChange(e.target.value)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] cursor-pointer opacity-0"
          />
        </div>

        <input
          type="text"
          value={value}
          disabled={isTransparent}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-xs uppercase text-black border-none outline-none bg-transparent font-mono"
          placeholder="#FFFFFF"
        />
      </div>
    </div>
  );
}
