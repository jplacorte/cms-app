// Shared types for block component props and nested data structures

import { EditorBlock } from "@/store/useEditorStore";

// --- Nested Data Types ---

export interface NavLink {
  label: string;
  href: string;
}

export interface AccordionItem {
  question: string;
  answer: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  highlighted: boolean;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export interface FormField {
  label: string;
  type: string;
  placeholder: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface StatCardData {
  id: string;
  layoutType: "standard" | "highlight";
  title: string;
  value: string;
  subtext: string;
  badge?: { text: string; variant: "default" | "alert" };
  progressPercentage?: number;
}

// --- Block Props ---

export interface SpacerBlockProps {
  height?: number;
}

export interface DividerBlockProps {
  color?: string;
  thickness?: number;
  style?: string;
  width?: number;
  paddingY?: number;
}

export interface VideoBlockProps {
  url?: string;
  aspectRatio?: string;
  borderRadius?: string;
}

export interface AccordionBlockProps {
  items?: AccordionItem[];
  bgColor?: string;
  borderRadius?: string;
  textColor?: string;
  answerColor?: string;
  borderColor?: string;
}

export interface TestimonialBlockProps {
  quote?: string;
  name?: string;
  title?: string;
  avatarUrl?: string;
  bgColor?: string;
  borderRadius?: string;
  quoteColor?: string;
  nameColor?: string;
  titleColor?: string;
}

export interface PricingTableBlockProps {
  tiers?: PricingTier[];
  accentColor?: string;
}

export interface NavbarBlockProps {
  logoText?: string;
  logoUrl?: string;
  links?: NavLink[];
  bgColor?: string;
  textColor?: string;
  linkColor?: string;
  borderColor?: string;
  ctaText?: string;
  ctaLink?: string;
  ctaBgColor?: string;
  ctaTextColor?: string;
}

export interface FooterBlockProps {
  columns?: FooterColumn[];
  bgColor?: string;
  headingColor?: string;
  linkColor?: string;
  borderColor?: string;
  copyrightText?: string;
  copyrightColor?: string;
}

export interface ContactFormBlockProps {
  heading?: string;
  subheading?: string;
  headingColor?: string;
  subheadingColor?: string;
  fields?: FormField[];
  submitText?: string;
  accentColor?: string;
  bgColor?: string;
  borderRadius?: string;
  borderColor?: string;
}

export interface CardBlockProps {
  imageUrl?: string;
  imageHeight?: string;
  title?: string;
  description?: string;
  linkText?: string;
  linkUrl?: string;
  bgColor?: string;
  borderColor?: string;
  borderRadius?: string;
  shadow?: boolean;
  titleColor?: string;
  descriptionColor?: string;
  linkColor?: string;
}

export interface SocialLinksBlockProps {
  links?: SocialLink[];
  iconSize?: number;
  iconColor?: string;
  alignment?: string;
  gap?: number;
  bgColor?: string;
  showBorder?: boolean;
}

export interface TextBlockProps {
  content?: string;
  tag?: string;
  textColor?: string;
  fontSize?: number;
  fontWeight?: string;
  textAlign?: string;
  lineHeight?: string;
  letterSpacing?: number;
}

export interface ImageBlockProps {
  src?: string;
  alt?: string;
  width?: number;
  borderRadius?: string;
  objectFit?: string;
  boxShadow?: boolean;
  align?: string;
}

export interface CustomButtonProps {
  text?: string;
  href?: string;
  bgColor?: string;
  textColor?: string;
  borderRadius?: string;
  paddingX?: number;
  paddingY?: number;
  fontSize?: number;
  fontWeight?: string;
  borderWidth?: number;
  borderColor?: string;
}

export interface ContainerSectionProps {
  id: string;
  bgColor?: string;
  paddingY?: number;
  paddingX?: number;
  minHeight?: string;
  direction?: string;
  gap?: number;
  borderRadius?: string;
  alignItems?: string;
  justifyContent?: string;
  borderWidth?: number;
  borderColor?: string;
  shadow?: boolean;
  children?: EditorBlock[];
}

export interface GridContainerProps {
  columns?: number;
  gap?: number;
  paddingY?: number;
  paddingX?: number;
  bgColor?: string;
  borderRadius?: string;
  alignItems?: string;
  borderWidth?: number;
  borderColor?: string;
  shadow?: boolean;
  children?: EditorBlock[];
}
