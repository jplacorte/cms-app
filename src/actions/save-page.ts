"use server";

import { db } from "@/db";
import { pages } from "@/db/schema";
import { z } from "zod";

// A simplified Zod schema to protect the database
const PageSaveSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  blocks: z.array(z.any()), // You can replace z.any() with the strict discriminated unions we discussed earlier
});

export async function savePageAction(payload: unknown) {
  const parsed = PageSaveSchema.safeParse(payload);

  if (!parsed.success) {
    return { success: false, error: "Invalid page data format." };
  }

  const { title, slug, blocks } = parsed.data;

  try {
    // Upsert logic: If the slug exists, update it. If not, insert it.
    await db
      .insert(pages)
      .values({ title, slug, blocks })
      .onConflictDoUpdate({
        target: pages.slug,
        set: { title, blocks, updatedAt: new Date() },
      });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to save to database." };
  }
}
