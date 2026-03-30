import { NavLink } from "@/lib/types";
import {
  ColorInput,
  ImageUploadInput,
  NumberInput,
  Row,
  SectionHeading,
  SelectInput,
  TextInput,
} from "@/lib/ui";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  weightOptions: { value: string; label: string }[];
  handleChange: (key: string, value: unknown) => void;
}

export default function NavbarBlock({
  data,
  weightOptions,
  handleChange,
}: Props) {
  return (
    <div className="space-y-4">
      <SectionHeading>Navbar Content</SectionHeading>
      <TextInput
        label="Logo Text"
        value={data.logoText || ""}
        onChange={(v) => handleChange("logoText", v)}
      />
      <ImageUploadInput
        label="Logo Image URL"
        value={data.logoUrl || ""}
        onChange={(v) => handleChange("logoUrl", v)}
        placeholder="https://..."
      />
      <NumberInput
        label="Logo Height (px)"
        value={data.logoHeight || 32}
        onChange={(v) => handleChange("logoHeight", v)}
        min={16}
        max={120}
      />
      <Row>
        <ColorInput
          label="Background"
          value={data.bgColor || "#ffffff"}
          onChange={(v) => handleChange("bgColor", v)}
        />
        <ColorInput
          label="Text"
          value={data.textColor || "#0f172a"}
          onChange={(v) => handleChange("textColor", v)}
        />
      </Row>

      <SectionHeading>Navigation Links</SectionHeading>
      <Row>
        <NumberInput
          label="Font Size (px)"
          value={data.linkFontSize || 14}
          onChange={(v) => handleChange("linkFontSize", v)}
          min={10}
          max={32}
        />
        <SelectInput
          label="Font Weight"
          value={data.linkFontWeight || "500"}
          onChange={(v) => handleChange("linkFontWeight", v)}
          options={weightOptions}
        />
      </Row>
      <Row>
        <ColorInput
          label="Link Color"
          value={data.linkColor || "#475569"}
          onChange={(v) => handleChange("linkColor", v)}
        />
        <ColorInput
          label="Hover Color"
          value={data.linkColorHover || "#2563eb"}
          onChange={(v) => handleChange("linkColorHover", v)}
        />
      </Row>
      <Row>
        <ColorInput
          label="Dropdown BG"
          value={data.dropdownBgColor || "#ffffff"}
          onChange={(v) => handleChange("dropdownBgColor", v)}
        />
      </Row>

      <div className="pt-2">
        {((data.links as NavLink[]) || []).map(
          (link: NavLink, index: number) => (
            <div
              key={index}
              className="space-y-2 border border-slate-200 p-3 rounded-lg bg-slate-50 mb-3"
            >
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => {
                    const l = [...((data.links as NavLink[]) || [])];
                    l[index] = { ...l[index], label: e.target.value };
                    handleChange("links", l);
                  }}
                  className="flex-[0.8] min-w-0 text-sm text-black border border-slate-300 rounded p-2"
                  placeholder="Label"
                />
                <input
                  type="text"
                  value={link.href}
                  onChange={(e) => {
                    const l = [...((data.links as NavLink[]) || [])];
                    l[index] = { ...l[index], href: e.target.value };
                    handleChange("links", l);
                  }}
                  className="flex-1 min-w-0 text-sm text-black border border-slate-300 rounded p-2"
                  placeholder="/path"
                />
                <button
                  onClick={() => {
                    const l = [...((data.links as NavLink[]) || [])];
                    l.splice(index, 1);
                    handleChange("links", l);
                  }}
                  className="text-red-400 hover:text-red-600 text-sm"
                >
                  ×
                </button>
              </div>

              <div className="pl-4 space-y-2 border-l-2 border-slate-200">
                <div className="text-xs font-medium text-slate-500">
                  Dropdown Links
                </div>
                {(link.sublinks || []).map((sublink, subIndex) => (
                  <div key={subIndex} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={sublink.label}
                      onChange={(e) => {
                        const l = [...((data.links as NavLink[]) || [])];
                        l[index] = { ...l[index] };
                        l[index].sublinks = [...(l[index].sublinks || [])];
                        l[index].sublinks[subIndex] = {
                          ...l[index].sublinks[subIndex],
                          label: e.target.value,
                        };
                        handleChange("links", l);
                      }}
                      className="flex-[0.8] min-w-0 text-xs text-black border border-slate-200 rounded p-1.5"
                      placeholder="Sub-label"
                    />
                    <input
                      type="text"
                      value={sublink.href}
                      onChange={(e) => {
                        const l = [...((data.links as NavLink[]) || [])];
                        l[index] = { ...l[index] };
                        l[index].sublinks = [...(l[index].sublinks || [])];
                        l[index].sublinks[subIndex] = {
                          ...l[index].sublinks[subIndex],
                          href: e.target.value,
                        };
                        handleChange("links", l);
                      }}
                      className="flex-1 min-w-0 text-xs text-black border border-slate-200 rounded p-1.5"
                      placeholder="/sub-path"
                    />
                    <button
                      onClick={() => {
                        const l = [...((data.links as NavLink[]) || [])];
                        l[index] = { ...l[index] };
                        l[index].sublinks = [...(l[index].sublinks || [])];
                        l[index].sublinks.splice(subIndex, 1);
                        handleChange("links", l);
                      }}
                      className="text-red-400 hover:text-red-600 text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const l = [...((data.links as NavLink[]) || [])];
                    l[index] = { ...l[index] };
                    l[index].sublinks = [
                      ...(l[index].sublinks || []),
                      { label: "New Sublink", href: "#" },
                    ];
                    handleChange("links", l);
                  }}
                  className="text-xs text-blue-600 font-medium"
                >
                  + Add Dropdown Link
                </button>
              </div>
            </div>
          ),
        )}
        <button
          onClick={() => {
            handleChange("links", [
              ...((data.links as NavLink[]) || []),
              { label: "New Link", href: "#" },
            ]);
          }}
          className="w-full py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
        >
          + Add Root Link
        </button>
      </div>

      <SectionHeading>Navbar Container Layout</SectionHeading>
      <Row>
        <SelectInput
          label="Max Width"
          value={data.maxWidth || "1200px"}
          onChange={(v) => handleChange("maxWidth", v)}
          options={[
            { value: "100%", label: "Full Width (100%)" },
            { value: "1440px", label: "Extra Wide (1440px)" },
            { value: "1200px", label: "Standard (1200px)" },
            { value: "1024px", label: "Narrow (1024px)" },
          ]}
        />
      </Row>
      <Row>
        <NumberInput
          label="Padding X"
          value={data.paddingX ?? 32}
          onChange={(v) => handleChange("paddingX", v)}
        />
        <NumberInput
          label="Padding Y"
          value={data.paddingY ?? 0}
          onChange={(v) => handleChange("paddingY", v)}
        />
      </Row>
      <Row>
        <SelectInput
          label="Border Style"
          value={data.borderStyle || "solid"}
          onChange={(v) => handleChange("borderStyle", v)}
          options={[
            { value: "none", label: "None" },
            { value: "solid", label: "Solid" },
            { value: "dashed", label: "Dashed" },
          ]}
        />
        <NumberInput
          label="Border Width"
          value={(data.borderWidth as number) ?? 1}
          onChange={(v) => handleChange("borderWidth", v)}
        />
      </Row>
      <Row>
        <ColorInput
          label="Border Color"
          value={data.borderColor || "#e2e8f0"}
          onChange={(v) => handleChange("borderColor", v)}
        />
        <SelectInput
          label="Shadow"
          value={data.shadow ? "true" : "false"}
          onChange={(v) => handleChange("shadow", v === "true")}
          options={[
            { value: "false", label: "None" },
            { value: "true", label: "Soft Shadow" },
          ]}
        />
      </Row>

      <SectionHeading>Secondary CTA Button</SectionHeading>
      <TextInput
        label="Button Text"
        value={data.cta2Text || ""}
        onChange={(v) => handleChange("cta2Text", v)}
        placeholder="e.g. Login"
      />
      <TextInput
        label="Button Link"
        value={data.cta2Link || ""}
        onChange={(v) => handleChange("cta2Link", v)}
      />

      <Row>
        <NumberInput
          label="Font Size (px)"
          value={data.cta2FontSize ?? 14}
          onChange={(v) => handleChange("cta2FontSize", v)}
        />
        <SelectInput
          label="Font Weight"
          value={data.cta2FontWeight || "600"}
          onChange={(v) => handleChange("cta2FontWeight", v)}
          options={weightOptions}
        />
      </Row>

      <Row>
        <ColorInput
          label="Background"
          value={data.cta2BgColor || "transparent"}
          onChange={(v) => handleChange("cta2BgColor", v)}
        />
        <ColorInput
          label="Text Color"
          value={data.cta2TextColor || "#0f172a"}
          onChange={(v) => handleChange("cta2TextColor", v)}
        />
      </Row>
      <Row>
        <ColorInput
          label="Hover BG"
          value={data.cta2HoverBgColor || "#f8fafc"}
          onChange={(v) => handleChange("cta2HoverBgColor", v)}
        />
        <ColorInput
          label="Hover Text"
          value={data.cta2HoverTextColor || "#0f172a"}
          onChange={(v) => handleChange("cta2HoverTextColor", v)}
        />
      </Row>
      <Row>
        <NumberInput
          label="Padding X"
          value={data.cta2PaddingX ?? 20}
          onChange={(v) => handleChange("cta2PaddingX", v)}
        />
        <NumberInput
          label="Padding Y"
          value={data.cta2PaddingY ?? 8}
          onChange={(v) => handleChange("cta2PaddingY", v)}
        />
      </Row>
      <Row>
        <NumberInput
          label="Border Width"
          value={data.cta2BorderWidth ?? 1}
          onChange={(v) => handleChange("cta2BorderWidth", v)}
        />
        <TextInput
          label="Border Radius"
          value={data.cta2BorderRadius || "8px"}
          onChange={(v) => handleChange("cta2BorderRadius", v)}
        />
      </Row>
      <ColorInput
        label="Border Color"
        value={data.cta2BorderColor || "#e2e8f0"}
        onChange={(v) => handleChange("cta2BorderColor", v)}
      />

      <SectionHeading>Primary CTA Button</SectionHeading>
      <TextInput
        label="Button Text"
        value={data.ctaText || ""}
        onChange={(v) => handleChange("ctaText", v)}
        placeholder="e.g. Sign Up"
      />
      <TextInput
        label="Button Link"
        value={data.ctaLink || ""}
        onChange={(v) => handleChange("ctaLink", v)}
      />

      <Row>
        <NumberInput
          label="Font Size (px)"
          value={data.ctaFontSize ?? 14}
          onChange={(v) => handleChange("ctaFontSize", v)}
        />
        <SelectInput
          label="Font Weight"
          value={data.ctaFontWeight || "600"}
          onChange={(v) => handleChange("ctaFontWeight", v)}
          options={weightOptions}
        />
      </Row>

      <Row>
        <ColorInput
          label="Background"
          value={data.ctaBgColor || "#2563eb"}
          onChange={(v) => handleChange("ctaBgColor", v)}
        />
        <ColorInput
          label="Text Color"
          value={data.ctaTextColor || "#ffffff"}
          onChange={(v) => handleChange("ctaTextColor", v)}
        />
      </Row>
      <Row>
        <ColorInput
          label="Hover BG"
          value={data.ctaHoverBgColor || "#1d4ed8"}
          onChange={(v) => handleChange("ctaHoverBgColor", v)}
        />
        <ColorInput
          label="Hover Text"
          value={data.ctaHoverTextColor || "#ffffff"}
          onChange={(v) => handleChange("ctaHoverTextColor", v)}
        />
      </Row>
      <Row>
        <NumberInput
          label="Padding X"
          value={data.ctaPaddingX ?? 20}
          onChange={(v) => handleChange("ctaPaddingX", v)}
        />
        <NumberInput
          label="Padding Y"
          value={data.ctaPaddingY ?? 8}
          onChange={(v) => handleChange("ctaPaddingY", v)}
        />
      </Row>
      <Row>
        <NumberInput
          label="Border Width"
          value={data.ctaBorderWidth || 0}
          onChange={(v) => handleChange("ctaBorderWidth", v)}
        />
        <TextInput
          label="Border Radius"
          value={data.ctaBorderRadius || "8px"}
          onChange={(v) => handleChange("ctaBorderRadius", v)}
        />
      </Row>
      <ColorInput
        label="Border Color"
        value={data.ctaBorderColor || "transparent"}
        onChange={(v) => handleChange("ctaBorderColor", v)}
      />
    </div>
  );
}
