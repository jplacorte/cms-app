"use client";

import { BlockRegistry } from "@/lib/block-map";
import { EditorBlock } from "@/store/useEditorStore";
import { SortableBlock } from "../SortableBlock";

export default function DynamicBlockWrapper({
  block,
  isEditor = false,
}: {
  block: EditorBlock;
  isEditor?: boolean;
}) {
  if (isEditor) {
    return <SortableBlock block={block} />;
  }

  const Component = BlockRegistry[block.type];

  if (!Component) {
    console.warn(`Missing component in registry for type: ${block.type}`);
    return null;
  }

  // Render a Google Font globally if requested
  const fontFamily = block.data.fontFamily as string;
  const fontUrl = fontFamily ? `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, "+")}:wght@300;400;500;600;700&display=swap` : null;

  return (
    <>
      {fontUrl && <link href={fontUrl} rel="stylesheet" />}
      <div
        className={block.data.className as string}
        style={{
          width: (block.data.width as string | number) || "100%",
          height: (block.data.height as string | number) || "auto",
          fontFamily: fontFamily || "inherit",
        }}
      >
        <Component {...block.data} id={block.id} isEditor={isEditor} customClassName={block.data.className as string}>
          {block.children}
        </Component>
      </div>
    </>
  );
}
