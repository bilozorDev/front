import { db } from "@/app/db";
import {
  Client,
  clients,
  Product,
  ProductCategory,
  products,
  productsCategories,
  productSubcategories,
  ProductSubcategory,
} from "@/app/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

/************* Clients Queries *************/
export const getClients = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const clientsList = await db
    .select()
    .from(clients)
    .where(eq(clients.user_id, userId));
  return clientsList as Client[];
};

export const getClientById = async (id: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const client = await db
    .select()
    .from(clients)
    .where(and(eq(clients.id, id), eq(clients.user_id, userId)));
  return client as Client[];
};

/************* Products Queries *************/
export const getProducts = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const productsList = await db
    .select({
      id: products.id,
      name: products.name,
      description: products.description,
      price: products.price,
      category_id: products.category_id,
      category_name: productsCategories.name,
      category_slug: productsCategories.slug,
    })
    .from(products)
    .leftJoin(
      productsCategories,
      eq(products.category_id, productsCategories.id),
    )
    .where(eq(products.user_id, userId));
  return productsList as (Product & {
    category_name: string | null;
    category_slug: string | null;
  })[];
};

/************* Product Categories Queries *************/
export const getProductCategories = async () => {
  const productCategoriesList = await db.select().from(productsCategories);
  return productCategoriesList as ProductCategory[];
};

/************* Product Subcategories Queries *************/
export const getProductSubcategories = async () => {
  const productSubcategoriesList = await db.select().from(productSubcategories);
  return productSubcategoriesList as ProductSubcategory[];
};
