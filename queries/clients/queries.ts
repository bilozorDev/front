import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { ClientInsert } from "@/types/types.t";

// get clients
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

// add client
const addClient = async (client: ClientInsert) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("clients").insert(client);
  return data;
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  const supabase = createClient();
  return useMutation({
    mutationFn: addClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};
