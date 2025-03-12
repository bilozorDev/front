import { useGetClientById, useGetClients } from "@/queries/clients/queries";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Client } from "@/types/types.t";
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/20/solid";
import {
  Dialog,
  DialogTitle,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import useQuoteStore from "@/store/quote-store";
export default function ClientInfoHeader() {
  const { updateClientId, clientId } = useQuoteStore();
  const params = useSearchParams();
  const clientIdFromParams = params.get("clientId");
  useEffect(() => {
    if (clientIdFromParams) {
      updateClientId(clientIdFromParams as string);
    }
  }, [clientIdFromParams, updateClientId]);
  const { data: client } = useGetClientById(clientId as string);
  const [openChangeClientModal, setOpenChangeClientModal] = useState(false);
  if (!client?.data) {
    return (
      <>
        <button
          onClick={() => setOpenChangeClientModal(true)}
          className="text-sm font-medium text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md px-2 py-1"
        >
          Select Client
        </button>
        <ChangeClientModal
          openChangeClientModal={openChangeClientModal}
          setOpenChangeClientModal={setOpenChangeClientModal}
        />
      </>
    );
  }
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-x-4">
          <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {client?.data.name}
          </h2>
          <button
            onClick={() => setOpenChangeClientModal(true)}
            className="text-sm font-medium text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md px-2 py-1"
          >
            Change Client
          </button>
        </div>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <MapPinIcon
              aria-hidden="true"
              className="mr-1.5 size-5 shrink-0 text-gray-400"
            />
            {client?.data.address}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <PhoneIcon
              aria-hidden="true"
              className="mr-1.5 size-5 shrink-0 text-gray-400"
            />
            {client?.data.phone}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <EnvelopeIcon
              aria-hidden="true"
              className="mr-1.5 size-5 shrink-0 text-gray-400"
            />
            {client?.data.email}
          </div>
        </div>
      </div>
      <ChangeClientModal
        openChangeClientModal={openChangeClientModal}
        setOpenChangeClientModal={setOpenChangeClientModal}
      />
    </div>
  );
}

const ChangeClientModal = ({
  openChangeClientModal,
  setOpenChangeClientModal,
}: {
  openChangeClientModal: boolean;
  setOpenChangeClientModal: (open: boolean) => void;
}) => {
  const { data: clients } = useGetClients();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const router = useRouter();

  const params = new URLSearchParams(window.location.search);
  const clientId = params.get("clientId");
  const handleChangeClient = () => {
    setOpenChangeClientModal(false);
    params.set("clientId", selectedClient?.id as string);
    router.push(`/dashboard/quotes/new?${params.toString()}`);
  };

  return (
    <Dialog
      open={openChangeClientModal}
      onClose={setOpenChangeClientModal}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  Select Client
                </DialogTitle>
                <div className="mt-2">
                  <div>
                    <div className="mt-2 grid grid-cols-1">
                      <select
                        id="location"
                        name="location"
                        onChange={(e) => {
                          setSelectedClient(
                            clients?.data.find(
                              (client) => client.id === e.target.value
                            ) as Client
                          );
                        }}
                        defaultValue={(clientId as string) || ""}
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        <option value="">Select Client</option>
                        {clients?.data?.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
              <button
                type="button"
                onClick={handleChangeClient}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
              >
                Confirm
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpenChangeClientModal(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
