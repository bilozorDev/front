// types.ts
import { Tables, TablesInsert, TablesUpdate } from "./supabase";

// Quote types
export type Quote = Tables<"quotes">;
export type QuoteInsert = TablesInsert<"quotes">;
export type QuoteUpdate = TablesUpdate<"quotes">;

export interface AddProductSearchProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface SearchError {
  message: string;
  code: string;
}

export type SearchStatus = "idle" | "loading" | "success" | "error";
