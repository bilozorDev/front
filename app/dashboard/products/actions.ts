"use server";

import { db } from "@/app/db";
import {
  ProductInsert,
  products,
  productsCategories,
  productSubcategories,
} from "@/app/db/schema";
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
      cost: formData.get("cost") as string,
      qty: formData.get("qty") as string,
      subcategory_id: formData.get("subcategory_id") as string,
    } as ProductInsert;

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
    const subcategories = await db
      .select()
      .from(productSubcategories)
      .execute();

    if (categories.length === 0) {
      return {
        error: "No product categories found. Please seed categories first.",
      };
    }

    // Log available subcategories for debugging
    console.log(
      "Available subcategories:",
      subcategories.map((s) => ({
        id: s.id,
        name: s.name,
        slug: s.slug,
        category_id: s.category_id,
      })),
    );

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
        cost: "500.00",
        qty: "1",
        subcategory_id: getSubcategoryIdBySlug(subcategories, "desktops"),
      },
      {
        user_id: userId,
        name: "Business Laptop Pro",
        cost: "1000.00",
        qty: "1",
        price: "1299.99",
        description:
          "14-inch lightweight laptop with extended battery life and business features.",
        category_id: getCategoryIdBySlug(categories, "computers-and-laptops"),
        subcategory_id: getSubcategoryIdBySlug(subcategories, "laptops"),
      },

      // Peripherals category
      {
        user_id: userId,
        name: "Mechanical Gaming Keyboard",
        description: "RGB backlit mechanical keyboard with customizable keys.",
        price: "129.99",
        cost: "100.00",
        qty: "1",
        subcategory_id: getSubcategoryIdBySlug(subcategories, "keyboards"),
        category_id: getCategoryIdBySlug(categories, "peripherals"),
      },
      {
        user_id: userId,
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with precision tracking.",
        price: "49.99",
        cost: "30.00", // Added required cost
        qty: "5", // Added required qty
        subcategory_id: getSubcategoryIdBySlug(subcategories, "mice"),
        category_id: getCategoryIdBySlug(categories, "peripherals"),
      },

      // Networking category
      {
        user_id: userId,
        name: "WiFi 6 Router",
        description: "High-speed WiFi 6 router with multi-device support.",
        price: "189.99",
        cost: "150.00",
        qty: "10",
        subcategory_id: getSubcategoryIdBySlug(subcategories, "routers"),
        category_id: getCategoryIdBySlug(categories, "networking"),
      },
      {
        user_id: userId,
        name: "Network Switch 8-Port",
        description:
          "8-port gigabit ethernet network switch for home or small office.",
        price: "59.99",
        cost: "40.00",
        qty: "10",
        subcategory_id: getSubcategoryIdBySlug(subcategories, "switches"),
        category_id: getCategoryIdBySlug(categories, "networking"),
      },

      // Services category
      {
        user_id: userId,
        name: "Computer Setup Service",
        description:
          "Professional setup of new computer including software installation and data transfer.",
        price: "149.99",
        cost: "100.00",
        qty: "1",
        subcategory_id: getSubcategoryIdBySlug(subcategories, "installation"),
        category_id: getCategoryIdBySlug(categories, "services"),
      },
      {
        user_id: userId,
        name: "Network Installation",
        description:
          "Complete installation and configuration of home or office network.",
        price: "299.99",
        cost: "200.00",
        qty: "1",
        subcategory_id: getSubcategoryIdBySlug(subcategories, "installation"),
        category_id: getCategoryIdBySlug(categories, "services"),
      },

      // Other category
      {
        user_id: userId,
        name: "Anti-Virus Software Subscription",
        description: "1-year subscription to premium anti-virus software.",
        price: "39.99",
        cost: "30.00",
        qty: "1",
        subcategory_id: getSubcategoryIdBySlug(subcategories, "software"),
        category_id: getCategoryIdBySlug(categories, "other"),
      },
      {
        user_id: userId,
        name: "External Backup Drive",
        description: "2TB external hard drive for data backup and storage.",
        price: "89.99",
        cost: "60.00",
        qty: "1",
        subcategory_id: getSubcategoryIdBySlug(
          subcategories,
          "storage-solutions",
        ),
        category_id: getCategoryIdBySlug(categories, "other"),
      },
    ];

    // Before insertion, validate each product has required fields
    const validProducts = sampleProducts.filter((product) => {
      console.log(`Validating product: ${product.name}`);

      // Check for valid subcategory
      if (!product.subcategory_id) {
        console.log(
          `WARNING: Product ${product.name} has no valid subcategory. Attempted lookup returned null.`,
        );
      }

      // Check required fields
      const isValid = Boolean(
        product.category_id &&
          product.name &&
          product.price &&
          product.cost &&
          product.qty &&
          product.user_id,
      );

      if (!isValid) {
        console.log(
          `Invalid product: ${product.name} - Missing required fields`,
        );
        console.log("Fields:", {
          category_id: product.category_id,
          name: product.name,
          price: product.price,
          cost: product.cost,
          qty: product.qty,
          user_id: product.user_id,
        });
      }

      return isValid;
    });

    console.log(
      `Found ${validProducts.length} valid products out of ${sampleProducts.length}`,
    );

    // If no valid products, return error
    if (validProducts.length === 0) {
      return {
        error:
          "No valid products to insert. Please check server logs for details.",
      };
    }

    // Insert the products and handle potential type errors with casting
    try {
      const insertedProducts = await db
        .insert(products)
        .values(validProducts as ProductInsert[])
        .returning();

      console.log(
        `Added ${insertedProducts.length} sample products for user: ${userId}`,
      );

      return {
        success: "Sample products added successfully",
        count: insertedProducts.length,
      };
    } catch (insertError) {
      console.error("Error inserting products:", insertError);

      // Try to insert one by one to identify problematic records
      const successfulInserts = [];
      for (const product of validProducts) {
        try {
          console.log(`Trying to insert product: ${product.name}`);
          const result = await db
            .insert(products)
            .values(product as ProductInsert)
            .returning();

          successfulInserts.push(result[0]);
          console.log(`Successfully inserted: ${product.name}`);
        } catch (singleInsertError) {
          console.error(
            `Failed to insert product ${product.name}:`,
            singleInsertError,
          );
        }
      }

      if (successfulInserts.length > 0) {
        return {
          success: `Partially successful: Added ${successfulInserts.length} out of ${validProducts.length} products`,
          count: successfulInserts.length,
        };
      } else {
        throw insertError; // Re-throw to handle in the catch block
      }
    }
  } catch (error) {
    console.error("Error adding sample products:", error);
    console.error("Detailed error:", JSON.stringify(error, null, 2));
    return {
      error: "Failed to add sample products. See server logs for details.",
    };
  }
}

// Helper function to get category ID by slug
function getCategoryIdBySlug(
  categories: { slug: string; id: string }[],
  slug: string,
) {
  const category = categories.find((cat) => cat.slug === slug);
  if (!category) {
    console.log(`Category not found for slug: ${slug}`);
    console.log(
      "Available categories:",
      categories.map((c) => c.slug),
    );
  }
  return category ? category.id : null;
}

// Helper function to get subcategory ID by slug
function getSubcategoryIdBySlug(
  subcategories: { slug: string; id: string }[],
  slug: string,
) {
  const subcategory = subcategories.find((sub) => sub.slug === slug);
  if (!subcategory) {
    console.log(`Subcategory not found for slug: ${slug}`);
    console.log(
      "Available subcategories:",
      subcategories.map((s) => s.slug),
    );
  }
  return subcategory ? subcategory.id : null;
}
