import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { ClientInsert, Client } from "@/types/types.t";
import { createClient as createServerClient } from "@/utils/supabase/server";

// get clients server side
export const getClientsServer = async () => {
  const supabase = await createServerClient();
  const { data, error } = await supabase.from("clients").select("*");
  return { data: data as Client[], error };
};

// get clients client side
const getClients = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("clients").select("*");
  return { data: data as Client[], error };
};

export const useGetClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });
};

// add client with existence check
const addClient = async (client: ClientInsert) => {
  const supabase = createClient();

  // First check if client exists
  const { data: existingClient, error: checkError } = await supabase
    .from("clients")
    .select("*")
    .eq("email", client.email)
    .maybeSingle(); // Use maybeSingle to avoid error if not found

  if (checkError) throw checkError;

  // If client exists, throw error
  if (existingClient) {
    throw new Error("duplicate_email");
  }

  // If client doesn't exist, insert
  const { data, error } = await supabase.from("clients").insert(client);
  if (error) throw error;

  return data;
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};
