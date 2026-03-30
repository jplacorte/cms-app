import AccordionBlock from "@/components/Blocks/AccordionBlock";
import CardBlock from "@/components/Blocks/CardBlock";
import ContactFormBlock from "@/components/Blocks/ContactFormBlock";
import ContainerSection from "@/components/Blocks/ContainerSection";
import CustomButton from "@/components/Blocks/CustomButton";
import DividerBlock from "@/components/Blocks/DividerBlock";
import FooterBlock from "@/components/Blocks/FooterBlock";
import GridContainer from "@/components/Blocks/GridContainer";
import HeroBlock from "@/components/Blocks/HeroBlock";
import ImageBlock from "@/components/Blocks/ImageBlock";
import NavbarBlock from "@/components/Blocks/NavbarBlock";
import SidebarNavBlock from "@/components/Blocks/SidebarNavBlock";
import PricingTableBlock from "@/components/Blocks/PricingTableBlock";
import SocialLinksBlock from "@/components/Blocks/SocialLinksBlock";
import SpacerBlock from "@/components/Blocks/SpacerBlock";
import StatCardsBlock from "@/components/Blocks/StatCardsBlock";
import TestimonialBlock from "@/components/Blocks/TestimonialBlock";
import TextBlock from "@/components/Blocks/TextBlock";
import VideoBlock from "@/components/Blocks/VideoBlock";

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
  SidebarNavBlock: SidebarNavBlock,
  FooterBlock: FooterBlock,

  // Forms & Social
  ContactFormBlock: ContactFormBlock,
  SocialLinksBlock: SocialLinksBlock,
};
