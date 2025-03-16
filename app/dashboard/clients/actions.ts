"use server";
import { db } from "@/app/db";
import { clients } from "@/app/db/schema";
import { auth } from "@clerk/nextjs/server";

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
