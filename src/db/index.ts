import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// This initializes the serverless connection to Neon
const sql = neon(process.env.DATABASE_URL!);

// We pass the schema so Drizzle knows about our tables for type inference
export const db = drizzle(sql, { schema });
