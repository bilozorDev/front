import { clients } from "@/app/db/schema";
import {
  InformationCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
export default function ClientCard({
  client,
}: {
  client: typeof clients.$inferSelect;
}) {
  return (
    <div
      key={client.email}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <img
          alt=""
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
