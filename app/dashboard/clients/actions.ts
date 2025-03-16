"use server";
import { db } from "@/app/db";
import { clients } from "@/app/db/schema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/dist/server/api-utils";

export async function addClient(formData: FormData) {
  try {
    // Auth check
    const { userId } = await auth();
    if (!userId) {
      return { error: "User not authenticated" };
    }

    // Extract form data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    const clientData = {
      name: name || "",
      email: email || "",
      phone: phone || "",
      address: address || "",
      user_id: userId,
    };

    console.log("Attempting to insert client with data:", clientData);

    // Insert client data
    const result = await db.insert(clients).values(clientData).returning();
    console.log("Insert result:", result);

    return {
      success: "Client added successfully",
      data: result[0],
      redirect: "/dashboard/clients",
    };
  } catch (error: unknown) {
    // Detailed error logging
    console.error("Error in addClient:", error);

    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }

    return { error: "Failed to add client. Check server logs for details." };
  }
}
