"use server";
import { db } from "@/app/db";
import { clients } from "@/app/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function addClient(formData: FormData) {
  try {
    // Auth check
    const { userId } = await auth();
    if (!userId) {
      return { error: "User not authenticated" };
    }

    const clientData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      user_id: userId,
    };

    // Insert client data
    const result = await db.insert(clients).values(clientData).returning();

    return {
      success: "Client added successfully",
      data: result[0],
    };
  } catch (error: unknown) {
    console.error("Error in addClient:", error);

    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }

    return { error: "Failed to add client. Check server logs for details." };
  }
}

export async function deleteClient(id: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "User not authenticated" };
    }

    await db.delete(clients).where(eq(clients.id, id));
  } catch (error: unknown) {
    console.error("Error in deleteClient:", error);
    return { error: "Failed to delete client. Check server logs for details." };
  }
}

// Add sample clients
export async function addSampleClients() {
  try {
    // Get the current user ID from Clerk
    const { userId } = await auth();
    if (!userId) {
      return { error: "Unauthorized - Please log in first" };
    }

    // Sample client data
    const sampleClients = [
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
      {
        user_id: userId,
        name: "Bright Spark Electricians",
        email: "hello@brightspark.com",
        phone: "555-222-3333",
        address: "101 Power Ave, Industrial Zone, IL 60007",
      },
      {
        user_id: userId,
        name: "Pixel Perfect Design Studio",
        email: "design@pixelperfect.co",
        phone: "555-444-5555",
        address: "202 Creative Blvd, Arts District, WA 98101",
      },
    ];

    // Insert the clients
    const insertedClients = await db
      .insert(clients)
      .values(sampleClients)
      .returning();

    console.log(
      `Added ${insertedClients.length} sample clients for user: ${userId}`,
    );

    return {
      success: "Sample clients added successfully",
      count: insertedClients.length,
      clients: insertedClients,
    };
  } catch (error) {
    console.error("Error adding sample clients:", error);
    return {
      error: "Failed to add sample clients. See server logs for details.",
    };
  }
}
