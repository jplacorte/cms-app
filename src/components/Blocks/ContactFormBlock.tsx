import { ContactFormBlockProps, FormField } from "@/lib/types";

const defaultFields: FormField[] = [
  { label: "Full Name", type: "text", placeholder: "John Doe" },
  { label: "Email", type: "email", placeholder: "john@example.com" },
  { label: "Message", type: "textarea", placeholder: "Tell us about your project..." },
];

export default function ContactFormBlock({
  heading,
  subheading,
  headingColor = "#0f172a",
  subheadingColor = "#64748b",
  fields = defaultFields,
  submitText = "Send Message",
  accentColor = "#2563eb",
  bgColor = "#ffffff",
  borderRadius = "16px",
  borderColor = "#e2e8f0",
}: ContactFormBlockProps) {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        borderRadius,
        padding: "40px 32px",
        width: "100%",
        border: `1px solid ${borderColor}`,
      }}
    >
      {heading && (
        <div
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: headingColor,
            marginBottom: "8px",
          }}
        >
          {heading}
        </div>
      )}
      {subheading && (
        <div
          style={{
            fontSize: "15px",
            color: subheadingColor,
            marginBottom: "28px",
          }}
        >
          {subheading}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {fields.map((field: FormField, index: number) => (
          <div key={index}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                placeholder={field.placeholder}
                rows={4}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  fontSize: "14px",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
                readOnly
              />
            ) : (
              <input
                type={field.type || "text"}
                placeholder={field.placeholder}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                readOnly
              />
            )}
          </div>
        ))}
        <button
          type="button"
          style={{
            backgroundColor: accentColor,
            color: "#ffffff",
            padding: "14px 24px",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          {submitText}
        </button>
      </div>
    </div>
  );
}
