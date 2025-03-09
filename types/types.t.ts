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

type ProductCategory = "Hardware" | "Software" | "Services";
type ProductHardwareSubCategory =
  | "Desktops"
  | "Laptops"
  | "Tablets"
  | "Phones"
  | "Monitors"
  | "Printers"
  | "Scanners"
  | "Projectors"
  | "Audio"
  | "Video"
  | "Storage"
  | "Networking"
  | "Security";

export interface AddProductSearchProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface SearchError {
  message: string;
  code: string;
}

export type SearchStatus = "idle" | "loading" | "success" | "error";
