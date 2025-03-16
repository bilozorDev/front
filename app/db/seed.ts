// drizzle/seed.ts
import { neon } from "@neondatabase/serverless";
import { loadEnvConfig } from "@next/env";
import { drizzle } from "drizzle-orm/neon-http";
import { productsCategories } from "./schema";

// Load environment variables
loadEnvConfig(process.cwd());

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be a Neon postgres connection string");
}

async function main() {
  const sql = neon(process.env.DATABASE_URL as string);
  const db = drizzle(sql);

  console.log("Seeding database...");

  // Check if product categories exist
  const existingCategories = await db
    .select()
    .from(productsCategories)
    .execute();

  // Only seed if no categories exist
  if (existingCategories.length === 0) {
    console.log("Seeding product categories...");

    // Insert product categories with specific IDs
    await db.insert(productsCategories).values([
      {
        id: "426e7704-cf2d-4321-b49a-5bd154411f3e",
        name: "Computers and Laptops",
        slug: "computers-and-laptops",
      },
      {
        id: "11974528-03d1-4040-ac95-d2c134622334",
        name: "Peripherals",
        slug: "peripherals",
      },
      {
        id: "69f0b99f-fde4-486f-8d4a-be816dd02621",
        name: "Networking",
        slug: "networking",
      },
      {
        id: "b734813a-af22-47e6-b105-8fdf1b4d1f80",
        name: "Services",
        slug: "services",
      },
      {
        id: "362c12ad-fe97-42cc-8bb0-89fe80311c73",
        name: "Other",
        slug: "other",
      },
    ]);

    console.log("✅ Product categories seeded successfully");
  } else {
    console.log("⚠️ Product categories already exist, skipping seed");
  }

  // Add any other seed data here
  // For example, you could add sample products in specific categories

  console.log("✅ Seeding completed");
}

main().catch((e) => {
  console.error("❌ Seeding failed");
  console.error(e);
  process.exit(1);
});
