"use client";

import DOMPurify from "isomorphic-dompurify";

export default function HeroBlock({
  layout = "split",
  badgeText = "✨ Next.js 14 is here",
  badgeLink = "#",

  // Hero Typography
  heading = "The React Framework for the Web",
  headingFontSize = 72,
  headingFontWeight = "800",
  headingTransform = "none",

  subheading = "Used by some of the world's largest companies, this framework enables you to create full-stack Web applications by extending the latest features.",
  subheadingFontSize = 20,
  subheadingFontWeight = "500",
  subheadingTransform = "none",

  bottomText = "~ Open Source",
  bottomTextFontSize = 14,
  bottomTextFontWeight = "400",
  bottomTextTransform = "uppercase",

  // Colors
  bgColor = "#000000",
  headingColor = "#ffffff",
  subheadingColor = "#a1a1aa", // slate-400
  textAlign = "left",
  showAmbientGlow = true,

  // Primary CTA Button
  ctaText = "Deploy Now",
  ctaLink = "#",
  ctaBgColor = "#ffffff",
  ctaTextColor = "#000000",
  ctaBorderWidth = 0,
  ctaBorderColor = "transparent",
  ctaBorderRadius = "8px",
  ctaHoverBgColor = "#e2e8f0",
  ctaHoverTextColor = "#000000",
  ctaPaddingX = 24,
  ctaPaddingY = 14,
  ctaFontSize = 15,
  ctaFontWeight = "600",

  // Secondary CTA Button
  cta2Text = "Read Docs",
  cta2Link = "#",
  cta2BgColor = "transparent",
  cta2TextColor = "#ffffff",
  cta2BorderWidth = 1,
  cta2BorderColor = "#334155", // slate-700
  cta2BorderRadius = "8px",
  cta2HoverBgColor = "rgba(255,255,255,0.1)",
  cta2HoverTextColor = "#ffffff",
  cta2PaddingX = 24,
  cta2PaddingY = 14,
  cta2FontSize = 15,
  cta2FontWeight = "600",

  buttonRadius = "8px",

  imageUrl = "",

  customClassName = "",
}: any) {
  const isDark =
    bgColor.toLowerCase() === "#000000" ||
    bgColor.startsWith("#0") ||
    bgColor.startsWith("#1");

  const getAlignClass = () => {
    if (textAlign === "center") return "items-center text-center mx-auto";
    if (textAlign === "right") return "items-end text-right ml-auto";
    if (textAlign === "justify") return "items-start text-justify";
    return "items-start text-left";
  };

  return (
    <section
      className={`relative w-full overflow-hidden ${customClassName}`}
      style={{ backgroundColor: bgColor }}
    >
      {showAmbientGlow && (
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-200 h-150 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      )}

      <div
        className={`max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10 flex ${layout === "split" ? "flex-col lg:flex-row items-center gap-16" : "flex-col items-center text-center"}`}
      >
        <div
          className={`flex flex-col ${getAlignClass()} ${layout === "split" ? "lg:w-1/2" : "w-full max-w-4xl"}`}
        >
          {badgeText && (
            <a
              href={badgeLink}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium mb-8 transition-all hover:scale-105"
              style={{
                borderColor: isDark
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(0,0,0,0.1)",
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(0,0,0,0.03)",
                color: isDark ? "#e2e8f0" : "#475569",
              }}
            >
              {badgeText}
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          )}

          {/* SECURED: Main Heading */}
          <h1
            style={{
              color: headingColor,
              fontSize: `clamp(36px, 6vw, ${headingFontSize}px)`,
              fontWeight: Number(headingFontWeight) || 800,
              textTransform: headingTransform,
            }}
            className="tracking-tight mb-6 leading-[1.1] whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(heading) }}
          />

          {/* SECURED: Subheading */}
          <p
            style={{
              color: subheadingColor,
              fontSize: `clamp(11px, 3vw, ${subheadingFontSize}px)`,
              fontWeight: Number(subheadingFontWeight) || 500,
              textTransform: subheadingTransform,
            }}
            className="mb-10 max-w-2xl leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(subheading) }}
          />

          <div
            className={`flex flex-wrap gap-4 ${textAlign === "center" ? "justify-center" : ""}`}
          >
            {ctaText && (
              <a
                href={ctaLink}
                style={{
                  backgroundColor: ctaBgColor,
                  color: ctaTextColor,
                  borderRadius: ctaBorderRadius,
                  border: `${ctaBorderWidth}px solid ${ctaBorderColor}`,
                  padding: `${ctaPaddingY}px ${ctaPaddingX}px`,
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

            {cta2Text && (
              <a
                href={cta2Link}
                style={{
                  backgroundColor: cta2BgColor,
                  color: cta2TextColor,
                  borderRadius: cta2BorderRadius,
                  border: `${cta2BorderWidth}px solid ${cta2BorderColor}`,
                  padding: `${cta2PaddingY}px ${cta2PaddingX}px`,
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
          </div>

          {/* SECURED: Bottom Text Label */}
          {bottomText && (
            <div
              className="mt-14 font-mono tracking-widest whitespace-pre-wrap"
              style={{
                color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
                fontSize: `${bottomTextFontSize}px`,
                fontWeight: Number(bottomTextFontWeight) || 400,
                textTransform: bottomTextTransform,
              }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(bottomText),
              }}
            />
          )}
        </div>

        {layout === "split" && (
          <div className="lg:w-1/2 w-full relative">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Hero graphic"
                className="w-full h-auto object-cover rounded-2xl shadow-2xl"
                style={{
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                }}
              />
            ) : (
              <div
                className="w-full aspect-4/3 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden backdrop-blur-md"
                style={{
                  background: isDark
                    ? "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)"
                    : "linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.01) 100%)",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                }}
              >
                {showAmbientGlow && (
                  <div className="absolute inset-0 bg-linear-to-tr from-blue-500/20 to-purple-500/20 blur-3xl opacity-50" />
                )}
                <div className="text-sm font-mono p-4 rounded bg-black/40 text-white/70 border border-white/10 z-10 shadow-xl text-center">
                  Upload Image in Properties Panel
                  <br />
                  <span className="text-blue-400">const</span> hero ={" "}
                  <span className="text-green-400">&quot;Awesome&quot;</span>;
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
