import { Client } from "@/types/types.t";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";

export default function ClientCard({ client }: { client: Client }) {
  return (
    <div
      key={client.email}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate capitalize text-sm font-medium text-gray-900">
              {client.name}
            </h3>
          </div>
          <p className="mt-1 truncate text-sm text-gray-500">{client.email}</p>
        </div>
        <img
          alt=""
          src={`https://placehold.co/400x400?text=${client.name?.[0].toUpperCase()}`}
          className="size-10 shrink-0 rounded-full bg-gray-300"
        />
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <a
              href={`mailto:${client.email}`}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <EnvelopeIcon
                aria-hidden="true"
                className="size-5 text-gray-400"
              />
              Email
            </a>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <a
              href={`tel:${client.phone}`}
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <PhoneIcon aria-hidden="true" className="size-5 text-gray-400" />
              Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
