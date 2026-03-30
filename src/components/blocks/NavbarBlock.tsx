"use client";

const defaultLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Services", href: "#" },
  { label: "Contact", href: "#" },
];

export default function NavbarBlock({
  logoText = "YourBrand",
  logoUrl,
  logoHeight = 32,
  links = defaultLinks,
  bgColor = "#ffffff",
  textColor = "#000000",
  
  // Navigation Links Typography & Hover
  linkColor = "#475569",
  linkFontSize = 14,
  linkFontWeight = "500",
  linkColorHover = "#2563eb",
  dropdownBgColor = "#ffffff",
  
  // Navbar Container Styling (NEW: Width & Padding controls)
  maxWidth = "1200px",
  paddingX = 32,
  paddingY = 0,
  borderColor = "#e2e8f0",
  borderWidth = 1,
  borderStyle = "solid",
  shadow = false,
  outlineColor = "#3b82f6",
  outlineStyle = "none",
  
  // Primary CTA Button
  ctaText,
  ctaLink,
  ctaBgColor = "#2563eb",
  ctaTextColor = "#ffffff",
  ctaBorderWidth = 0,
  ctaBorderColor = "transparent",
  ctaBorderRadius = "8px",
  ctaHoverBgColor = "#1d4ed8",
  ctaHoverTextColor = "#ffffff",
  ctaPaddingX = 20,
  ctaPaddingY = 8,
  ctaFontSize = 14,
  ctaFontWeight = "600",
  
  // Secondary CTA Button
  cta2Text,
  cta2Link,
  cta2BgColor = "transparent",
  cta2TextColor = "#0f172a",
  cta2BorderWidth = 1,
  cta2BorderColor = "#e2e8f0",
  cta2BorderRadius = "8px",
  cta2HoverBgColor = "#f8fafc",
  cta2HoverTextColor = "#0f172a",
  cta2PaddingX = 20,
  cta2PaddingY = 8,
  cta2FontSize = 14,
  cta2FontWeight = "600",
  
  customClassName = "",
}: any) { 

  const getDirectImageUrl = (url?: string) => {
    if (!url) return "";
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (url.includes("drive.google.com") && match && match[1]) {
      return `https://lh3.googleusercontent.com/d/$$${match[1]}`;
    }
    return url; 
  };

  const dropdownBgColorValue = bgColor === "transparent" || bgColor === "none" ? "#ffffff" : dropdownBgColor;

  return (
    <nav
      className={customClassName}
      style={{
        backgroundColor: bgColor !== "transparent" && bgColor !== "none" ? bgColor : "transparent",
        padding: `${paddingY}px ${paddingX}px`, // NEW: Dynamic Container Padding
        width: "100%",
        borderBottom: (!borderStyle || borderStyle === "none" || borderWidth === 0 || borderWidth === "0") 
          ? "none" 
          : `${borderWidth}px ${borderStyle} ${borderColor}`,
        boxShadow: (shadow && shadow.toString() !== "false" && shadow !== "none") 
          ? "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)" 
          : "none",
        outline: (!outlineStyle || outlineStyle === "none") ? "none" : `2px ${outlineStyle} ${outlineColor}`,
        outlineOffset: "-2px",
      }}
    >
      <div
        style={{
          maxWidth: maxWidth, // NEW: Dynamic Max Width
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
              src={getDirectImageUrl(logoUrl)}
              alt={logoText}
              style={{ height: `${logoHeight}px`, objectFit: "contain" }}
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
          {links.map((link: any, index: number) => (
            <div key={index} className="relative group flex items-center h-full">
              <a
                href={link.href || "#"}
                style={{
                  fontSize: `${linkFontSize}px`,
                  fontWeight: Number(linkFontWeight) || 500,
                  color: linkColor,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  height: "64px",
                  transition: "color 0.2s ease-in-out",
                }}
                className="hover:opacity-90"
                onMouseEnter={(e) => (e.currentTarget.style.color = linkColorHover)}
                onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
              >
                {link.label}
                {link.sublinks && link.sublinks.length > 0 && (
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </a>

              {link.sublinks && link.sublinks.length > 0 && (
                <div 
                  className="absolute top-[64px] left-0 md:left-1/2 md:-translate-x-1/2 min-w-[240px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col py-2"
                  style={{
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    border: `1px solid ${borderColor === "transparent" ? "#e2e8f0" : borderColor}`,
                    backgroundColor: dropdownBgColorValue,
                  }}
                >
                  {link.sublinks.map((sublink: any, subIndex: number) => (
                    <a
                      key={subIndex}
                      href={sublink.href || "#"}
                      style={{
                        fontSize: `${linkFontSize}px`,
                        fontWeight: Number(linkFontWeight) || 500,
                        color: linkColor,
                        textDecoration: "none",
                        padding: "10px 20px",
                        display: "block",
                        whiteSpace: "nowrap",
                        transition: "color 0.2s ease-in-out, background-color 0.2s ease-in-out",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = linkColorHover;
                        e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.03)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = linkColor;
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {sublink.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* CTA Buttons Container */}
          <div className="flex items-center gap-3 ml-2">
            {/* Secondary CTA */}
            {cta2Text && (
              <a
                href={cta2Link || "#"}
                style={{
                  backgroundColor: cta2BgColor,
                  color: cta2TextColor,
                  padding: `${cta2PaddingY}px ${cta2PaddingX}px`,
                  borderRadius: cta2BorderRadius,
                  border: `${cta2BorderWidth}px solid ${cta2BorderColor}`,
                  fontSize: `${cta2FontSize}px`, 
                  fontWeight: Number(cta2FontWeight) || 600,    
                  textDecoration: "none",
                  transition: "all 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = cta2HoverBgColor;
                  e.currentTarget.style.color = cta2HoverTextColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = cta2BgColor;
                  e.currentTarget.style.color = cta2TextColor;
                }}
                className="inline-flex items-center justify-center whitespace-nowrap"
              >
                {cta2Text}
              </a>
            )}

            {/* Primary CTA */}
            {ctaText && (
              <a
                href={ctaLink || "#"}
                style={{
                  backgroundColor: ctaBgColor,
                  color: ctaTextColor,
                  padding: `${ctaPaddingY}px ${ctaPaddingX}px`,
                  borderRadius: ctaBorderRadius,
                  border: `${ctaBorderWidth}px solid ${ctaBorderColor}`,
                  fontSize: `${ctaFontSize}px`,  
                  fontWeight: Number(ctaFontWeight) || 600,     
                  textDecoration: "none",
                  transition: "all 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = ctaHoverBgColor;
                  e.currentTarget.style.color = ctaHoverTextColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = ctaBgColor;
                  e.currentTarget.style.color = ctaTextColor;
                }}
                className="inline-flex items-center justify-center whitespace-nowrap"
              >
                {ctaText}
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}