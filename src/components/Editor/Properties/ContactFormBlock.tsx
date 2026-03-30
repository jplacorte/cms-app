import { ColorInput } from "@/lib/ui/ColorInput";
import { Row } from "@/lib/ui/Row";
import { SectionHeading } from "@/lib/ui/SectionHeading";
import { TextInput } from "@/lib/ui/TextInput";
import { FormField } from "@/lib/types";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  handleChange: (key: string, value: unknown) => void;
}

export default function ContactFormBlock({
  data,
  handleChange,
}: Props) {
  const fields = (data.fields as FormField[] || []);

  const updateField = (index: number, field: keyof FormField, value: string) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], [field]: value };
    handleChange("fields", newFields);
  };

  const removeField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    handleChange("fields", newFields);
  };

  const addField = () => {
    const newField: FormField = {
      label: "New Field",
      type: "text",
      placeholder: "",
    };
    handleChange("fields", [...fields, newField]);
  };

  return (
    <div className="space-y-4">
      <SectionHeading>Contact Form</SectionHeading>
      <TextInput
        label="Heading"
        value={data.heading || ""}
        onChange={(v) => handleChange("heading", v)}
      />
      <TextInput
        label="Subheading"
        value={data.subheading || ""}
        onChange={(v) => handleChange("subheading", v)}
      />
      <TextInput
        label="Submit Button Text"
        value={data.submitText || "Send Message"}
        onChange={(v) => handleChange("submitText", v)}
      />
      <Row>
        <ColorInput
          label="Accent Color"
          value={data.accentColor || "#2563eb"}
          onChange={(v) => handleChange("accentColor", v)}
        />
        <ColorInput
          label="Background"
          value={data.bgColor || "#ffffff"}
          onChange={(v) => handleChange("bgColor", v)}
        />
      </Row>
      <SectionHeading>Form Fields</SectionHeading>
      {fields.map((field, index) => (
        <div key={index} className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500">Field {index + 1}</span>
            <button
              onClick={() => removeField(index)}
              className="text-xs text-red-400 hover:text-red-600"
            >
              Remove
            </button>
          </div>
          <input
            type="text"
            value={field.label}
            onChange={(e) => updateField(index, "label", e.target.value)}
            className="w-full text-sm text-black border border-slate-200 rounded p-2"
            placeholder="Field label"
          />
          <div className="flex gap-2">
            <select
              value={field.type}
              onChange={(e) => updateField(index, "type", e.target.value)}
              className="flex-1 text-sm text-black border border-slate-200 rounded p-2 bg-white"
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="tel">Phone</option>
              <option value="textarea">Textarea</option>
            </select>
            <input
              type="text"
              value={field.placeholder}
              onChange={(e) => updateField(index, "placeholder", e.target.value)}
              className="flex-1 text-sm text-black border border-slate-200 rounded p-2"
              placeholder="Placeholder"
            />
          </div>
        </div>
      ))}
      <button
        onClick={addField}
        className="w-full py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
      >
        + Add Field
      </button>
    </div>
  );
}
