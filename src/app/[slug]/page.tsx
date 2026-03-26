import { db } from "@/db";
import { pages } from "@/db/schema";
import { BlockRegistry } from "@/lib/block-map";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

// FIX 1: Prevent Next.js from caching 404s.
// Because this is a CMS, we want the page to fetch fresh from the database every single time.
export const dynamic = "force-dynamic";

// FIX 2: In Next.js 15, `params` is now a Promise and must be awaited before you can read the slug.
export default async function PublicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Unwrap the promise to safely get the slug string from the URL
  const { slug } = await params;

  console.log("Looking up slug:", slug); // This will print in your terminal so you can verify!

  // Fetch the page from Neon
  const pageData = await db.query.pages.findFirst({
    where: eq(pages.slug, slug),
  });

  // If still not found, trigger the Next.js 404
  if (!pageData) {
    notFound();
  }

  // Parse the blocks
  const blocks = pageData.blocks as any[];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-10 pb-24">
      <div className="w-full max-w-5xl">
        {blocks.map((block) => {
          const Component = BlockRegistry[block.type];

          if (!Component) {
            console.warn(
              `Missing component in registry for type: ${block.type}`,
            );
            return null;
          }

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
