"use client";
import { getProductsServer } from "@/queries/products/server";
import { Product } from "@/types/types.t";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  BuildingOfficeIcon,
  CreditCardIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import { useGetAllProducts } from "@/queries/products/client";
import { useRouter, useSearchParams } from "next/navigation";

interface Tab {
  name: string;
  searchParam: string;
  icon: React.ElementType;
}

const tabs: Tab[] = [
  { name: "All", searchParam: "all", icon: UserIcon },
  {
    name: "Computers and laptops",
    searchParam: "computers-and-laptops",
    icon: BuildingOfficeIcon,
  },
  { name: "Peripherals", searchParam: "peripherals", icon: UsersIcon },
  { name: "Networking", searchParam: "networking", icon: UsersIcon },
  { name: "Services", searchParam: "services", icon: CreditCardIcon },
  { name: "Other", searchParam: "other", icon: CreditCardIcon },
];

function transformApiDataToTableFormat(apiData: Product[]): {
  categoryName: string;
  products: Product[];
}[] {
  // Group products by category
  const groupedByCategory: { [category: string]: Product[] } = {};

  // Iterate through all products
  apiData.forEach((product) => {
    const category = product.category;

    // Initialize category array if it doesn't exist
    if (!groupedByCategory[category ?? ""]) {
      groupedByCategory[category ?? ""] = [];
    }

    // Add product to its category group
    groupedByCategory[category ?? ""].push(product);
  });

  // Convert the grouped object into the expected array format
  const tableData = Object.keys(groupedByCategory).map((categoryName) => ({
    categoryName,
    products: groupedByCategory[categoryName],
  }));

  // Sort categories alphabetically
  return tableData.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
}

function isActiveTab(tab: Tab, currentCategory: string | null): boolean {
  // If no category is selected (null or empty) and this is the "All" tab
  if (
    (!currentCategory || currentCategory === "") &&
    tab.searchParam === "all"
  ) {
    return true;
  }

  // Otherwise, check if the tab's searchParam matches the current category
  return tab.searchParam === currentCategory;
}

export default function Products() {
  const { data, error } = useGetAllProducts();
  if (error) {
    console.error(error);
  }
  console.log(data);
  if (data?.length === 0) {
    return <div>No products found</div>;
  }
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleTabChange = (tab: Tab) => {
    router.push(`/dashboard/products?category=${tab.searchParam}`);
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="mb-5">
        <div className="grid grid-cols-1 sm:hidden">
          <select
            defaultValue={tabs[0].searchParam}
            aria-label="Select a tab"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          >
            {tabs.map((tab) => (
              <option key={tab.name} value={tab.searchParam}>
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
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => handleTabChange(tab)}
                  aria-current={
                    isActiveTab(tab, searchParams.get("category"))
                      ? "page"
                      : undefined
                  }
                  className={classNames(
                    isActiveTab(tab, searchParams.get("category"))
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium"
                  )}
                >
                  <tab.icon
                    aria-hidden="true"
                    className={classNames(
                      isActiveTab(tab, searchParams.get("category"))
                        ? "text-indigo-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "-ml-0.5 mr-2 size-5"
                    )}
                  />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* <ProductsTable data={data ?? []} /> */}
    </div>
  );
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// export function ProductsTable({ data }: { data: Product[] }) {
//   const tableData = transformApiDataToTableFormat(data);
//   return (
//     <div className="px-4 sm:px-6 lg:px-8">
//       <div className="sm:flex sm:items-center">
//         <div className="sm:flex-auto">
//           <h1 className="text-base font-semibold text-gray-900">Users</h1>
//           <p className="mt-2 text-sm text-gray-700">
//             A list of all the users in your account including their name, title,
//             email and role.
//           </p>
//         </div>
//         <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
//           <button
//             type="button"
//             className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             Add user
//           </button>
//         </div>
//       </div>
//       <div className="mt-8 flow-root">
//         <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//           <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
//             <table className="min-w-full">
//               <thead className="bg-white">
//                 <tr>
//                   <th
//                     scope="col"
//                     className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
//                   >
//                     Name
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//                   >
//                     Title
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//                   >
//                     Email
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//                   >
//                     Role
//                   </th>
//                   <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
//                     <span className="sr-only">Edit</span>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 {tableData.map((location) => (
//                   <Fragment key={location.categoryName}>
//                     <tr className="border-t border-gray-200">
//                       <th
//                         scope="colgroup"
//                         colSpan={5}
//                         className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
//                       >
//                         {location.categoryName}
//                       </th>
//                     </tr>
//                     {location.products.map((product, productIdx) => (
//                       <tr
//                         key={product.id}
//                         className={classNames(
//                           productIdx === 0
//                             ? "border-gray-300"
//                             : "border-gray-200",
//                           "border-t"
//                         )}
//                       >
//                         <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
//                           {product.name}
//                         </td>
//                         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                           {product.description}
//                         </td>
//                         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                           {product.cost}
//                         </td>
//                         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                           {product.category}
//                         </td>
//                         <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
//                           <a
//                             href="#"
//                             className="text-indigo-600 hover:text-indigo-900"
//                           >
//                             Edit
//                             <span className="sr-only">, {product.name}</span>
//                           </a>
//                         </td>
//                       </tr>
//                     ))}
//                   </Fragment>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
