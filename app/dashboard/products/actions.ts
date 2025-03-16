"use server";

import { db } from "@/app/db";
import { products, productsCategories } from "@/app/db/schema";
import { auth } from "@clerk/nextjs/server";

export async function addProduct(formData: FormData) {
  try {
    // Auth check
    const { userId } = await auth();
    if (!userId) {
      return { error: "User not authenticated" };
    }

    const productData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      category_id: formData.get("category_id") as string,
      user_id: userId,
    };

    // Insert client data
    const result = await db.insert(products).values(productData).returning();

    return {
      success: "Product added successfully",
      data: result[0],
    };
  } catch (error: unknown) {
    console.error("Error in addProduct:", error);

    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }

    return { error: "Failed to add product. Check server logs for details." };
  }
}

export async function addSampleProducts() {
  try {
    // Get the current user ID from Clerk
    const { userId } = await auth();
    if (!userId) {
      return { error: "Unauthorized - Please log in first" };
    }

    // Get all product categories to assign them to products
    const categories = await db.select().from(productsCategories).execute();

    if (categories.length === 0) {
      return {
        error: "No product categories found. Please seed categories first.",
      };
    }

    // Create sample products with variety
    const sampleProducts = [
      // Computer & Laptops category
      {
        user_id: userId,
        name: "Basic Desktop Computer Setup",
        description:
          "Entry-level desktop computer with monitor, keyboard, and mouse.",
        price: "799.99",
        category_id: getCategoryIdBySlug(categories, "computers-and-laptops"),
      },
      {
        user_id: userId,
        name: "Business Laptop Pro",
        description:
          "14-inch lightweight laptop with extended battery life and business features.",
        price: "1299.99",
        category_id: getCategoryIdBySlug(categories, "computers-and-laptops"),
      },

      // Peripherals category
      {
        user_id: userId,
        name: "Mechanical Gaming Keyboard",
        description: "RGB backlit mechanical keyboard with customizable keys.",
        price: "129.99",
        category_id: getCategoryIdBySlug(categories, "peripherals"),
      },
      {
        user_id: userId,
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with precision tracking.",
        price: "49.99",
        category_id: getCategoryIdBySlug(categories, "peripherals"),
      },

      // Networking category
      {
        user_id: userId,
        name: "WiFi 6 Router",
        description: "High-speed WiFi 6 router with multi-device support.",
        price: "189.99",
        category_id: getCategoryIdBySlug(categories, "networking"),
      },
      {
        user_id: userId,
        name: "Network Switch 8-Port",
        description:
          "8-port gigabit ethernet network switch for home or small office.",
        price: "59.99",
        category_id: getCategoryIdBySlug(categories, "networking"),
      },

      // Services category
      {
        user_id: userId,
        name: "Computer Setup Service",
        description:
          "Professional setup of new computer including software installation and data transfer.",
        price: "149.99",
        category_id: getCategoryIdBySlug(categories, "services"),
      },
      {
        user_id: userId,
        name: "Network Installation",
        description:
          "Complete installation and configuration of home or office network.",
        price: "299.99",
        category_id: getCategoryIdBySlug(categories, "services"),
      },

      // Other category
      {
        user_id: userId,
        name: "Anti-Virus Software Subscription",
        description: "1-year subscription to premium anti-virus software.",
        price: "39.99",
        category_id: getCategoryIdBySlug(categories, "other"),
      },
      {
        user_id: userId,
        name: "External Backup Drive",
        description: "2TB external hard drive for data backup and storage.",
        price: "89.99",
        category_id: getCategoryIdBySlug(categories, "other"),
      },
    ];

    // Filter out any products that don't have a valid category
    const validProducts = sampleProducts.filter(
      (product) => product.category_id,
    );

    // Insert the products
    const insertedProducts = await db
      .insert(products)
      .values(validProducts)
      .returning();

    console.log(
      `Added ${insertedProducts.length} sample products for user: ${userId}`,
    );

    return {
      success: "Sample products added successfully",
      count: insertedProducts.length,
    };
  } catch (error) {
    console.error("Error adding sample products:", error);
    return {
      error: "Failed to add sample products. See server logs for details.",
    };
  }
}

// Helper function to get category ID by slug
function getCategoryIdBySlug(categories: any[], slug: string) {
  const category = categories.find((cat) => cat.slug === slug);
  return category ? category.id : null;
}
