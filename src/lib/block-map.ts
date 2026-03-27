import AccordionBlock from "@/components/blocks/AccordionBlock";
import CardBlock from "@/components/blocks/CardBlock";
import ContactFormBlock from "@/components/blocks/ContactFormBlock";
import ContainerSection from "@/components/blocks/ContainerSection";
import CustomButton from "@/components/blocks/CustomButton";
import DividerBlock from "@/components/blocks/DividerBlock";
import FooterBlock from "@/components/blocks/FooterBlock";
import GridContainer from "@/components/blocks/GridContainer";
import HeroBlock from "@/components/blocks/HeroBlock";
import ImageBlock from "@/components/blocks/ImageBlock";
import NavbarBlock from "@/components/blocks/NavbarBlock";
import PricingTableBlock from "@/components/blocks/PricingTableBlock";
import SocialLinksBlock from "@/components/blocks/SocialLinksBlock";
import SpacerBlock from "@/components/blocks/SpacerBlock";
import StatCardsBlock from "@/components/blocks/StatCardsBlock";
import TestimonialBlock from "@/components/blocks/TestimonialBlock";
import TextBlock from "@/components/blocks/TextBlock";
import VideoBlock from "@/components/blocks/VideoBlock";

export const BlockRegistry: Record<string, React.ElementType> = {
  // Layout
  ContainerSection: ContainerSection,
  GridContainer: GridContainer,
  SpacerBlock: SpacerBlock,
  DividerBlock: DividerBlock,

  // Content
  HeroSection: HeroBlock,
  TextBlock: TextBlock,
  ImageBlock: ImageBlock,
  VideoBlock: VideoBlock,
  CardBlock: CardBlock,
  CustomButton: CustomButton,

  // Data
  MetricsGrid: StatCardsBlock,
  AccordionBlock: AccordionBlock,
  TestimonialBlock: TestimonialBlock,
  PricingTableBlock: PricingTableBlock,

  // Navigation
  NavbarBlock: NavbarBlock,
  FooterBlock: FooterBlock,

  // Forms & Social
  ContactFormBlock: ContactFormBlock,
  SocialLinksBlock: SocialLinksBlock,
};
