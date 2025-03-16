import { db } from "@/app/db";
import { clients, products, productsCategories } from "@/app/db/schema";
import { eq } from "drizzle-orm";

/************* Clients Queries *************/
export const getClients = async () => {
  const clientsList = await db.select().from(clients);
  return clientsList as (typeof clients.$inferSelect)[];
};

export const getClientById = async (id: string) => {
  const client = await db.select().from(clients).where(eq(clients.id, id));
  return client as (typeof clients.$inferSelect)[];
};

/************* Products Queries *************/
export const getProducts = async () => {
  const productsList = await db.select().from(products);
  return productsList as (typeof products.$inferSelect)[];
};

/************* Product Categories Queries *************/
export const getProductCategories = async () => {
  const productCategoriesList = await db.select().from(productsCategories);
  return productCategoriesList as (typeof productsCategories.$inferSelect)[];
};
