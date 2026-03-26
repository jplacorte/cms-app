import ContainerSection from "@/components/blocks/ContainerSection";
import CustomButton from "@/components/blocks/CustomButton";
import GridContainer from "@/components/blocks/GridContainer";
import HeroBlock from "@/components/blocks/HeroBlock";
import ImageBlock from "@/components/blocks/ImageBlock";
import StatCardsBlock from "@/components/blocks/StatCardsBlock";
import TextBlock from "@/components/blocks/TextBlock";

export const BlockRegistry: Record<string, React.ElementType> = {
  HeroSection: HeroBlock,
  MetricsGrid: StatCardsBlock,
  CustomButton: CustomButton,
  ContainerSection: ContainerSection,
  TextBlock: TextBlock,
  ImageBlock: ImageBlock,
  GridContainer: GridContainer,
};
