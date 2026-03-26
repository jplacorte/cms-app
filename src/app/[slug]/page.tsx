import { db } from "@/db";
import { pages } from "@/db/schema";
import { BlockRegistry } from "@/lib/block-map";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const pageData = await db.query.pages.findFirst({
    where: eq(pages.slug, params.slug),
    columns: { title: true }, // We only need the title for SEO, save bandwidth
  });

  if (!pageData) {
    return { title: "Page Not Found" };
  }

  return {
    title: `${pageData.title} | Kirke Consulting`,
    // You could also add descriptions, open graph images, etc. here later
  };
}

// Next.js passes the URL parameters directly to this component
export default async function PublicPage({
  params,
}: {
  params: { slug: string };
}) {
  // 1. Fetch the specific page from your Neon database
  const pageData = await db.query.pages.findFirst({
    where: eq(pages.slug, params.slug),
  });

  // 2. If the page doesn't exist, trigger the Next.js 404 page
  if (!pageData) {
    notFound();
  }

  // Drizzle automatically parses the JSONB column into a JavaScript array
  const blocks = pageData.blocks as any[];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-10 pb-24">
      <div className="w-full max-w-5xl">
        {/* 3. Map over the blocks and render the actual components */}
        {blocks.map((block) => {
          const Component = BlockRegistry[block.type];

          // If a block type is missing from the registry, we just skip it quietly
          // so we don't break the live site for visitors.
          if (!Component) {
            console.warn(
              `Missing component in registry for type: ${block.type}`,
            );
            return null;
          }

          // Render the component and spread the JSON data directly into it as props
          return (
            <div key={block.id} className="mb-8 w-full">
              <Component {...block.data} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
