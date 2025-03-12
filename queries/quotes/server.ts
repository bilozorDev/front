import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Product } from "@/types/types.t";

export async function getPublicQuoteById(id: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  // Fetch the quote with RLS bypassed for public access
  const { data: quote, error: quoteError } = await supabase
    .from("quotes")
    .select("*, clients(name, company)")
    .eq("id", id)
    .maybeSingle();
  
  if (quoteError) {
    throw new Error(`Error fetching quote: ${quoteError.message}`);
  }

  if (!quote) {
    return { quote: null, products: [], client: null };
  }

  // Fetch the quote products
  const { data: quoteProducts, error: productsError } = await supabase
    .from("quote_products")
    .select("*, products(*)")
    .eq("quote_id", id);

  if (productsError) {
    throw new Error(`Error fetching quote products: ${productsError.message}`);
  }

  // Transform into the format needed by the UI
  const products: Product[] = quoteProducts.map((qp: any) => ({
    ...qp.products,
    qty: qp.quantity
  }));

  const client = quote.clients;
  
  return { 
    quote,
    products,
    client
  };
}