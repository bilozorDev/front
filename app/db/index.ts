import { neon } from "@neondatabase/serverless";
import { loadEnvConfig } from "@next/env";
import { drizzle } from "drizzle-orm/neon-http";
import {
  clients,
  products,
  quote_items,
  quoteItemsRelations,
  quotes,
  quotesRelations,
} from "./schema";

loadEnvConfig(process.cwd());

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be a Neon postgres connection string");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, {
  schema: {
    clients,
    quotes,
    quote_items,
    products,
    quotesRelations,
    
    quoteItemsRelations,
  },
});
