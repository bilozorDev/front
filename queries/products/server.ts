import { createClient as createServerClient } from "@/utils/supabase/server";
import { Product } from "@/types/types.t";
// get all products server side
export const getProductsServer = async () => {
  const supabase = await createServerClient();
  const { data, error } = await supabase.from("products").select("*");
  return { data: data as Product[], error };
};

// get product by id server side
export const getProductByIdServer = async (id: string) => {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return { data: data as Product, error };
};

// create product server side
export const createProductServer = async (product: Product) => {
  const supabase = await createServerClient();
  const { data, error } = await supabase.from("products").insert(product);
  return { data, error };
};
