import { useCreateClerkSupabaseClient } from "@/utils/supabase/clerkSupabaseClient";
import { useMutation } from "@tanstack/react-query";

export function useAddQuote() {
  const supabase = useCreateClerkSupabaseClient();

  const createQuote = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from("quotes")
        .insert([{}])
        .select();

      if (error) throw error;
      return data[0];
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error("Failed to create quote:", error);
    },
  });

  const deleteQuote = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("quotes").delete().eq("id", id);

      if (error) throw error;
    },
  });

  const updateQuote = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase.from("quotes").update(data).eq("id", id);

      if (error) throw error;
    },
  });

  return {
    createQuote,
    deleteQuote,
    updateQuote,
  };
}
