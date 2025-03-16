import ClientsList from "@/components/ClientsList";
import { getClients } from "@/queries/clients/queries";
export default async function ClientsPage() {
  const clients = await getClients();
  console.log(clients);

  return <ClientsList clients={clients} />;
}
