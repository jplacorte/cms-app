import { NavbarBlockProps, NavLink } from "@/lib/types";

const defaultLinks: NavLink[] = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Services", href: "#" },
  { label: "Contact", href: "#" },
];

export default function NavbarBlock({
  logoText = "YourBrand",
  logoUrl,
  links = defaultLinks,
  bgColor = "#ffffff",
  textColor = "#0f172a",
  linkColor = "#475569",
  borderColor = "#e2e8f0",
  ctaText,
  ctaLink,
  ctaBgColor = "#2563eb",
  ctaTextColor = "#ffffff",
}: NavbarBlockProps) {
  return (
    <nav
      style={{
        backgroundColor: bgColor,
        padding: "0 32px",
        width: "100%",
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {logoUrl && (
            <img
              src={logoUrl}
              alt={logoText}
              style={{ height: "32px", objectFit: "contain" }}
            />
          )}
          <span
            style={{
              fontWeight: "800",
              fontSize: "20px",
              color: textColor,
              letterSpacing: "-0.5px",
            }}
          >
            {logoText}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {links.map((link: NavLink, index: number) => (
            <a
              key={index}
              href={link.href || "#"}
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: linkColor,
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
          {ctaText && (
            <a
              href={ctaLink || "#"}
              style={{
                backgroundColor: ctaBgColor,
                color: ctaTextColor,
                padding: "8px 20px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
