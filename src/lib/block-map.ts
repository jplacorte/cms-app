import ContainerSection from "@/components/blocks/ContainerSection";
import CustomButton from "@/components/blocks/CustomButton";
import HeroBlock from "../components/blocks/HeroBlock";
import StatCardsBlock from "../components/blocks/StatCardsBlock";
// ... your other imports

export const BlockRegistry: Record<string, React.ElementType> = {
  HeroSection: HeroBlock,
  MetricsGrid: StatCardsBlock,
  CustomButton: CustomButton,
  ContainerSection: ContainerSection,
};
