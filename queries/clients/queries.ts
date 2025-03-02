import { useQuery } from "@tanstack/react-query";
import { createClerkSupabaseClient } from "@/utils/supabase/serverSide/createClerkSupabaseClientSsr";
//get all clients
const getClients = async () => {
    const supabase = await createClerkSupabaseClient();
    const { data, error } = await supabase.from("clients").select("*");
    return data;
};

export const useGetClients = () => {
    const { data, error } = useQuery({
        queryKey: ["clients"],
        queryFn: getClients,
    });
    return { data, error };
};


