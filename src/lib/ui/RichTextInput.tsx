import { useRef } from "react";
import { FieldLabel } from "./FieldLabel";

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}

export function RichTextInput({
  label,
  value,
  onChange,
  multiline = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const applyStyle = (styleProp: string, styleValue: string) => {
    const el = inputRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;

    if (start === null || end === null || start === end) {
      alert(
        "Please highlight the text inside the input box first to apply a specific style!",
      );
      return;
    }

    const selectedText = value.substring(start, end);
    const wrappedText = `<span style="${styleProp}: ${styleValue};">${selectedText}</span>`;
    const newValue =
      value.substring(0, start) + wrappedText + value.substring(end);

    onChange(newValue);
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-end mb-1">
        <FieldLabel>{label}</FieldLabel>
        <span className="text-[10px] text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded font-medium">
          Highlight text to style
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 p-1.5 border border-slate-200 border-b-0 rounded-t-md bg-slate-100">
        <input
          type="color"
          className="w-6 h-6 p-0 border-0 rounded cursor-pointer"
          onChange={(e) => applyStyle("color", e.target.value)}
          title="Highlight text, then pick a color"
        />
        <select
          className="text-[11px] text-black p-1 rounded border border-slate-300 outline-none focus:border-blue-500 bg-white"
          onChange={(e) => {
            if (e.target.value) applyStyle("font-size", e.target.value);
            e.target.value = "";
          }}
          title="Font Size"
        >
          <option value="">Select Size</option>
          <option value="0.8em">Small (0.8x)</option>
          <option value="1.2em">Large (1.2x)</option>
          <option value="1.5em">X-Large (1.5x)</option>
          <option value="2em">Huge (2x)</option>
          <option value="12px">12px</option>
          <option value="16px">16px</option>
          <option value="24px">24px</option>
          <option value="32px">32px</option>
          <option value="48px">48px</option>
          <option value="64px">64px</option>
        </select>
        <select
          className="text-[11px] text-black p-1 rounded border border-slate-300 outline-none focus:border-blue-500 bg-white"
          onChange={(e) => {
            if (e.target.value) applyStyle("font-weight", e.target.value);
            e.target.value = "";
          }}
          title="Font Weight"
        >
          <option value="">Select Weight</option>
          <option value="300">Light</option>
          <option value="400">Normal</option>
          <option value="600">Semibold</option>
          <option value="800">Bold</option>
          <option value="900">Black</option>
        </select>
        <select
          className="text-[11px] text-black p-1 rounded border border-slate-300 outline-none focus:border-blue-500 bg-white"
          onChange={(e) => {
            if (e.target.value) applyStyle("font-family", e.target.value);
            e.target.value = "";
          }}
          title="Font Family"
        >
          <option value="">Select Font</option>
          <option value="sans-serif">Sans-serif</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
          <option value="cursive">Cursive</option>
        </select>
      </div>

      {multiline ? (
        <textarea
          ref={inputRef as any}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-sm text-slate-800 border border-slate-200 rounded-b-md p-2 outline-none focus:border-blue-500 font-mono leading-relaxed"
          rows={4}
        />
      ) : (
        <input
          ref={inputRef as any}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-sm text-slate-800 border border-slate-200 rounded-b-md p-2 outline-none focus:border-blue-500 font-mono"
        />
      )}
    </div>
  );
}
