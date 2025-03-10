"use server";
import { getClientsServer } from "@/queries/clients/queries";
import ClientCard from "@/components/ClientCard";
import AddClientDrawer from "@/components/AddClientDrawer";
import PageHeaderWithAction from "@/components/PageHeaderWithAction";
import { useRouter } from "next/navigation";
export default async function ClientsPage() {
  const router = useRouter();
  const { data: clients, error } = await getClientsServer();
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <PageHeaderWithAction
        title="Clients"
        action={() => {
          router.push("/dashboard/clients?addClient=true");
        }}
        actionText="Add new client"
      />
      {clients?.length === 0 && <div>No clients found</div>}
      <ul
        role="list"
        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {clients?.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </ul>
      <AddClientDrawer />
    </div>
  );
}
