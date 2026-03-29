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
  borderWidth = 1,
  borderStyle = "solid",
  shadow = false,
  outlineColor = "#3b82f6",
  outlineStyle = "none",
  ctaText,
  ctaLink,
  ctaBgColor = "#2563eb",
  ctaTextColor = "#ffffff",
  customClassName = "",
}: NavbarBlockProps) {
  return (
    <nav
      className={customClassName}
      style={{
        ...(bgColor !== "transparent" && bgColor !== "none" ? { backgroundColor: bgColor } : { backgroundColor: "transparent" }),
        padding: "0 32px",
        width: "100%",
        borderBottom: borderStyle && borderStyle !== "none" ? `${borderWidth}px ${borderStyle} ${borderColor}` : "none",
        boxShadow: shadow && shadow !== "none" as unknown as boolean && shadow.toString() !== "false" ? "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)" : "none",
        outline: outlineStyle && outlineStyle !== "none" ? `2px ${outlineStyle} ${outlineColor}` : "none",
        outlineOffset: "-2px",
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
            <div key={index} className="relative group flex items-center h-full">
              <a
                href={link.href || "#"}
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: linkColor,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  height: "64px",
                }}
                className="hover:opacity-80 transition-opacity"
              >
                {link.label}
                {link.sublinks && link.sublinks.length > 0 && (
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </a>

              {/* Dropdown Menu */}
              {link.sublinks && link.sublinks.length > 0 && (
                <div 
                  className="absolute top-[64px] left-0 md:left-1/2 md:-translate-x-1/2 min-w-[200px] bg-white rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col py-2"
                  style={{
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    border: `1px solid ${borderColor}`,
                    backgroundColor: bgColor,
                  }}
                >
                  {link.sublinks.map((sublink, subIndex) => (
                    <a
                      key={subIndex}
                      href={sublink.href || "#"}
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: linkColor,
                        textDecoration: "none",
                        padding: "10px 20px",
                        display: "block",
                      }}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      {sublink.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
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
