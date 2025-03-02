// types.ts
import { Tables, TablesInsert, TablesUpdate } from "./supabase";

// Client types
export type Client = Tables<"clients">;
export type ClientInsert = TablesInsert<"clients">;
export type ClientUpdate = TablesUpdate<"clients">;

export interface Product {
  id: string;
  vendor_id: string;
  name: string;
  model: string;
  description: string;
  price: number;
  product_url: string;
  image_url: string;
  image_urls: string[];
  availability: string;
  specs: Record<string, unknown>;
  last_updated: string;
  created_at: string;
  category_id: string;
  specs_image_url: string | null;
}

export interface AddProductSearchProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface SearchError {
  message: string;
  code: string;
}

export type SearchStatus = "idle" | "loading" | "success" | "error";
