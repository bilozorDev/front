"use client";
import { Product, ProductCategory } from "@/types/types.t";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  BuildingOfficeIcon,
  ChevronRightIcon,
  ComputerDesktopIcon,
  CreditCardIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import {
  ProductWithCategory,
  useGetProductCategories,
  useGetProductsByProductCategoryID,
} from "@/queries/products/client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChartBarIcon,
  ChartPieIcon,
  TvIcon,
} from "@heroicons/react/24/outline";
import { Suspense, useState } from "react";
import PageHeaderWithAction from "@/components/PageHeaderWithAction";
import AddProductDrawer from "@/components/AddProductDrawer";

function isActiveTab(
  category: ProductCategory,
  currentCategory: string | null
): boolean {
  // If no category is selected (null or empty) and this is the "All" tab
  if ((!currentCategory || currentCategory === "") && category.id === "all") {
    return true;
  }

  // Otherwise, check if the tab's searchParam matches the current category
  return category.id === currentCategory;
}

// Create a client component for parts that use useSearchParams
function ProductsContent() {
  const categorySearchParam = useSearchParams().get("category");
  const params = new URLSearchParams(useSearchParams());
  const router = useRouter();
  const { data: products, error } = useGetProductsByProductCategoryID(
    categorySearchParam ?? "all"
  );

  if (error) {
    console.error(error);
  }

  return (
    <>
      <PageHeaderWithAction
        title="Products"
        action={() => {
          params.set("addProduct", "true");
          router.push(`/dashboard/products?${params.toString()}`);
        }}
        actionText="Add new product"
      />

      <Tabs categorySearchParam={categorySearchParam ?? ""} />

      {products?.length === 0 && <div>No products found</div>}

      <ul
        role="list"
        className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
      >
        {products?.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <AddProductDrawer />
    </>
  );
}

// Main component that wraps the client component with Suspense
export default function Products() {
  return (
    <div>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}

// Updated Tabs component with categorySearchParam as a prop
function Tabs({ categorySearchParam }: { categorySearchParam: string }) {
  const { data: productCategories, error } = useGetProductCategories();
  const router = useRouter();

  const handleTabChange = (category: ProductCategory) => {
    router.push(`/dashboard/products?category=${category.id}`);
  };

  if (error) {
    console.error(error);
  }

  if (productCategories?.length === 0) {
    return "No product categories found";
  }

  return (
    <div className="mb-5">
      <div className="grid grid-cols-1 sm:hidden">
        <select
          defaultValue="All"
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
        >
          {productCategories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
        />
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {/* All */}
            <button
              onClick={() =>
                handleTabChange({
                  id: "all",
                  name: "All",
                  slug: "all",
                  created_at: new Date().toISOString(),
                })
              }
              aria-current={
                isActiveTab(
                  {
                    id: "all",
                    name: "All",
                    slug: "all",
                    created_at: new Date().toISOString(),
                  },
                  categorySearchParam
                )
                  ? "page"
                  : undefined
              }
              className={classNames(
                isActiveTab(
                  {
                    id: "all",
                    name: "All",
                    slug: "all",
                    created_at: new Date().toISOString(),
                  },
                  categorySearchParam
                )
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                "group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium capitalize"
              )}
            >
              <CategoryIcon
                category={{
                  id: "all",
                  name: "All",
                  slug: "all",
                  created_at: new Date().toISOString(),
                }}
              />
              <span>All</span>
            </button>
            {productCategories?.map((category) => (
              <button
                key={category.id}
                onClick={() => handleTabChange(category)}
                aria-current={
                  isActiveTab(category, categorySearchParam)
                    ? "page"
                    : undefined
                }
                className={classNames(
                  isActiveTab(category, categorySearchParam)
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium capitalize"
                )}
              >
                <CategoryIcon category={category} />
                <span>{category.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

const CategoryIcon = ({ category }: { category: ProductCategory }) => {
  switch (category.slug) {
    case "all":
      return <BuildingOfficeIcon className="mr-2 size-5" />;
    case "computers-and-laptops":
      return <BuildingOfficeIcon className="mr-2 size-5" />;
    case "peripherals":
      return <UserIcon className="mr-2 size-5" />;
    case "networking":
      return <UserIcon className="mr-2 size-5" />;
    case "services":
      return <CreditCardIcon className="mr-2 size-5" />;
    default:
      return <UserIcon className="mr-2 size-5" />;
  }
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function ProductCard({ product }: { product: Product }) {
  const [viewDetails, setViewDetails] = useState(false);

  return (
    <>
      <div
        className={`relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 ${
          viewDetails ? "bg-gray-100" : ""
        }`}
      >
        <div className="flex min-w-0 gap-x-4">
          <ImageUrl product={product as ProductWithCategory} />
          <div className="min-w-0 flex-auto">
            <p className="text-sm/6 font-semibold text-gray-900">
              <button onClick={() => setViewDetails(!viewDetails)}>
                <span className="absolute inset-x-0 -top-px bottom-0" />
                {product.name}
              </button>
            </p>
            <p className="mt-1 flex text-xs/5 text-gray-500">
              {product.description}
            </p>
            <p className="mt-1 flex text-xs text-gray-500">
              {product.created_at}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-x-4">
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            <p className="text-sm/6 text-gray-900">{product.vendor}</p>
            <p
              className={`text-sm/6 ${
                product.qty && product.qty > 0
                  ? "text-gray-700"
                  : "text-red-500"
              }`}
            >
              {product.qty} in stock
            </p>
          </div>
          <ChevronRightIcon
            aria-hidden="true"
            className={`size-5 flex-none text-gray-400 transition-transform duration-300 ${
              viewDetails ? "rotate-90" : ""
            }`}
            onClick={() => setViewDetails(!viewDetails)}
          />
        </div>
      </div>
      {viewDetails && (
        <div className="px-4 py-5 sm:px-6">
          <div>
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Model</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {product.name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Vendor</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {product.vendor}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">
                  Description
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {product.description}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Cost</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  ${product.cost}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">
                  Stock Level
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {product.qty} in stock
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </>
  );
}

const ImageUrl = ({ product }: { product: ProductWithCategory }) => {
  if (!product.product_category) return product.image_url;
  if (product.product_category.slug === "computers-and-laptops") {
    return <ComputerDesktopIcon className="mr-2 size-5" />;
  }
  if (product.product_category.slug === "peripherals") {
    return <TvIcon className="mr-2 size-5" />;
  }
  if (product.product_category.slug === "networking") {
    return <ChartBarIcon className="mr-2 size-5" />;
  }
  if (product.product_category.slug === "services") {
    return <ChartPieIcon className="mr-2 size-5" />;
  }
  return <UserIcon className="mr-2 size-5" />;
};
