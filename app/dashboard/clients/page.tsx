import { getClients } from "@/app/db/queries";
import ClientsList from "@/components/ClientsList";
export default async function ClientsPage() {
  const clients = await getClients();

  return <ClientsList clients={clients} />;
}
