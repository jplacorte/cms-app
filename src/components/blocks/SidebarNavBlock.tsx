import { NavLink } from "@/lib/types";

export interface SidebarNavBlockProps {
  logoText?: string;
  logoUrl?: string;
  links?: NavLink[];
  bgColor?: string;
  textColor?: string;
  linkColor?: string;
  borderColor?: string;
  ctaText?: string;
  ctaLink?: string;
  ctaBgColor?: string;
  ctaTextColor?: string;
  paddingY?: number;
  paddingX?: number;
}

const defaultLinks: NavLink[] = [
  { label: "Dashboard", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Team", href: "#" },
  { label: "Settings", href: "#" },
];

export default function SidebarNavBlock({
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
  paddingX = 24,
  paddingY = 32,
}: SidebarNavBlockProps) {
  return (
    <aside
      style={{
        backgroundColor: bgColor,
        padding: `${paddingY}px ${paddingX}px`,
        width: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        borderRight: `1px solid ${borderColor}`,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px" }}>
        {logoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
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

      <nav style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
        {links.map((link: NavLink, index: number) => (
          <a
            key={index}
            href={link.href || "#"}
            style={{
              fontSize: "15px",
              fontWeight: "500",
              color: linkColor,
              textDecoration: "none",
              padding: "8px 12px",
              borderRadius: "6px",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {ctaText && (
        <div style={{ marginTop: "32px" }}>
          <a
            href={ctaLink || "#"}
            style={{
              display: "block",
              textAlign: "center",
              backgroundColor: ctaBgColor,
              color: ctaTextColor,
              padding: "12px 20px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              textDecoration: "none",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {ctaText}
          </a>
        </div>
      )}
    </aside>
  );
}
