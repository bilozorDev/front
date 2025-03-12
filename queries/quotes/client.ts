import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QuoteInsert } from "@/types/types.t";
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
const createQuote = async (quoteData: QuoteInsert) => {
  const { data, error } = await supabase
    .from("quotes")
    .insert(quoteData)
    .select();

  if (error) throw error;
  return data[0];
};

export const useCreateQuote = () => {
  return useMutation({
    mutationFn: createQuote,
    onSuccess: (data) => {
      console.log("Created quote with ID:", data.id);

      return data;
    },
    onError: (error) => {
      console.error("Error creating quote:", error);
      alert("Failed to create quote");
    },
  });
};

export const getQuoteById = async (id: string) => {
  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
};

export const useGetQuoteById = (id: string) => {
  return useQuery({
    queryKey: ["quote", id],
    queryFn: () => getQuoteById(id),
  });
};
