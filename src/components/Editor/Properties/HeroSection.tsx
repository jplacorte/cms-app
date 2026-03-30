import { ColorInput } from "@/lib/ui/ColorInput";
import { NumberInput } from "@/lib/ui/NumberInput";
import { RichTextInput } from "@/lib/ui/RichTextInput";
import { Row } from "@/lib/ui/Row";
import { SectionHeading } from "@/lib/ui/SectionHeading";
import { SelectInput } from "@/lib/ui/SelectInput";
import { TextInput } from "@/lib/ui/TextInput";
import { CheckboxInput } from "@/lib/ui/CheckboxInput";
import { ImageUploadInput } from "@/lib/ui/ImageUploadInput";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  handleChange: (key: string, value: unknown) => void;
  weightOptions: { value: string; label: string }[];
  transformOptions: { value: string; label: string }[];
  textAlignOptions: { value: string; label: string }[];
}

export default function HeroSection({
  data,
  handleChange,
  weightOptions,
  transformOptions,
  textAlignOptions,
}: Props) {
  return (
    <>
      <div className="space-y-4">
        <SectionHeading>Layout</SectionHeading>
        <SelectInput
          label="Layout Style"
          value={data.layout || "split"}
          onChange={(v) => handleChange("layout", v)}
          options={[
            { value: "split", label: "Split (Text + Image)" },
            { value: "center", label: "Centered Text" },
          ]}
        />
      </div>

      <div className="space-y-4">
        <SectionHeading>Hero Text Inputs (With Style Tool)</SectionHeading>
        <TextInput
          label="Badge Text"
          value={data.badgeText || ""}
          onChange={(v) => handleChange("badgeText", v)}
          placeholder="e.g. ✨ New Features"
        />
        <TextInput
          label="Badge Link URL"
          value={data.badgeLink || ""}
          onChange={(v) => handleChange("badgeLink", v)}
        />

        <RichTextInput
          label="Main Heading"
          value={data.heading || ""}
          onChange={(v) => handleChange("heading", v)}
          multiline={true}
        />
        <RichTextInput
          label="Subheading"
          value={data.subheading || ""}
          onChange={(v) => handleChange("subheading", v)}
          multiline={true}
        />
        <RichTextInput
          label="Bottom Text"
          value={data.bottomText || ""}
          onChange={(v) => handleChange("bottomText", v)}
          multiline={true}
        />
      </div>

      <div className="space-y-4">
        <SectionHeading>Typography Defaults: Main Heading</SectionHeading>
        <Row>
          <NumberInput
            label="Size (px)"
            value={data.headingFontSize ?? 72}
            onChange={(v) => handleChange("headingFontSize", v)}
            min={12}
            max={120}
          />
          <SelectInput
            label="Weight"
            value={data.headingFontWeight || "800"}
            onChange={(v) => handleChange("headingFontWeight", v)}
            options={weightOptions}
          />
        </Row>
        <Row>
          <ColorInput
            label="Color"
            value={data.headingColor || "#ffffff"}
            onChange={(v) => handleChange("headingColor", v)}
          />
          <SelectInput
            label="Format"
            value={data.headingTransform || "none"}
            onChange={(v) => handleChange("headingTransform", v)}
            options={transformOptions}
          />
        </Row>

        <SectionHeading>Typography Defaults: Subheading</SectionHeading>
        <Row>
          <NumberInput
            label="Size (px)"
            value={data.subheadingFontSize ?? 20}
            onChange={(v) => handleChange("subheadingFontSize", v)}
            min={12}
            max={64}
          />
          <SelectInput
            label="Weight"
            value={data.subheadingFontWeight || "500"}
            onChange={(v) => handleChange("subheadingFontWeight", v)}
            options={weightOptions}
          />
        </Row>
        <Row>
          <ColorInput
            label="Color"
            value={data.subheadingColor || "#a1a1aa"}
            onChange={(v) => handleChange("subheadingColor", v)}
          />
          <SelectInput
            label="Format"
            value={data.subheadingTransform || "none"}
            onChange={(v) => handleChange("subheadingTransform", v)}
            options={transformOptions}
          />
        </Row>

        <SectionHeading>Typography Defaults: Bottom Text</SectionHeading>
        <Row>
          <NumberInput
            label="Size (px)"
            value={data.bottomTextFontSize ?? 14}
            onChange={(v) => handleChange("bottomTextFontSize", v)}
            min={10}
            max={32}
          />
          <SelectInput
            label="Weight"
            value={data.bottomTextFontWeight || "400"}
            onChange={(v) => handleChange("bottomTextFontWeight", v)}
            options={weightOptions}
          />
        </Row>
        <SelectInput
          label="Format"
          value={data.bottomTextTransform || "uppercase"}
          onChange={(v) => handleChange("bottomTextTransform", v)}
          options={transformOptions}
        />
      </div>

      {data.layout === "split" && (
        <div className="space-y-4">
          <SectionHeading>Right Image / Graphic</SectionHeading>
          <ImageUploadInput
            label="Upload Graphic"
            value={data.imageUrl || ""}
            onChange={(v) => handleChange("imageUrl", v)}
          />
        </div>
      )}

      <div className="space-y-4">
        <SectionHeading>Colors & Alignment</SectionHeading>
        <Row>
          <ColorInput
            label="Background"
            value={data.bgColor || "#000000"}
            onChange={(v) => handleChange("bgColor", v)}
          />
          <SelectInput
            label="Text Align"
            value={data.textAlign || "left"}
            onChange={(v) => handleChange("textAlign", v)}
            options={textAlignOptions}
          />
        </Row>
        <CheckboxInput
          label="Ambient Glow Effect"
          checked={data.showAmbientGlow !== false}
          onChange={(v) => handleChange("showAmbientGlow", v)}
        />
      </div>

      <div className="space-y-4">
        <SectionHeading>Primary CTA Button</SectionHeading>
        <TextInput
          label="Button Text"
          value={data.ctaText || ""}
          onChange={(v) => handleChange("ctaText", v)}
        />
        <TextInput
          label="Button Link"
          value={data.ctaLink || ""}
          onChange={(v) => handleChange("ctaLink", v)}
        />
        <Row>
          <NumberInput
            label="Font Size (px)"
            value={data.ctaFontSize ?? 15}
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
            value={data.ctaBgColor || "#ffffff"}
            onChange={(v) => handleChange("ctaBgColor", v)}
          />
          <ColorInput
            label="Text Color"
            value={data.ctaTextColor || "#000000"}
            onChange={(v) => handleChange("ctaTextColor", v)}
          />
        </Row>
        <Row>
          <ColorInput
            label="Hover BG"
            value={data.ctaHoverBgColor || "#e2e8f0"}
            onChange={(v) => handleChange("ctaHoverBgColor", v)}
          />
          <ColorInput
            label="Hover Text"
            value={data.ctaHoverTextColor || "#000000"}
            onChange={(v) => handleChange("ctaHoverTextColor", v)}
          />
        </Row>
        <Row>
          <NumberInput
            label="Padding X"
            value={data.ctaPaddingX ?? 24}
            onChange={(v) => handleChange("ctaPaddingX", v)}
          />
          <NumberInput
            label="Padding Y"
            value={data.ctaPaddingY ?? 14}
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

      <div className="space-y-4">
        <SectionHeading>Secondary CTA Button</SectionHeading>
        <TextInput
          label="Button Text"
          value={data.cta2Text || ""}
          onChange={(v) => handleChange("cta2Text", v)}
        />
        <TextInput
          label="Button Link"
          value={data.cta2Link || ""}
          onChange={(v) => handleChange("cta2Link", v)}
        />
        <Row>
          <NumberInput
            label="Font Size (px)"
            value={data.cta2FontSize ?? 15}
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
            value={data.cta2TextColor || "#ffffff"}
            onChange={(v) => handleChange("cta2TextColor", v)}
          />
        </Row>
        <Row>
          <ColorInput
            label="Hover BG"
            value={data.cta2HoverBgColor || "rgba(255,255,255,0.1)"}
            onChange={(v) => handleChange("cta2HoverBgColor", v)}
          />
          <ColorInput
            label="Hover Text"
            value={data.cta2HoverTextColor || "#ffffff"}
            onChange={(v) => handleChange("cta2HoverTextColor", v)}
          />
        </Row>
        <Row>
          <NumberInput
            label="Padding X"
            value={data.cta2PaddingX ?? 24}
            onChange={(v) => handleChange("cta2PaddingX", v)}
          />
          <NumberInput
            label="Padding Y"
            value={data.cta2PaddingY ?? 14}
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
          value={data.cta2BorderColor || "#334155"}
          onChange={(v) => handleChange("cta2BorderColor", v)}
        />
      </div>
    </>
  );
}
