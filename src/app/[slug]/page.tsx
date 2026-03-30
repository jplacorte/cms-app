import { db } from "@/db";
import { pages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { EditorBlock } from "@/store/useEditorStore";
import { notFound } from "next/navigation";
import DynamicBlockWrapper from "@/components/Editor/Wrappers/DynamicBlockWrapper";

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
  const blocks = pageData.blocks as EditorBlock[];

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div className="w-full flex flex-col">
        {blocks.map((block) => (
          <DynamicBlockWrapper key={block.id} block={block} isEditor={false} />
        ))}
      </div>
    </main>
  );
}