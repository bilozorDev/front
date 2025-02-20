"use client";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  DialogBackdrop,
} from "@headlessui/react";
import { useDebounce } from "@uidotdev/usehooks";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { UsersIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formatPrice } from "@/utils/formatPrice";
import { supabase } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
interface Product {
  id: string;
  vendor_id: string;
  name: string;
  model: string;
  description: string;
  price: number;
  product_url: string;
  image_url: string;
  image_urls: string[];
  availability: string;
  specs: Record<string, unknown>;
  last_updated: string;
  created_at: string;
  category_id: string;
  specs_image_url: string | null;
}

// get products from supabase or give error
async function getProducts(search: string) {
  const { data, error } = await supabase.rpc("search_products_by_name_prefix", {
    prefix: search,
  });
  if (error) {
    console.error(error);
    throw error;
  }
  return data;
}

function useProductsSearch(search: string) {
  return useQuery({
    queryKey: ["products", search],
    queryFn: () => getProducts(search),
    enabled: !!search,
  });
}

const recent = [];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AddProductSearch({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const { data, status, isLoading } = useProductsSearch(debouncedQuery);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const handleManualAddProduct = () => {
    setOpen(false);
    router.push(
      pathname + "?" + createQueryString("addProductManually", "true")
    );
  };
  const filteredPeople =
    query === ""
      ? []
      : data?.filter((product) => {
          return product.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Dialog
      className="relative z-50"
      as="div"
      open={open}
      onClose={() => {
        setOpen(false);
        setQuery("");
      }}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 z-10 bg-gray-500/25 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
        <DialogPanel
          transition
          className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <Combobox as="div">
            {({ activeOption }) => (
              <>
                <div className="grid grid-cols-1">
                  <ComboboxInput
                    autoFocus
                    className="col-start-1 row-start-1 h-12 w-full pl-11 pr-4 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm"
                    placeholder="Start typing to search..."
                    onChange={(event) => setQuery(event.target.value)}
                    onBlur={() => setQuery("")}
                  />
                  <MagnifyingGlassIcon
                    className="pointer-events-none col-start-1 row-start-1 ml-4 size-5 self-center text-gray-400"
                    aria-hidden="true"
                  />
                </div>

                {(query === "" || filteredPeople?.length > 0) && (
                  <ComboboxOptions
                    as="div"
                    static
                    hold
                    className="flex transform-gpu divide-x divide-gray-100"
                  >
                    <div
                      className={classNames(
                        "max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4",
                        (activeOption as Product) ? "sm:h-96" : ""
                      )}
                    >
                      {query === "" && (
                        <h2 className="mb-4 mt-2 text-xs font-semibold text-gray-500">
                          Recent searches
                        </h2>
                      )}
                      <div className="-mx-2 text-sm text-gray-700">
                        {(query === "" ? recent : filteredPeople).map(
                          (product) => (
                            <ComboboxOption
                              as="div"
                              key={product.id}
                              value={product}
                              className="group flex cursor-default select-none items-center rounded-md p-2 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            >
                              <img
                                src={product.image_url}
                                alt=""
                                className="size-6 flex-none rounded-full"
                              />
                              <span className="ml-3 flex-auto truncate">
                                {product.name}
                              </span>
                              <ChevronRightIcon
                                className="ml-3 hidden size-5 flex-none text-gray-400 group-data-[focus]:block"
                                aria-hidden="true"
                              />
                            </ComboboxOption>
                          )
                        )}
                      </div>
                    </div>

                    {(activeOption as Product) ? (
                      <>
                        <div className="hidden w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                          <div className="flex-none p-6 text-center">
                            <img
                              src={(activeOption as Product).image_url}
                              alt={(activeOption as Product).name}
                              className="mx-auto h-48 w-auto"
                            />
                            <h2 className="mt-3 font-semibold text-gray-900">
                              {(activeOption as Product).name}
                            </h2>
                            <p className="text-sm/6 text-gray-500">
                              {(activeOption as Product).model}
                            </p>
                          </div>
                          <div className="flex flex-auto flex-col justify-between p-6">
                            <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                              <dt className="col-end-1 font-semibold text-gray-900">
                                Manufacturer
                              </dt>
                              <dd className="truncate">
                                {(activeOption as Product).vendor_id}
                              </dd>
                              <dt className="col-end-1 font-semibold text-gray-900">
                                Price
                              </dt>
                              <dd>
                                {formatPrice((activeOption as Product).price)}
                              </dd>
                              <dt className="col-end-1 font-semibold text-gray-900">
                                URL
                              </dt>
                              <dd className="truncate">
                                <a
                                  href={(activeOption as Product).product_url}
                                  className="text-indigo-600 underline"
                                >
                                  {(activeOption as Product).product_url}
                                </a>
                              </dd>
                              <dt className="col-end-1 font-semibold text-gray-900">
                                Availability
                              </dt>
                              <dd className="truncate">
                                {(activeOption as Product).availability}
                              </dd>
                            </dl>
                            <button
                              type="button"
                              className="mt-6 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Add product
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="px-6 py-14 text-center text-sm sm:px-14">
                        <UsersIcon
                          className="mx-auto size-6 text-gray-400"
                          aria-hidden="true"
                        />
                        <p className="mt-4 font-semibold text-gray-900">
                          Start typing to search ...
                        </p>
                        <p className="mt-2 text-gray-500">
                          You can search our database or add the product
                          manually.
                        </p>
                        <button
                          type="button"
                          onClick={handleManualAddProduct}
                          className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Add product manually
                        </button>
                      </div>
                    )}
                  </ComboboxOptions>
                )}

                {query !== "" && filteredPeople?.length === 0 && (
                  <div className="px-6 py-14 text-center text-sm sm:px-14">
                    <UsersIcon
                      className="mx-auto size-6 text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="mt-4 font-semibold text-gray-900">
                      No products foundsss
                    </p>
                    <p className="mt-2 text-gray-500">
                      We couldn’t find anything with that term. Please try
                      again. or add the product manually.
                    </p>
                    <button
                      type="button"
                      className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => alert("test")}
                    >
                      Add product manually
                    </button>
                  </div>
                )}
              </>
            )}
          </Combobox>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
