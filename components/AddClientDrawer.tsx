"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ClientInsert } from "@/types/types.t";
import { useState } from "react";
import { useCreateClient } from "@/queries/clients/queries";
import { useQueryParamsToggle } from "@/hooks/useQueryParamsToggle";

export default function AddClientDrawer() {
  const { isActive, handleToggle } = useQueryParamsToggle({
    paramsName: "addClient",
  });

  const [newClient, setNewClient] = useState<ClientInsert>({
    name: "test",
    email: "test@test.com",
    phone: "1234567890",
    address: "123 Main St, Anytown, USA",
  });
  const { mutate: createClient, isPending, error } = useCreateClient();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createClient(newClient, {
      onSuccess: () => {
        handleToggle();
        setNewClient({
          name: "",
          email: "",
          phone: "",
          address: "",
        });
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const handleClose = () => {
    handleToggle();
  };

  return (
    <Dialog open={isActive} onClose={handleClose} className="relative z-50">
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
                          onClick={handleClose}
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
                              className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
                                error ? "outline-red-500 outline-2" : ""
                              }`}
                            />
                          </div>
                          {error && (
                            <div className="rounded-md bg-red-50 p-3">
                              <div className="flex">
                                <div className="text-sm text-red-700">
                                  {error.message}
                                </div>
                              </div>
                            </div>
                          )}
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
                    onClick={handleClose}
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
