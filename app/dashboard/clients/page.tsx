"use client";

import { useGetClients } from "@/queries/clients/queries";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ClientInsert } from "@/types/types.t";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import ClientCard from "@/components/ClientCard";

function ClientsPage() {
  const { data, isLoading, error } = useGetClients();
  const [open, setOpen] = useState(false);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold text-gray-900">Clients</h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create new client
          </button>
        </div>
      </div>
      {data?.length === 0 && (
        <div>
          No clients found
          <button onClick={() => setOpen(true)}>Add Client</button>
        </div>
      )}
      <ul
        role="list"
        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {data?.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </ul>
      <AddClientDrawer open={open} setOpen={setOpen} />
    </div>
  );
}

export default ClientsPage;

type AddClientDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const useCreateClient = () => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (client: ClientInsert) => {
      const { data, error } = await supabase.from("clients").insert(client);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch the clients query
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};
function AddClientDrawer({ open, setOpen }: AddClientDrawerProps) {
  const [newClient, setNewClient] = useState<ClientInsert>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const { mutate: createClient } = useCreateClient();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createClient(newClient);
    setOpen(false);
    setNewClient({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <form
                className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                onSubmit={handleSubmit}
              >
                <div className="h-0 flex-1 overflow-y-auto">
                  <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-base font-semibold text-white">
                        New Client
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-indigo-300">
                        Get started by filling in the information below to
                        create your new client.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="divide-y divide-gray-200 px-4 sm:px-6">
                      <div className="space-y-6 pb-5 pt-6">
                        <div>
                          <label
                            htmlFor="project-name"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Client name
                          </label>
                          <div className="mt-2">
                            <input
                              id="project-name"
                              name="project-name"
                              type="text"
                              value={newClient.name}
                              onChange={(e) =>
                                setNewClient({
                                  ...newClient,
                                  name: e.target.value,
                                })
                              }
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="client-email"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Email
                          </label>
                          <div className="mt-2">
                            <input
                              id="client-email"
                              name="client-email"
                              type="email"
                              value={newClient.email ?? ""}
                              onChange={(e) =>
                                setNewClient({
                                  ...newClient,
                                  email: e.target.value,
                                })
                              }
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="client-phone"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Phone
                          </label>
                          <div className="mt-2">
                            <input
                              id="client-phone"
                              name="client-phone"
                              type="tel"
                              value={newClient.phone ?? ""}
                              onChange={(e) =>
                                setNewClient({
                                  ...newClient,
                                  phone: e.target.value,
                                })
                              }
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="client-address"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Address
                          </label>
                          <div className="mt-2">
                            <input
                              id="client-address"
                              name="client-address"
                              type="text"
                              value={newClient.address ?? ""}
                              onChange={(e) =>
                                setNewClient({
                                  ...newClient,
                                  address: e.target.value,
                                })
                              }
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 justify-end px-4 py-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Add
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
