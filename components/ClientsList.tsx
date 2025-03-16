"use client";
import { clients as clientsTable } from "@/app/db/schema";
import { useState } from "react";
import AddClientDrawer from "./AddClientDrawer";
import ClientCard from "./ClientCard";
import PageHeaderWithAction from "./PageHeaderWithAction";
const ClientsList = ({
  clients,
}: {
  clients: (typeof clientsTable.$inferSelect)[];
}) => {
  const [openAddClientModal, setOpenAddClientModal] = useState(false);
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
      />
      <div className="mt-4">
        {clients.length === 0 ? (
          <div>No clients found</div>
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
