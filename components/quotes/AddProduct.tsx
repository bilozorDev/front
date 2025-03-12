"use client";

import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  XMarkIcon,
  PlusIcon,
  MinusCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import {
  ProductWithCategory,
  useGetProducts,
  useGetProductCategories,
} from "@/queries/products/client";
import Link from "next/link";
import { Product } from "@/types/types.t";
import useQuoteStore from "@/store/quote-store";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface AddProductProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const checkIfProductAdded = (product: Product, quoteProducts: Product[]) => {
  return quoteProducts.some((p) => p.id === product.id);
};

export default function AddProduct({ open, setOpen }: AddProductProps) {
  const [openCustomProduct, setOpenCustomProduct] = useState(false);
  const { data: products } = useGetProducts();
  const { data: productCategories } = useGetProductCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const filteredProducts = products?.filter(
    (product) =>
      product.product_category.name === selectedCategory ||
      selectedCategory === null
  );
  const { addProduct, quoteProducts, removeProduct } = useQuoteStore();
  const handleAddProduct = (product: Product) => {
    if (product.qty === 0) {
      confirm(
        "This product is out of stock. Do you want to add it to the quote?"
      );
    }

    addProduct({ ...product, qty: 1 });
  };
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <div className="fixed inset-0" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-3xl transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold text-gray-900">
                      Products{" "}
                      <button
                        className="text-sm font-medium text-gray-500 ml-5  border border-gray-300 rounded-md px-2 py-1 hover:border-indigo-500 hover:text-indigo-600"
                        onClick={() => setOpenCustomProduct(true)}
                      >
                        Add non-inventory product
                      </button>
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border-b border-gray-200">
                  <div className="px-6">
                    <nav className="-mb-px flex space-x-6">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={classNames(
                          selectedCategory === null
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                          "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
                        )}
                      >
                        All
                      </button>
                      {productCategories?.map((category) => (
                        <button
                          key={category.name}
                          onClick={() => setSelectedCategory(category.name)}
                          className={classNames(
                            selectedCategory === category.name
                              ? "border-indigo-500 text-indigo-600"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                            "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium capitalize"
                          )}
                        >
                          {category.name}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
                <ul
                  role="list"
                  className="flex-1 divide-y divide-gray-200 overflow-y-auto"
                >
                  {filteredProducts &&
                    filteredProducts?.map((product) => (
                      <li key={product.id} className="cursor-pointer ">
                        <div className="group relative flex items-center px-5 py-6">
                          <button
                            onClick={() => {
                              if (checkIfProductAdded(product, quoteProducts)) {
                                removeProduct(product);
                              } else {
                                handleAddProduct(product);
                              }
                            }}
                            className="flex items-center gap-x-2"
                          >
                            {checkIfProductAdded(product, quoteProducts) ? (
                              <MinusCircleIcon className="size-5 text-red-500" />
                            ) : (
                              <PlusIcon className="size-5 text-gray-400" />
                            )}
                          </button>
                          <div className="-m-1 block flex-1 p-1">
                            <div className="relative flex min-w-0 flex-1 items-center">
                              <span className="relative inline-block shrink-0">
                                {/* <img alt="" src={product.imageUrl} className="size-10 rounded-full" /> */}
                              </span>
                              <div className="ml-4 truncate">
                                <div className="flex items-center gap-x-2">
                                  <p className="truncate text-sm font-medium text-gray-900">
                                    {product.name}
                                  </p>
                                  {inStock(product)}
                                </div>
                                <p className="text-sm font-medium text-indigo-600">
                                  $ {product.price_to_client}
                                </p>
                                <p className="truncate text-sm text-gray-500 capitalize">
                                  {product.description}
                                </p>
                              </div>
                            </div>
                          </div>
                          <Menu
                            as="div"
                            className="relative ml-2 inline-block shrink-0 text-left"
                          >
                            <MenuButton className="group relative inline-flex size-8 items-center justify-center rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open options menu</span>
                              <span className="flex size-full items-center justify-center rounded-full">
                                <EllipsisVerticalIcon
                                  aria-hidden="true"
                                  className="size-5 text-gray-400 group-hover:text-gray-500"
                                />
                              </span>
                            </MenuButton>
                            <MenuItems
                              transition
                              className="absolute right-9 top-0 z-10 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                              <div className="py-1">
                                <MenuItem>
                                  <Link
                                    href={`/products/${product.id}`}
                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                  >
                                    Product details
                                  </Link>
                                </MenuItem>
                                <MenuItem>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                  >
                                    Send message
                                  </a>
                                </MenuItem>
                              </div>
                            </MenuItems>
                          </Menu>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
      <AddCustomProduct
        open={openCustomProduct}
        setOpen={setOpenCustomProduct}
      />
    </Dialog>
  );
}

const inStock = (product: ProductWithCategory) => {
  if (product.product_category.name === "services") {
    return (
      <>
        <span className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600">
          Services
        </span>
      </>
    );
  }
  if (product.qty && product.qty > 0) {
    return (
      <>
        <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700">
          <svg
            viewBox="0 0 6 6"
            aria-hidden="true"
            className="size-1.5 fill-green-500"
          >
            <circle r={3} cx={3} cy={3} />
          </svg>
          {product.qty} in stock
        </span>
      </>
    );
  } else {
    return (
      <>
        <span className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600">
          Out of stock
        </span>
      </>
    );
  }
};

interface AddCustomProductProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function AddCustomProduct({ open, setOpen }: AddCustomProductProps) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <div className="fixed inset-0" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-3xl transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <ArrowLeftIcon
                      className="size-5 text-gray-400 cursor-pointer"
                      onClick={() => setOpen(false)}
                    />
                    <DialogTitle className="text-base  font-semibold text-gray-900">
                      Add non-inventory product
                    </DialogTitle>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
