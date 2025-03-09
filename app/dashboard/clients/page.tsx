"use server";
import { getClientsServer } from "@/queries/clients/queries";
import ClientCard from "@/components/ClientCard";
import AddClientDrawer from "@/components/AddClientDrawer";
import Link from "next/link";
export default async function ClientsPage() {
  const { data: clients, error } = await getClientsServer();
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold text-gray-900">Clients</h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <Link
            href="/dashboard/clients?addClient=true"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create new client
          </Link>
        </div>
      </div>
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
