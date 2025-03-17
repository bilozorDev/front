"use server";

import { db } from "@/app/db";
import { clients, products, quote_items, quotes } from "@/app/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function seedUserData() {
  try {
    // Get the current user ID from Clerk
    const { userId } = await auth();
    if (!userId) {
      return { error: "Unauthorized - Please log in first" };
    }

    // Start a transaction to ensure all data is inserted or none at all
    return await db.transaction(async (tx) => {
      console.log(`Starting seed for user: ${userId}`);

      // 1. Insert sample clients
      const clientsData = [
        {
          user_id: userId,
          name: "Acme Corporation",
          email: "contact@acme.com",
          phone: "555-123-4567",
          address: "123 Main St, Business District, CA 94103",
        },
        {
          user_id: userId,
          name: "TechStart Inc",
          email: "info@techstart.io",
          phone: "555-987-6543",
          address: "456 Innovation Ave, Tech Park, NY 10001",
        },
        {
          user_id: userId,
          name: "Green Earth Landscaping",
          email: "service@greenearth.com",
          phone: "555-456-7890",
          address: "789 Garden Rd, Suburbia, TX 75001",
        },
      ];

      const insertedClients = await tx
        .insert(clients)
        .values(clientsData)
        .returning();
      console.log(`Inserted ${insertedClients.length} clients`);

      // 2. Insert sample products
      const productsData = [
        {
          user_id: userId,
          name: "Website Design",
          description:
            "Complete website design including up to 5 pages with responsive layout",
          price: "1500.00",
        },
        {
          user_id: userId,
          name: "Logo Design",
          description: "Professional logo design with unlimited revisions",
          price: "500.00",
        },
        {
          user_id: userId,
          name: "SEO Package",
          description: "3-month SEO optimization package with monthly reports",
          price: "900.00",
        },
        {
          user_id: userId,
          name: "Social Media Setup",
          description: "Setup and branding of 3 social media platforms",
          price: "750.00",
        },
      ];

      const insertedProducts = await tx
        .insert(products)
        .values(productsData)
        .returning();
      console.log(`Inserted ${insertedProducts.length} products`);

      // 3. Insert a sample quote for the first client
      const quoteData = {
        user_id: userId,
        name: "Website Redesign Project",
        client_id: insertedClients[0].id,
        status: "draft",
        notes:
          "Complete website overhaul with new branding and content strategy",
      };

      const [insertedQuote] = await tx
        .insert(quotes)
        .values(quoteData)
        .returning();
      console.log(`Inserted quote: ${insertedQuote.id}`);

      // 4. Insert quote items for the quote
      const quoteItemsData = [
        {
          quote_id: insertedQuote.id,
          name: insertedProducts[0].name,
          quantity: "1",
          price: insertedProducts[0].price,
          total: insertedProducts[0].price,
          product_id: insertedProducts[0].id,
        },
        {
          quote_id: insertedQuote.id,
          name: insertedProducts[1].name,
          quantity: "1",
          price: insertedProducts[1].price,
          total: insertedProducts[1].price,
          product_id: insertedProducts[1].id,
        },
        {
          quote_id: insertedQuote.id,
          name: "Content Writing",
          quantity: "10",
          price: "100",
          total: "1000",
          product_id: null, // Custom item not linked to a product
        },
      ];

      const insertedQuoteItems = await tx
        .insert(quote_items)
        .values(quoteItemsData)
        .returning();
      console.log(`Inserted ${insertedQuoteItems.length} quote items`);

      // 5. Update the quote's total amount
      const totalAmount = quoteItemsData
        .reduce((sum, item) => sum + parseFloat(item.total.toString()), 0)
        .toString();

      await tx
        .update(quotes)
        .set({ total_amount: totalAmount })
        .where(eq(quotes.id, insertedQuote.id));

      return {
        success: "Seed data created successfully",
        summary: {
          clients: insertedClients.length,
          products: insertedProducts.length,
          quotes: 1,
          quoteItems: insertedQuoteItems.length,
        },
      };
    });
  } catch (error) {
    console.error("Error seeding data:", error);
    return { error: "Failed to seed data. See server logs for details." };
  }
}
