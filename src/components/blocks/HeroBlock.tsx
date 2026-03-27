export interface HeroBlockProps {
  heading: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
  bgColor?: string;
  headingColor?: string;
  subheadingColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  buttonRadius?: string;
  textAlign?: string;
}

export default function HeroBlock({
  heading,
  subheading,
  ctaText,
  ctaLink,
  bgColor = "#0f172a",
  headingColor = "#ffffff",
  subheadingColor = "#94a3b8",
  buttonBgColor = "#2563eb",
  buttonTextColor = "#ffffff",
  buttonRadius = "9999px",
  textAlign = "center",
}: HeroBlockProps) {
  return (
    <section
      style={{
        backgroundColor: bgColor,
        textAlign: textAlign as React.CSSProperties["textAlign"],
      }}
      className="py-24 px-6 rounded-3xl mx-4 my-8 shadow-xl"
    >
      <div className="max-w-4xl mx-auto">
        <h1
          style={{ color: headingColor }}
          className="text-5xl font-extrabold tracking-tight sm:text-6xl mb-6"
        >
          {heading}
        </h1>
        {subheading && (
          <p
            style={{ color: subheadingColor }}
            className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {subheading}
          </p>
        )}
        {ctaText && ctaLink && (
          <a
            href={ctaLink}
            style={{
              backgroundColor: buttonBgColor,
              color: buttonTextColor,
              borderRadius: buttonRadius,
            }}
            className="inline-flex items-center justify-center font-semibold py-4 px-10 transition-all duration-200 shadow-lg hover:opacity-90"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
