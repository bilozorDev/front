"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useQueryParamsToggle } from "@/hooks/useQueryParamsToggle";
import { useForm } from "@tanstack/react-form";
import {
  useCreateProduct,
  useGetProductCategories,
} from "@/queries/products/client";
import { useSearchParams } from "next/navigation";
import { ProductInsert } from "@/types/types.t";

export default function AddProductDrawer() {
  const categorySearchParam = useSearchParams().get("category");
  const { data: productCategories } = useGetProductCategories();
  const { isActive, handleToggle } = useQueryParamsToggle({
    paramsName: "addProduct",
  });
  const { mutate: createProduct  } = useCreateProduct();
  const form = useForm({
    defaultValues: {
      category_id: categorySearchParam ?? "",
      name: "Dell XPS 13",
      vendor: "Dell",
      cost: 1000.99,
      price_to_client: 1200.99,
      qty: 1,
      link_to_product: "www.dell.com",
      description: "Dell XPS 13 laptop",
    } as ProductInsert,
    onSubmit: async ({ value }) => {
      createProduct(value, {
        onSuccess: () => {
          handleToggle();
          form.reset();
        },
        onError: (error) => {
          throw new Error(error.message);
        },
      });
    },
  });
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
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
              >
                <div className="h-0 flex-1 overflow-y-auto">
                  <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-base font-semibold text-white">
                        New Product
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
                        create your new product.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="divide-y divide-gray-200 px-4 sm:px-6">
                      <div className="space-y-6 pb-5 pt-6">
                        <form.Field name="category_id">
                          {({ state, handleChange, handleBlur }) => (
                            <div>
                              <label
                                htmlFor="location"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Category
                              </label>
                              <div className="mt-2 grid grid-cols-1">
                                <select
                                  id="category"
                                  value={state.value}
                                  onChange={(e) => handleChange(e.target.value)}
                                  onBlur={handleBlur}
                                  name="category_id"
                                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                  {productCategories?.map((category) => (
                                    <option
                                      key={category.id}
                                      value={category.id}
                                    >
                                      {category.name.charAt(0).toUpperCase() +
                                        category.name.slice(1)}
                                    </option>
                                  ))}
                                </select>
                                <ChevronDownIcon
                                  aria-hidden="true"
                                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                />
                              </div>
                            </div>
                          )}
                        </form.Field>

                        <form.Field name="vendor">
                          {({ state, handleChange, handleBlur }) => (
                            <div>
                              <label
                                htmlFor="vendor"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Vendor
                              </label>
                              <div className="mt-2">
                                <input
                                  id="vendor"
                                  name="vendor"
                                  value={state.value ?? ""}
                                  onChange={(e) => handleChange(e.target.value)}
                                  onBlur={handleBlur}
                                  type="text"
                                  placeholder="Vendor Name"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              </div>
                            </div>
                          )}
                        </form.Field>
                        <form.Field name="name">
                          {({ state, handleChange, handleBlur }) => (
                            <div>
                              <label
                                htmlFor="name"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Name
                              </label>
                              <div className="mt-2">
                                <input
                                  id="name"
                                  value={state.value}
                                  onChange={(e) => handleChange(e.target.value)}
                                  onBlur={handleBlur}
                                  name="name"
                                  type="text"
                                  placeholder="Product Name"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              </div>
                            </div>
                          )}
                        </form.Field>
                        <form.Field name="cost">
                          {({ state, handleChange, handleBlur }) => (
                            <div>
                              <label
                                htmlFor="cost"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Cost
                              </label>
                              <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white px-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                  <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                                    $
                                  </div>
                                  <input
                                    id="cost"
                                    value={state.value ?? ""}
                                    onChange={(e) =>
                                      handleChange(parseFloat(e.target.value))
                                    }
                                    onBlur={handleBlur}
                                    name="cost"
                                    type="number"
                                    placeholder="0.00"
                                    aria-describedby="cost-currency"
                                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                  />
                                  <div
                                    id="cost-currency"
                                    className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"
                                  >
                                    USD
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </form.Field>
                        <form.Field name="price_to_client">
                          {({ state, handleChange, handleBlur }) => (
                            <div>
                              <label
                                htmlFor="price-to-client"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Price to clients
                              </label>
                              <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white px-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                  <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                                    $
                                  </div>
                                  <input
                                    id="price-to-client"
                                    name="price-to-client"
                                    value={state.value ?? ""}
                                    onChange={(e) =>
                                      handleChange(parseFloat(e.target.value))
                                    }
                                    onBlur={handleBlur}
                                    type="number"
                                    placeholder="0.00"
                                    aria-describedby="price-to-client-currency"
                                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                  />
                                  <div
                                    id="price-to-client-currency"
                                    className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"
                                  >
                                    USD
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </form.Field>

                        <form.Field name="qty">
                          {({ state, handleChange, handleBlur }) => (
                            <div>
                              <label
                                htmlFor="quantity"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Quantity
                              </label>
                              <div className="mt-2">
                                <input
                                  id="quantity"
                                  name="quantity"
                                  value={state.value ?? ""}
                                  onChange={(e) =>
                                    handleChange(Number(e.target.value))
                                  }
                                  onBlur={handleBlur}
                                  type="number"
                                  placeholder="0"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              </div>
                            </div>
                          )}
                        </form.Field>

                        <form.Field name="link_to_product">
                          {({ state, handleChange, handleBlur }) => (
                            <div>
                              <label
                                htmlFor="link-to-product"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Link to product
                              </label>
                              <div className="mt-2 flex">
                                <div className="flex shrink-0 items-center rounded-l-md bg-white px-3 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 sm:text-sm/6">
                                  https://
                                </div>
                                <input
                                  id="link-to-product"
                                  name="link-to-product"
                                  value={state.value ?? ""}
                                  onChange={(e) => handleChange(e.target.value)}
                                  onBlur={handleBlur}
                                  type="text"
                                  placeholder="www.dell.com"
                                  className="-ml-px block w-full grow rounded-r-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              </div>
                            </div>
                          )}
                        </form.Field>
                        <form.Field name="description">
                          {({ state, handleChange, handleBlur }) => (
                            <div>
                              <label
                                htmlFor="description"
                                className="block text-sm/6 font-medium text-gray-900"
                              >
                                Description
                              </label>
                              <div className="mt-2">
                                <textarea
                                  id="description"
                                  name="description"
                                  rows={4}
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                  value={state.value ?? ""}
                                  onChange={(e) => handleChange(e.target.value)}
                                  onBlur={handleBlur}
                                />
                              </div>
                            </div>
                          )}
                        </form.Field>
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
                  <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                    {([canSubmit, isSubmitting]) => (
                      <button
                        type="submit"
                        disabled={!canSubmit || isSubmitting}
                        className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {isSubmitting ? "..." : "Add"}
                      </button>
                    )}
                  </form.Subscribe>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
