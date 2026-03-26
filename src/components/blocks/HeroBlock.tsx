export interface HeroBlockProps {
  heading: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
  // --- New Customization Props ---
  buttonBgColor?: string;
  buttonTextColor?: string;
  buttonRadius?: string;
}

export default function HeroBlock({
  heading,
  subheading,
  ctaText,
  ctaLink,
  buttonBgColor = "#2563eb", // Default blue-600
  buttonTextColor = "#ffffff",
  buttonRadius = "9999px", // Default rounded-full
}: HeroBlockProps) {
  return (
    <section className="bg-slate-900 text-white py-24 px-6 text-center rounded-3xl mx-4 my-8 shadow-xl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl mb-6">
          {heading}
        </h1>
        {subheading && (
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {subheading}
          </p>
        )}
        {ctaText && ctaLink && (
          <a
            href={ctaLink}
            // We use inline styles here so the database can inject ANY hex color the user picks
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
