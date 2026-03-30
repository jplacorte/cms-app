"use client";

import { useEditorStore } from "@/store/useEditorStore";
import {
  AlignHorizontalJustifyCenter,
  BarChart3,
  ChevronDown,
  Columns,
  CreditCard,
  FileText,
  Image as ImageIcon,
  LayoutTemplate,
  Link,
  Mail,
  Menu,
  MessageSquareQuote,
  Minus,
  MoveVertical,
  PanelBottom,
  Play,
  Share2,
  Type,
  Sidebar as SidebarLeft,
} from "lucide-react";

type SidebarItem = {
  label: string;
  icon: React.ReactNode;
  type: string;
  defaultData: Record<string, unknown>;
  isTopLevel?: boolean; // If true, always adds to root, not inside active container
};

type SidebarCategory = {
  label: string;
  items: SidebarItem[];
};

const categories: SidebarCategory[] = [
  {
    label: "Layout",
    items: [
      {
        label: "Hero Section",
        icon: <LayoutTemplate size={18} className="text-blue-500" />,
        type: "HeroSection",
        isTopLevel: true,
        defaultData: {
          heading: "Build the Future.",
          subheading: "Modern architectures and scalable systems for the open web.",
          ctaText: "View Projects",
          ctaLink: "/projects",
        },
      },
      {
        label: "Section",
        icon: <AlignHorizontalJustifyCenter size={18} className="text-sky-500" />,
        type: "ContainerSection",
        isTopLevel: true,
        defaultData: { bgColor: "#ffffff", paddingY: 64, gap: 16 },
      },
      {
        label: "Grid Layout",
        icon: <Columns size={18} className="text-orange-500" />,
        type: "GridContainer",
        defaultData: { columns: 2, gap: 24 },
      },
      {
        label: "Spacer",
        icon: <MoveVertical size={18} className="text-slate-400" />,
        type: "SpacerBlock",
        defaultData: { height: 40 },
      },
      {
        label: "Divider",
        icon: <Minus size={18} className="text-slate-400" />,
        type: "DividerBlock",
        defaultData: { color: "#e2e8f0", thickness: 1, style: "solid", width: 100 },
      },
    ],
  },
  {
    label: "Content",
    items: [
      {
        label: "Typography",
        icon: <Type size={18} className="text-slate-600" />,
        type: "TextBlock",
        defaultData: { content: "New paragraph text", fontSize: 16, tag: "p" },
      },
      {
        label: "Button",
        icon: <Link size={18} className="text-indigo-500" />,
        type: "CustomButton",
        defaultData: { text: "Learn More", bgColor: "#2563eb", textColor: "#ffffff" },
      },
      {
        label: "Card",
        icon: <CreditCard size={18} className="text-cyan-500" />,
        type: "CardBlock",
        defaultData: {
          title: "Card Title",
          description: "A brief description of this card content.",
          linkText: "Read More",
          linkUrl: "#",
          shadow: true,
        },
      },
    ],
  },
  {
    label: "Media",
    items: [
      {
        label: "Image",
        icon: <ImageIcon size={18} className="text-purple-500" />,
        type: "ImageBlock",
        defaultData: { width: 100 },
      },
      {
        label: "Video",
        icon: <Play size={18} className="text-red-500" />,
        type: "VideoBlock",
        defaultData: { url: "", aspectRatio: "16/9" },
      },
    ],
  },
  {
    label: "Sections",
    items: [
      {
        label: "Accordion / FAQ",
        icon: <ChevronDown size={18} className="text-amber-500" />,
        type: "AccordionBlock",
        defaultData: {
          items: [
            { question: "What services do you offer?", answer: "We offer a wide range of services tailored to your needs." },
            { question: "How can I get started?", answer: "Simply reach out through our contact form and we'll guide you through the process." },
          ],
        },
      },
      {
        label: "Testimonial",
        icon: <MessageSquareQuote size={18} className="text-pink-500" />,
        type: "TestimonialBlock",
        defaultData: {
          quote: '"This service transformed our business. Highly recommended!"',
          name: "Jane Doe",
          title: "CEO, Acme Corp",
        },
      },
      {
        label: "Pricing Table",
        icon: <FileText size={18} className="text-emerald-500" />,
        type: "PricingTableBlock",
        isTopLevel: true,
        defaultData: {},
      },
      {
        label: "Metrics Grid",
        icon: <BarChart3 size={18} className="text-emerald-500" />,
        type: "MetricsGrid",
        isTopLevel: true,
        defaultData: {
          metrics: [
            {
              id: "1",
              layoutType: "standard",
              title: "SYSTEM UPTIME",
              value: "99.9%",
              subtext: "Trailing 30 days",
              badge: { text: "STABLE", variant: "default" },
            },
            {
              id: "2",
              layoutType: "highlight",
              title: "SERVER LOAD",
              value: "42%",
              subtext: "Capacity remaining",
              progressPercentage: 42,
            },
          ],
        },
      },
    ],
  },
  {
    label: "Navigation",
    items: [
      {
        label: "Navbar",
        icon: <Menu size={18} className="text-slate-600" />,
        type: "NavbarBlock",
        isTopLevel: true,
        defaultData: {
          logoText: "YourBrand",
          links: [
            { label: "Home", href: "#" },
            { label: "About", href: "#" },
            { label: "Services", href: "#" },
            { label: "Contact", href: "#" },
          ],
          ctaText: "Get Started",
          ctaLink: "#",
        },
      },
      {
        label: "Sidebar Nav",
        icon: <SidebarLeft size={18} className="text-slate-600" />,
        type: "SidebarNavBlock",
        isTopLevel: true,
        defaultData: {
          logoText: "YourBrand",
          links: [
            { label: "Dashboard", href: "#" },
            { label: "Projects", href: "#" },
            { label: "Team", href: "#" },
            { label: "Settings", href: "#" },
          ],
        },
      },
      {
        label: "Footer",
        icon: <PanelBottom size={18} className="text-slate-600" />,
        type: "FooterBlock",
        isTopLevel: true,
        defaultData: {},
      },
    ],
  },
  {
    label: "Forms & Social",
    items: [
      {
        label: "Contact Form",
        icon: <Mail size={18} className="text-teal-500" />,
        type: "ContactFormBlock",
        defaultData: {
          heading: "Get in Touch",
          subheading: "Fill out the form below and we'll get back to you soon.",
          submitText: "Send Message",
        },
      },
      {
        label: "Social Links",
        icon: <Share2 size={18} className="text-violet-500" />,
        type: "SocialLinksBlock",
        defaultData: {
          links: [
            { platform: "twitter", url: "#" },
            { platform: "facebook", url: "#" },
            { platform: "instagram", url: "#" },
            { platform: "linkedin", url: "#" },
          ],
        },
      },
    ],
  },
];

export default function EditorSidebar() {
  const { addBlock, activeBlockId } = useEditorStore();

  return (
    <div className="w-72 bg-white border-r border-slate-200 p-4 flex flex-col h-full shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 overflow-y-auto">
      <h2 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider px-2">
        Components
      </h2>

      <div className="space-y-5">
        {categories.map((category) => (
          <div key={category.label}>
            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-2 px-2">
              {category.label}
            </div>
            <div className="space-y-1">
              {category.items.map((item) => (
                <button
                  key={item.type}
                  onClick={() =>
                    addBlock(
                      item.type,
                      item.defaultData,
                      item.isTopLevel ? null : activeBlockId,
                    )
                  }
                  className="w-full flex items-center gap-3 text-left px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all text-slate-700 font-medium text-sm"
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
