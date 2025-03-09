import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

const getProducts = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    throw error;
  }
  return data;
};

//get all products
export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
};
