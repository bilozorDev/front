import { createClient } from "@/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const supabase = createClient();

export const toggleQuotePublicAccess = async ({ 
  quoteId, 
  makePublic 
}: { 
  quoteId: string, 
  makePublic: boolean 
}) => {
  const { data, error } = await supabase
    .rpc('toggle_quote_public_access', {
      quote_id: quoteId,
      make_public: makePublic
    });

  if (error) throw error;
  
  return { 
    token: data,
    isPublic: makePublic
  };
};

export const useToggleQuotePublicAccess = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: toggleQuotePublicAccess,
    onSuccess: (_, variables) => {
      // Invalidate quote queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['quote', variables.quoteId] });
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    },
    onError: (error) => {
      console.error("Error toggling quote access:", error);
      alert("Failed to update quote sharing settings");
    }
  });
};

// Get a shareable link for a quote
export const getShareableQuoteLink = (quoteId: string, token: string) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/quote/${quoteId}?token=${token}`;
};