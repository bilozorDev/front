"use client";
import { clients } from "@/app/db/schema";
import { useTransition } from "react";

import { deleteClient } from "@/app/dashboard/clients/actions";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  InformationCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function ClientCard({
  client,
}: {
  client: typeof clients.$inferSelect;
}) {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${client.name}?`)) {
      startTransition(async () => {
        const result = await deleteClient(client.id);

        if (result?.error) {
          alert(result.error);
        } else {
          router.refresh();
        }
      });
    }
  };
  return (
    <div
      key={client.email}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <img
          alt={client.name}
          src={
            client.name
              ? `https://placehold.co/400x400?text=${client.name?.[0].toUpperCase()}`
              : `https://placehold.co/400x400?text=C`
          }
          className="size-10 shrink-0 rounded-full bg-gray-300"
        />
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate capitalize text-sm font-medium text-gray-900">
              {client.name}
            </h3>
          </div>
          <p className="mt-1 truncate text-sm text-gray-500">
            {client.address}
          </p>
        </div>
        <Menu as="div" className="relative ml-auto">
          <MenuButton className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
          </MenuButton>
          <MenuItems
            transition
            className="absolute left-[50%] z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <MenuItem>
              <button
                className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                onClick={handleDelete}
              >
                Delete<span className="sr-only">, {client.name}</span>
              </button>
            </MenuItem>
            {/* <MenuItem>
              <a
                href="#"
                className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
              >
                Edit<span className="sr-only">, {client.name}</span>
              </a>
            </MenuItem> */}
          </MenuItems>
        </Menu>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <Link
              href={`/dashboard/clients/${client.id}`}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-indigo-50 hover:border-indigo-200"
            >
              <InformationCircleIcon
                aria-hidden="true"
                className="size-5 text-gray-400"
              />
              View client details
            </Link>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <Link
              href={`/dashboard/quotes/new?clientId=${client.id}`}
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-indigo-50 hover:border-indigo-200"
            >
              <PlusCircleIcon
                aria-hidden="true"
                className="size-5 text-gray-400"
              />
              Create quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
