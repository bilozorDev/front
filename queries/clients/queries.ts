import { db } from "@/app/db";
import { clients } from "@/app/db/schema";

export const getClients = async () => {
  const clientsList = await db.select().from(clients);
  return clientsList as typeof clients.$inferSelect[];
};
