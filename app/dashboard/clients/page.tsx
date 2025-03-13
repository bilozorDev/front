"use client";
import { useGetClients } from "@/queries/clients/queries";
import ClientCard from "@/components/ClientCard";
import AddClientDrawer from "@/components/AddClientDrawer";
import PageHeaderWithAction from "@/components/PageHeaderWithAction";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
export default function ClientsPage() {
  const router = useRouter();
  const { data: clients, error } = useGetClients();
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Suspense fallback={<div>Loading clients...</div>}>
        <PageHeaderWithAction
          title="Clients"
          action={() => {
            router.push("/dashboard/clients?addClient=true");
          }}
          actionText="Add new client"
        />

        {clients?.data.length === 0 && <div>No clients found</div>}
        <ul
          role="list"
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {clients?.data.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </ul>
        <AddClientDrawer />
      </Suspense>
    </div>
  );
}
