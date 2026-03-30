import { AccordionBlockProps, AccordionItem } from "@/lib/types";

const defaultItems: AccordionItem[] = [
  { question: "What services do you offer?", answer: "We offer a wide range of services tailored to your needs." },
  { question: "How can I get started?", answer: "Simply reach out through our contact form and we'll guide you through the process." },
];

export default function AccordionBlock({
  items = defaultItems,
  bgColor = "transparent",
  borderRadius = "12px",
  textColor = "#1e293b",
  answerColor = "#64748b",
  borderColor = "#e2e8f0",
}: AccordionBlockProps) {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: bgColor,
        borderRadius,
        overflow: "hidden",
      }}
    >
      {items.map((item: AccordionItem, index: number) => (
        <details
          key={index}
          style={{
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <summary
            style={{
              padding: "18px 24px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
              color: textColor,
              listStyle: "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              userSelect: "none",
            }}
          >
            {item.question}
            <span style={{ fontSize: "18px", opacity: 0.5 }}>+</span>
          </summary>
          <div
            style={{
              padding: "0 24px 18px 24px",
              fontSize: "14px",
              lineHeight: "1.7",
              color: answerColor,
            }}
          >
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
