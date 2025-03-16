import { getProductCategories, getProducts } from "@/app/db/queries";
import { productsCategories } from "@/app/db/schema";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentCategory = (searchParams.category as string) || "All";
  const products = await getProducts();
  const productCategories = await getProductCategories();
  console.log(products);
  console.log(productCategories);
  return (
    <div>
      <Tabs
        productCategories={productCategories}
        currentCategory={currentCategory}
      />
    </div>
  );
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Tabs = ({
  productCategories,
  currentCategory,
}: {
  productCategories: (typeof productsCategories.$inferSelect)[];
  currentCategory: string;
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:hidden">
        <select
          defaultValue={"All"}
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
        >
          {productCategories.map((category) => (
            <option key={category.name}>{category.name}</option>
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
            <Link
              href={`/dashboard/products?category=All`}
              aria-current={currentCategory === "All" ? "page" : undefined}
              className={classNames(
                currentCategory === "All"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium",
              )}
            >
              All
            </Link>
            {productCategories.map((category) => (
              <Link
                key={category.name}
                href={`/dashboard/products?category=${category.name}`}
                className={classNames(
                  currentCategory === category.name
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium",
                )}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
