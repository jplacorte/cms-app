import { PricingTier } from "@/lib/types";
import { ColorInput, SectionHeading } from "@/lib/ui";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  handleChange: (key: string, value: unknown) => void;
}

export default function PricingTableBlock({ data, handleChange }: Props) {
  const tiers = (data.tiers as PricingTier[]) || [];

  const updateTier = (index: number, field: keyof PricingTier, value: any) => {
    const newTiers = [...tiers];
    newTiers[index] = { ...newTiers[index], [field]: value };
    handleChange("tiers", newTiers);
  };

  const removeTier = (index: number) => {
    const newTiers = [...tiers];
    newTiers.splice(index, 1);
    handleChange("tiers", newTiers);
  };

  const addTier = () => {
    const newTier: PricingTier = {
      name: "New Tier",
      price: "$0",
      period: "/month",
      features: ["Feature 1"],
      ctaText: "Get Started",
      ctaLink: "#",
      highlighted: false,
    };
    handleChange("tiers", [...tiers, newTier]);
  };

  return (
    <div className="space-y-4">
      <SectionHeading>Pricing Table</SectionHeading>
      <ColorInput
        label="Accent Color"
        value={data.accentColor || "#2563eb"}
        onChange={(v) => handleChange("accentColor", v)}
      />
      {tiers.map((tier, index) => (
        <div
          key={index}
          className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500">
              Tier {index + 1}
            </span>
            <button
              onClick={() => removeTier(index)}
              className="text-xs text-red-400 hover:text-red-600"
            >
              Remove
            </button>
          </div>
          <input
            type="text"
            value={tier.name}
            onChange={(e) => updateTier(index, "name", e.target.value)}
            className="w-full text-sm text-black border border-slate-200 rounded p-2"
            placeholder="Tier name"
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={tier.price}
              onChange={(e) => updateTier(index, "price", e.target.value)}
              className="flex-1 text-sm text-black border border-slate-200 rounded p-2"
              placeholder="$29"
            />
            <input
              type="text"
              value={tier.period}
              onChange={(e) => updateTier(index, "period", e.target.value)}
              className="flex-1 text-sm text-black border border-slate-200 rounded p-2"
              placeholder="/month"
            />
          </div>
          <textarea
            value={(tier.features || []).join("\n")}
            onChange={(e) =>
              updateTier(index, "features", e.target.value.split("\n"))
            }
            className="w-full text-sm text-black border border-slate-200 rounded p-2"
            rows={3}
            placeholder="One feature per line"
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={tier.ctaText || ""}
              onChange={(e) => updateTier(index, "ctaText", e.target.value)}
              className="flex-1 text-sm text-black border border-slate-200 rounded p-2"
              placeholder="CTA Text"
            />
            <label className="flex items-center gap-1 text-xs text-slate-500">
              <input
                type="checkbox"
                checked={tier.highlighted || false}
                onChange={(e) =>
                  updateTier(index, "highlighted", e.target.checked)
                }
              />
              Featured
            </label>
          </div>
        </div>
      ))}
      <button
        onClick={addTier}
        className="w-full py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
      >
        + Add Tier
      </button>
    </div>
  );
}
