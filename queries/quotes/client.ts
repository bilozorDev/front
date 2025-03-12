import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery } from "@tanstack/react-query";

const supabase = createClient();

const getQuotes = async () => {
  const { data, error } = await supabase.from("quotes").select("*");
  return { data, error };
};

export const useGetQuotes = () => {
  return useQuery({
    queryKey: ["quotes"],
    queryFn: getQuotes,
  });
};

const createQuote = async () => {
  const { data, error } = await supabase.from("quotes").insert({}).select();
  return { data, error };
};

export const useCreateQuote = () => {
  return useMutation({
    mutationFn: createQuote,
    onSuccess: ({ data }) => {
      if (data && data[0]) {
        console.log("Created quote with ID:", data[0]);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

const addProductToQuote = async (quoteId: string, productId: string) => {
  const { data, error } = await supabase.from("quote_products").insert({
    quote_id: quoteId,
    product_id: productId,
  });
  return data;
};

export const useAddProductToQuote = (quoteId: string, productId: string) => {
  return useMutation({
    mutationFn: () => addProductToQuote(quoteId, productId),
  });
};

const removeProductFromQuote = async (quoteId: string, productId: string) => {
  const { data, error } = await supabase
    .from("quote_products")
    .delete()
    .eq("quote_id", quoteId)
    .eq("product_id", productId);
  return data;
};

export const useRemoveProductFromQuote = (
  quoteId: string,
  productId: string
) => {
  return useMutation({
    mutationFn: () => removeProductFromQuote(quoteId, productId),
  });
};
