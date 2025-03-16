import {
  relations,
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm";
import { numeric, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const clients = pgTable("clients", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id").notNull(), // This is for Clerk user association
  created_at: timestamp("created_at").defaultNow().notNull(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
});

export type Client = InferSelectModel<typeof clients>;
export type ClientInsert = InferInsertModel<typeof clients>;

export const productSubcategories = pgTable("product_subcategories", {
  id: uuid("id").primaryKey().defaultRandom(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  slug: text("slug").notNull(),
  category_id: uuid("category_id")
    .notNull()
    .references(() => productsCategories.id), // Reference to parent category
});

export type ProductSubcategory = InferSelectModel<typeof productSubcategories>;
export type ProductSubcategoryInsert = InferInsertModel<
  typeof productSubcategories
>;

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id").notNull(), // For user ownership
  created_at: timestamp("created_at").defaultNow().notNull(),
  name: text("name").notNull(),
  cost: numeric("cost").notNull(),
  qty: numeric("qty").notNull().default("0"),
  description: text("description"),
  price: numeric("price").notNull(),
  category_id: uuid("category_id").references(() => productsCategories.id), // Main category reference
  subcategory_id: uuid("subcategory_id").references(
    () => productSubcategories.id,
  ), // Optional subcategory reference
});

export type Product = InferSelectModel<typeof products>;
export type ProductInsert = InferInsertModel<typeof products>;

export const productsCategories = pgTable("products_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  slug: text("slug").notNull(),
});

export type ProductCategory = InferSelectModel<typeof productsCategories>;
export type ProductCategoryInsert = InferInsertModel<typeof productsCategories>;

export const quotes = pgTable("quotes", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id").notNull(), // For user ownership
  created_at: timestamp("created_at").defaultNow().notNull(),
  name: text("name").notNull(),
  client_id: uuid("client_id").references(() => clients.id), // Reference client.id, not user_id
  status: text("status").notNull().default("draft"),
  total_amount: numeric("total_amount").notNull().default("0"),
  notes: text("notes"),
});

export type Quote = InferSelectModel<typeof quotes>;
export type QuoteInsert = InferInsertModel<typeof quotes>;

export const quote_items = pgTable("quote_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  quote_id: uuid("quote_id")
    .notNull()
    .references(() => quotes.id), // Add relationship to quotes
  created_at: timestamp("created_at").defaultNow().notNull(),
  name: text("name").notNull(),
  quantity: numeric("quantity").notNull().default("1"),
  price: numeric("price").notNull().default("0"),
  total: numeric("total").notNull().default("0"),
  product_id: uuid("product_id").references(() => products.id), // Optional reference to a product
});

export type QuoteItem = InferSelectModel<typeof quote_items>;
export type QuoteItemInsert = InferInsertModel<typeof quote_items>;

// Define relations (optional but helps with type safety)
export const quotesRelations = relations(quotes, ({ many, one }) => ({
  client: one(clients, {
    fields: [quotes.client_id],
    references: [clients.id],
  }),
  items: many(quote_items),
}));

export const quoteItemsRelations = relations(quote_items, ({ one }) => ({
  quote: one(quotes, {
    fields: [quote_items.quote_id],
    references: [quotes.id],
  }),
  product: one(products, {
    fields: [quote_items.product_id],
    references: [products.id],
  }),
}));



export const productsRelations = relations(products, ({ one }) => ({
  category: one(productsCategories, {
    fields: [products.category_id],
    references: [productsCategories.id],
  }),
  subcategory: one(productSubcategories, {
    fields: [products.subcategory_id],
    references: [productSubcategories.id],
  }),
}));


export const productSubcategoriesRelations = relations(
  productSubcategories,
  ({ one, many }) => ({
    category: one(productsCategories, {
      fields: [productSubcategories.category_id],
      references: [productsCategories.id],
    }),
    products: many(products),
  }),
);

export const productsCategoriesRelations = relations(
  productsCategories,
  ({ many }) => ({
    subcategories: many(productSubcategories),
    products: many(products),
  }),
);
