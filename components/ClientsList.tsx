"use client";
import { Client } from "@/app/db/schema";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import AddClientDrawer from "./AddClientDrawer";
import ClientCard from "./ClientCard";
import PageHeaderWithAction from "./PageHeaderWithAction";
import AddSampleClientsButton from "./AddSampleClientsButton";
const ClientsList = ({
  clients,
}: {
  clients: Client[];
}) => {
  const [openAddClientModal, setOpenAddClientModal] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Function to refresh data by triggering a router refresh
  const refreshData = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  // Function to close modal and refresh data
  const handleClientAdded = () => {
    setOpenAddClientModal(false);
    refreshData();
  };
  return (
    <div>
      <PageHeaderWithAction
        title="Clients"
        action={() => setOpenAddClientModal(true)}
        actionText="Add client"
      />
      <AddClientDrawer
        openAddClientDrawer={openAddClientModal}
        setOpenAddClientDrawer={setOpenAddClientModal}
        onClientAdded={handleClientAdded}
      />
      <div className="mt-4">
        {isPending ? (
          <div className="text-gray-500">Refreshing...</div>
        ) : clients.length === 0 ? (
          <div>No clients found
            <AddSampleClientsButton />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {clients.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsList;
