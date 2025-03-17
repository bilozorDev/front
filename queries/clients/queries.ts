import { db } from "@/app/db";
import { clients } from "@/app/db/schema";
import { eq } from "drizzle-orm";
export const getClients = async () => {
  const clientsList = await db.select().from(clients);
  return clientsList as (typeof clients.$inferSelect)[];
};

export const getClientById = async (id: string) => {
  const client = await db.select().from(clients).where(eq(clients.id, id));
  return client as (typeof clients.$inferSelect)[];
};
