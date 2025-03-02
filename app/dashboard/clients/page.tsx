"use client";
import { useGetClients } from "@/queries/clients/queries";

function ClientsPage() {
  const { data, error } = useGetClients();
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }
  return <div>Clients</div>;
}

export default ClientsPage;
