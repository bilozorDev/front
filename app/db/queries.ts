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
  Quote,
  quotes,
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
  const productSubcategoriesList = await db
    .select({
      id: productSubcategories.id,
      name: productSubcategories.name,
      slug: productSubcategories.slug,
      category_id: productSubcategories.category_id,
      category_name: productsCategories.name,
    })
    .from(productSubcategories)
    .leftJoin(
      productsCategories,
      eq(productSubcategories.category_id, productsCategories.id),
    );
  return productSubcategoriesList as (ProductSubcategory & {
    category_name: string | null;
  })[];
};

/************* Quotes Queries *************/
export const getQuotes = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const quotesList = await db
    .select({
      id: quotes.id,
      client_id: quotes.client_id,
      client_name: clients.name,
      created_at: quotes.created_at,
      status: quotes.status,
      total_amount: quotes.total_amount,
      notes: quotes.notes,
    })
    .from(quotes)
    .leftJoin(clients, eq(quotes.client_id, clients.id))
    .where(eq(quotes.user_id, userId));
  return quotesList as (Quote & {
    client_name: string | null;
    status: string | null;
    total_amount: number | null;
    notes: string | null;
  })[];
};
