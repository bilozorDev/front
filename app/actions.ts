"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { clients } from "./db/schema";

// insert client into db
export async function createClient(client: typeof clients.$inferInsert) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  await db.insert(clients).values({
    user_id: userId,
    name: client.name,
    email: client.email,
    phone: client.phone,
    address: client.address,
    created_at: new Date(),
  });
}

// get all clients
export async function getClients() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const client = await db
    .select()
    .from(clients)
    .where(eq(clients.user_id, userId));
  return client as (typeof clients.$inferSelect)[];
}
