import { PricingTableBlockProps, PricingTier } from "@/lib/types";

const defaultTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$9",
    period: "/month",
    features: ["1 Project", "Basic Support", "5GB Storage"],
    ctaText: "Get Started",
    ctaLink: "#",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$29",
    period: "/month",
    features: ["10 Projects", "Priority Support", "50GB Storage", "Custom Domain"],
    ctaText: "Get Started",
    ctaLink: "#",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    features: ["Unlimited Projects", "Dedicated Support", "Unlimited Storage", "Custom Domain", "SLA"],
    ctaText: "Contact Sales",
    ctaLink: "#",
    highlighted: false,
  },
];

export default function PricingTableBlock({
  tiers = defaultTiers,
  accentColor = "#2563eb",
}: PricingTableBlockProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${tiers.length > 3 ? 3 : tiers.length}, minmax(0, 1fr))`,
        gap: "24px",
        width: "100%",
        padding: "16px 0",
      }}
    >
      {tiers.map((tier: PricingTier, index: number) => (
        <div
          key={index}
          style={{
            backgroundColor: tier.highlighted ? accentColor : "#ffffff",
            color: tier.highlighted ? "#ffffff" : "#1e293b",
            borderRadius: "16px",
            border: tier.highlighted ? "none" : "1px solid #e2e8f0",
            padding: "32px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: tier.highlighted ? "0 20px 40px rgba(0,0,0,0.15)" : "0 1px 3px rgba(0,0,0,0.06)",
            transform: tier.highlighted ? "scale(1.05)" : "none",
            position: "relative",
            zIndex: tier.highlighted ? 1 : 0,
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px", opacity: 0.8 }}>
            {tier.name}
          </div>
          <div style={{ fontSize: "48px", fontWeight: "800", lineHeight: 1 }}>
            {tier.price}
          </div>
          <div style={{ fontSize: "14px", opacity: 0.6, marginBottom: "24px" }}>
            {tier.period}
          </div>
          <div style={{ width: "100%", borderTop: `1px solid ${tier.highlighted ? "rgba(255,255,255,0.2)" : "#e2e8f0"}`, paddingTop: "20px", marginBottom: "24px" }}>
            {tier.features.map((feature: string, fi: number) => (
              <div
                key={fi}
                style={{
                  padding: "8px 0",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ color: tier.highlighted ? "#ffffff" : accentColor, fontWeight: "bold" }}>✓</span>
                {feature}
              </div>
            ))}
          </div>
          <a
            href={tier.ctaLink || "#"}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              textAlign: "center",
              fontWeight: "600",
              fontSize: "14px",
              textDecoration: "none",
              display: "block",
              backgroundColor: tier.highlighted ? "#ffffff" : accentColor,
              color: tier.highlighted ? accentColor : "#ffffff",
              transition: "opacity 0.2s ease",
            }}
          >
            {tier.ctaText || "Get Started"}
          </a>
        </div>
      ))}
    </div>
  );
}
