export interface HeroBlockProps {
  heading: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function HeroBlock({
  heading,
  subheading,
  ctaText,
  ctaLink,
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
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-10 rounded-full transition-all duration-200 shadow-lg hover:shadow-blue-500/30"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
