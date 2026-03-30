import { ColorInput } from "@/lib/ui/ColorInput";
import { Row } from "@/lib/ui/Row";
import { SectionHeading } from "@/lib/ui/SectionHeading";
import { AccordionItem } from "@/lib/types";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  handleChange: (key: string, value: unknown) => void;
}

export default function AccordionBlock({
  data,
  handleChange,
}: Props) {
  const items = (data.items as AccordionItem[] || []);

  const updateItem = (index: number, field: keyof AccordionItem, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    handleChange("items", newItems);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    handleChange("items", newItems);
  };

  const addItem = () => {
    const newItem: AccordionItem = {
      question: "New Question",
      answer: "Answer here...",
    };
    handleChange("items", [...items, newItem]);
  };

  return (
    <div className="space-y-4">
      <SectionHeading>Accordion / FAQ</SectionHeading>
      {items.map((item, index) => (
        <div key={index} className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500">Item {index + 1}</span>
            <button
              onClick={() => removeItem(index)}
              className="text-xs text-red-400 hover:text-red-600"
            >
              Remove
            </button>
          </div>
          <input
            type="text"
            value={item.question}
            onChange={(e) => updateItem(index, "question", e.target.value)}
            className="w-full text-sm text-black border border-slate-200 rounded p-2"
            placeholder="Question"
          />
          <textarea
            value={item.answer}
            onChange={(e) => updateItem(index, "answer", e.target.value)}
            className="w-full text-sm text-black border border-slate-200 rounded p-2"
            rows={2}
            placeholder="Answer"
          />
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
      >
        + Add Item
      </button>

      <SectionHeading>Colors</SectionHeading>
      <Row>
        <ColorInput
          label="Text"
          value={data.textColor || "#1e293b"}
          onChange={(v) => handleChange("textColor", v)}
        />
        <ColorInput
          label="Answer"
          value={data.answerColor || "#64748b"}
          onChange={(v) => handleChange("answerColor", v)}
        />
      </Row>
      <Row>
        <ColorInput
          label="Background"
          value={data.bgColor || "#ffffff"}
          onChange={(v) => handleChange("bgColor", v)}
        />
        <ColorInput
          label="Border"
          value={data.borderColor || "#e2e8f0"}
          onChange={(v) => handleChange("borderColor", v)}
        />
      </Row>
    </div>
  );
}
