// types.ts
import { Tables, TablesInsert, TablesUpdate } from "./supabase";

// Client types
export type Client = Tables<"clients">;
export type ClientInsert = TablesInsert<"clients">;
export type ClientUpdate = TablesUpdate<"clients">;

// Product types
export type Product = Tables<"products">;
export type ProductInsert = TablesInsert<"products">;
export type ProductUpdate = TablesUpdate<"products">;

// Quote types
export type Quote = Tables<"quotes">;
export type QuoteInsert = TablesInsert<"quotes">;
export type QuoteUpdate = TablesUpdate<"quotes">;

// Product category types
export type ProductCategory = Tables<"product_category">;
export type ProductCategoryInsert = TablesInsert<"product_category">;
export type ProductCategoryUpdate = TablesUpdate<"product_category">;

export interface AddProductSearchProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface SearchError {
  message: string;
  code: string;
}

export type SearchStatus = "idle" | "loading" | "success" | "error";
