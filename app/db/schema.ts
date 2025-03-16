import { relations } from "drizzle-orm";
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

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id").notNull(), // For user ownership
  created_at: timestamp("created_at").defaultNow().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  price: numeric("price").notNull(),
  category_id: uuid("category_id").references(() => productsCategories.id),
});

export const productsCategories = pgTable("products_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  slug: text("slug").notNull(),
});

export const quotes = pgTable("quotes", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id").notNull(), // For user ownership
  created_at: timestamp("created_at").defaultNow().notNull(),
  name: text("name").notNull(),
  client_id: uuid("client_id").references(() => clients.id), // Reference client.id, not user_id
  status: text("status").notNull().default("draft"),
  total_amount: numeric("total_amount").notNull().default("0"),
  notes: text("notes"),
  // Removed items reference - will be handled through the relationship
});

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
}));
