import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
const getClients = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("clients").select("*");
  return data;
};

export const useGetClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });
};
