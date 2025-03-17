"use client";
import { ProductCategory, productsCategories, products as productsTable, ProductSubcategory } from "@/app/db/schema";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import AddProductDrawer from "./AddProductDrawer";
import AddSampleProductsButton from "./AddSampleProductsButton";
import PageHeaderWithAction from "./PageHeaderWithAction";

const ProductsList = ({
  products,
  productCategories,
  productSubcategories,
}: {
  products: (typeof productsTable.$inferSelect & {
    category_slug: string | null;
  })[];
  productCategories: ProductCategory[];
  productSubcategories: ProductSubcategory[];
}) => {
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const currentCategory = useSearchParams().get("category");
  // Function to refresh data by triggering a router refresh
  const refreshData = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  // Function to close modal and refresh data
  const handleProductAdded = () => {
    setOpenAddProductModal(false);
    refreshData();
  };

  const filteredProducts = useMemo(() => {
    if (currentCategory === "all" || !currentCategory) {
      return products;
    }
    return products.filter(
      (product) => product.category_slug === currentCategory,
    );
  }, [products, currentCategory]);
  return (
    <div>
      <PageHeaderWithAction
        title="Products"
        action={() => setOpenAddProductModal(true)}
        actionText="Add product"
      />
      {productCategories.length > 0 && <Tabs tabs={productCategories} />}
      <AddProductDrawer
        openAddProductDrawer={openAddProductModal}
        setOpenAddProductDrawer={setOpenAddProductModal}
        onProductAdded={handleProductAdded}
        productCategories={productCategories}
        productSubcategories={productSubcategories}
      />
      <div className="mt-4">
        {isPending ? (
          <div className="text-gray-500">Refreshing...</div>
        ) : filteredProducts.length === 0 ? (
          <div>
            No products found
            <AddSampleProductsButton />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div key={product.id}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>{product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Tabs({
  tabs,
}: {
  tabs: (typeof productsCategories.$inferSelect)[];
}) {
  const currentCategory = useSearchParams().get("category");
  const router = useRouter();
  const handleSelectChange = (newCategory: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("category", newCategory);
    router.push(`/dashboard/products?${params.toString()}`);
  };
  return (
    <div>
      <div className="grid grid-cols-1 sm:hidden">
        <select
          defaultValue={currentCategory ?? "All"}
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
        >
          <option value="all">All</option>
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.slug}>
              {tab.name}
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
            <button
              onClick={() => handleSelectChange("all")}
              aria-current={currentCategory === "all" ? "page" : undefined}
              className={classNames(
                currentCategory === "all" || currentCategory === null
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700",
                "flex whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium",
              )}
            >
              All
            </button>

            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleSelectChange(tab.slug)}
                aria-current={tab.slug === currentCategory ? "page" : undefined}
                className={classNames(
                  tab.slug === currentCategory
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700",
                  "flex whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium",
                )}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
