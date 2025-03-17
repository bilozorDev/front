// drizzle/seed.ts
import { neon } from "@neondatabase/serverless";
import { loadEnvConfig } from "@next/env";
import { drizzle } from "drizzle-orm/neon-http";
import { productsCategories, productSubcategories } from "./schema";

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

  // Check if subcategories exist
  const existingSubcategories = await db
    .select()
    .from(productSubcategories)
    .execute();

  // Only seed subcategories if none exist
  if (existingSubcategories.length === 0) {
    console.log("Seeding product subcategories...");

    // Insert subcategories
    await db.insert(productSubcategories).values([
      // Computers and Laptops subcategories
      {
        name: "Desktops",
        slug: "desktops",
        category_id: "426e7704-cf2d-4321-b49a-5bd154411f3e",
      },
      {
        name: "Laptops",
        slug: "laptops",
        category_id: "426e7704-cf2d-4321-b49a-5bd154411f3e",
      },
      {
        name: "Servers",
        slug: "servers",
        category_id: "426e7704-cf2d-4321-b49a-5bd154411f3e",
      },
      {
        name: "All-in-Ones",
        slug: "all-in-ones",
        category_id: "426e7704-cf2d-4321-b49a-5bd154411f3e",
      },
      {
        name: "Mini PCs",
        slug: "mini-pcs",
        category_id: "426e7704-cf2d-4321-b49a-5bd154411f3e",
      },

      // Peripherals subcategories
      {
        name: "Monitors",
        slug: "monitors",
        category_id: "11974528-03d1-4040-ac95-d2c134622334",
      },
      {
        name: "Keyboards",
        slug: "keyboards",
        category_id: "11974528-03d1-4040-ac95-d2c134622334",
      },
      {
        name: "Mice",
        slug: "mice",
        category_id: "11974528-03d1-4040-ac95-d2c134622334",
      },
      {
        name: "Printers",
        slug: "printers",
        category_id: "11974528-03d1-4040-ac95-d2c134622334",
      },
      {
        name: "Scanners",
        slug: "scanners",
        category_id: "11974528-03d1-4040-ac95-d2c134622334",
      },
      {
        name: "Webcams",
        slug: "webcams",
        category_id: "11974528-03d1-4040-ac95-d2c134622334",
      },

      // Networking subcategories
      {
        name: "Routers",
        slug: "routers",
        category_id: "69f0b99f-fde4-486f-8d4a-be816dd02621",
      },
      {
        name: "Switches",
        slug: "switches",
        category_id: "69f0b99f-fde4-486f-8d4a-be816dd02621",
      },
      {
        name: "Access Points",
        slug: "access-points",
        category_id: "69f0b99f-fde4-486f-8d4a-be816dd02621",
      },
      {
        name: "Firewalls",
        slug: "firewalls",
        category_id: "69f0b99f-fde4-486f-8d4a-be816dd02621",
      },
      {
        name: "Cables",
        slug: "cables",
        category_id: "69f0b99f-fde4-486f-8d4a-be816dd02621",
      },
      {
        name: "Network Cards",
        slug: "network-cards",
        category_id: "69f0b99f-fde4-486f-8d4a-be816dd02621",
      },

      // Services subcategories
      {
        name: "Installation",
        slug: "installation",
        category_id: "b734813a-af22-47e6-b105-8fdf1b4d1f80",
      },
      {
        name: "Configuration",
        slug: "configuration",
        category_id: "b734813a-af22-47e6-b105-8fdf1b4d1f80",
      },
      {
        name: "Maintenance",
        slug: "maintenance",
        category_id: "b734813a-af22-47e6-b105-8fdf1b4d1f80",
      },
      {
        name: "Support Plans",
        slug: "support-plans",
        category_id: "b734813a-af22-47e6-b105-8fdf1b4d1f80",
      },
      {
        name: "Training",
        slug: "training",
        category_id: "b734813a-af22-47e6-b105-8fdf1b4d1f80",
      },

      // Other subcategories
      {
        name: "Software",
        slug: "software",
        category_id: "362c12ad-fe97-42cc-8bb0-89fe80311c73",
      },
      {
        name: "Accessories",
        slug: "accessories",
        category_id: "362c12ad-fe97-42cc-8bb0-89fe80311c73",
      },
      {
        name: "Storage Solutions",
        slug: "storage-solutions",
        category_id: "362c12ad-fe97-42cc-8bb0-89fe80311c73",
      },
      {
        name: "Security Products",
        slug: "security-products",
        category_id: "362c12ad-fe97-42cc-8bb0-89fe80311c73",
      },
    ]);

    console.log("✅ Product subcategories seeded successfully");
  } else {
    console.log("⚠️ Product subcategories already exist, skipping seed");
  }

  console.log("✅ Seeding completed");
}

main().catch((e) => {
  console.error("❌ Seeding failed");
  console.error(e);
  process.exit(1);
});
