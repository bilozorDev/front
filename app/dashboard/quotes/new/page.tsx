"use client";
import { useGetClientById } from "@/queries/clients/queries";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronRightIcon,
  EllipsisVerticalIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import Link from "next/dist/client/link";
import { useParams, useSearchParams } from "next/navigation";
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
          <button className="text-sm font-medium text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md px-2 py-1">
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
    </div>
  );
};
