import { FooterBlockProps, FooterColumn, NavLink } from "@/lib/types";

const defaultColumns: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
];

export default function FooterBlock({
  columns = defaultColumns,
  bgColor = "#0f172a",
  headingColor = "#94a3b8",
  linkColor = "#cbd5e1",
  borderColor = "#1e293b",
  copyrightText,
  copyrightColor = "#64748b",
}: FooterBlockProps) {
  const copyright = copyrightText || `© ${new Date().getFullYear()} YourBrand. All rights reserved.`;

  return (
    <footer
      style={{
        backgroundColor: bgColor,
        padding: "64px 32px 32px 32px",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
          gap: "48px",
          marginBottom: "48px",
        }}
      >
        {columns.map((col: FooterColumn, index: number) => (
          <div key={index}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: headingColor,
                marginBottom: "16px",
              }}
            >
              {col.heading}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {col.links.map((link: NavLink, li: number) => (
                <a
                  key={li}
                  href={link.href || "#"}
                  style={{
                    fontSize: "14px",
                    color: linkColor,
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          borderTop: `1px solid ${borderColor}`,
          paddingTop: "24px",
          fontSize: "13px",
          color: copyrightColor,
          textAlign: "center",
        }}
      >
        {copyright}
      </div>
    </footer>
  );
}
