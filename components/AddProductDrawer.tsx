"use client";

import { addProduct } from "@/app/dashboard/products/actions";
import { Product, ProductCategory, ProductSubcategory } from "@/app/db/schema";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useTransition } from "react";

const initialFormState = {
  name: "",
  description: "",
  price: "",
  category_id: "",
  cost: "",
  qty: "",
  subcategory_id: "",
} as Product;

export default function AddProductDrawer({
  openAddProductDrawer,
  setOpenAddProductDrawer,
  onProductAdded,
  productCategories,
  productSubcategories,
}: {
  openAddProductDrawer: boolean;
  setOpenAddProductDrawer: (open: boolean) => void;
  onProductAdded: () => void;
  productCategories: ProductCategory[];
  productSubcategories: ProductSubcategory[];
}) {
  const [isPending, startTransition] = useTransition();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      addProduct(formData).then((result) => {
        if (result.error) {
          // Handle error
          alert(result.error);
        } else {
          onProductAdded();
        }
      });
    });
  }
  const filteredSubcategories = productSubcategories.filter(
    (subcategory) => subcategory.category_id === selectedCategory,
  );
  return (
    <Dialog
      open={openAddProductDrawer}
      onClose={() => setOpenAddProductDrawer(false)}
      className="relative z-50"
    >
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
                        New Product
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpenAddProductDrawer(false)}
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
                        <div>
                          <label
                            htmlFor="project-name"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Product name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              defaultValue={initialFormState.name}
                              name="name"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <div>
                          <div className="mt-2">
                            <label
                              htmlFor="product-description"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Description
                            </label>
                            <textarea
                              defaultValue={initialFormState.description || ""}
                              name="description"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="product-cost"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Cost
                          </label>
                          <div className="mt-2">
                            <input
                              defaultValue={initialFormState.cost}
                              name="cost"
                              type="number"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="product-price"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Price
                          </label>
                          <div className="mt-2">
                            <input
                              defaultValue={initialFormState.price}
                              name="price"
                              type="tel"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="product-qty"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Quantity
                          </label>
                          <div className="mt-2">
                            <input
                              defaultValue={initialFormState.qty}
                              name="qty"
                              type="number"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="product-category"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Category
                          </label>
                          <div className="mt-2">
                            <select
                              name="category_id"
                              onChange={(e) =>
                                setSelectedCategory(e.target.value)
                              }
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            >
                              <option value="">Select a category</option>
                              {productCategories.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="product-subcategory"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Subcategory
                          </label>
                          <div className="mt-2">
                            <select
                              name="subcategory_id"
                              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            >
                              <option value="">
                                {selectedCategory
                                  ? "Select a subcategory"
                                  : "Select a category first"}{" "}
                              </option>
                              {filteredSubcategories.map((subcategory) => (
                                <option
                                  key={subcategory.id}
                                  value={subcategory.id}
                                >
                                  {subcategory.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 justify-end px-4 py-4">
                  <button
                    type="button"
                    onClick={() => setOpenAddProductDrawer(false)}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {isPending ? "Adding..." : "Add"}
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
