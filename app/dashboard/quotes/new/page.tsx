"use client";
import { useGetClientById, useGetClients } from "@/queries/clients/queries";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from "@headlessui/react";
import {
  ChevronRightIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import Link from "next/dist/client/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Client } from "@/types/types.t";
export default function NewQuote() {
  const params = useSearchParams();
  const clientId = params.get("clientId");

  return (
    <main>
      <header className="relative isolate">
        <ClientInfoHeader />
      </header>

      <table className="mt-16 w-full whitespace-nowrap text-left text-sm/6">
        <colgroup>
          <col className="w-full" />
          <col />
          <col />
          <col />
        </colgroup>
        <thead className="border-b border-gray-200 text-gray-900">
          <tr>
            <th scope="col" className="px-0 py-3 font-semibold">
              Projects
            </th>
            <th
              scope="col"
              className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
            >
              Hours
            </th>
            <th
              scope="col"
              className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
            >
              Rate
            </th>
            <th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.id} className="border-b border-gray-100">
              <td className="max-w-0 px-0 py-5 align-top">
                <div className="truncate font-medium text-gray-900">
                  {item.title}
                </div>
                <div className="truncate text-gray-500">{item.description}</div>
              </td>
              <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                {item.hours}
              </td>
              <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                {item.rate}
              </td>
              <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">
                {item.price}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th
              scope="row"
              className="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden"
            >
              Subtotal
            </th>
            <th
              scope="row"
              colSpan={3}
              className="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell"
            >
              Subtotal
            </th>
            <td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">
              {invoice.subTotal}
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              className="pt-4 font-normal text-gray-700 sm:hidden"
            >
              Tax
            </th>
            <th
              scope="row"
              colSpan={3}
              className="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell"
            >
              Tax
            </th>
            <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900">
              {invoice.tax}
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              className="pt-4 font-semibold text-gray-900 sm:hidden"
            >
              Total
            </th>
            <th
              scope="row"
              colSpan={3}
              className="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell"
            >
              Total
            </th>
            <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900">
              {invoice.total}
            </td>
          </tr>
        </tfoot>
      </table>
    </main>
  );
}

const invoice = {
  subTotal: "$8,800.00",
  tax: "$1,760.00",
  total: "$10,560.00",
  items: [
    {
      id: 1,
      title: "Logo redesign",
      description: "New logo and digital asset playbook.",
      hours: "20.0",
      rate: "$100.00",
      price: "$2,000.00",
    },
    {
      id: 2,
      title: "Website redesign",
      description: "Design and program new company website.",
      hours: "52.0",
      rate: "$100.00",
      price: "$5,200.00",
    },
    {
      id: 3,
      title: "Business cards",
      description: 'Design and production of 3.5" x 2.0" business cards.',
      hours: "12.0",
      rate: "$100.00",
      price: "$1,200.00",
    },
    {
      id: 4,
      title: "T-shirt design",
      description: "Three t-shirt design concepts.",
      hours: "4.0",
      rate: "$100.00",
      price: "$400.00",
    },
  ],
};

const ClientInfoHeader = () => {
  const params = useSearchParams();
  const clientId = params.get("clientId");
  const { data: client } = useGetClientById(clientId as string);
  const [openChangeClientModal, setOpenChangeClientModal] = useState(false);
  if (!client?.data) {
    return <div>Client not found</div>;
  }
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        {/* <nav aria-label="Breadcrumb" className="flex">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div className="flex">
                <Link
                  href="/dashboard/clients"
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Clients
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRightIcon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-gray-400"
                />
                <a
                  href="#"
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {client?.data.name}
                </a>
              </div>
            </li>
          </ol>
        </nav> */}
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
};

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
                        defaultValue={clientId as string}
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
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
