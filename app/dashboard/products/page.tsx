"use client";
import { ProductCategory } from "@/types/types.t";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  BuildingOfficeIcon,
  CreditCardIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import {
  useGetProductCategories,
  useGetProductsByProductCategoryID,
} from "@/queries/products/client";
import { useRouter, useSearchParams } from "next/navigation";

interface Tab {
  name: string;
  searchParam: string;
  icon: React.ElementType;
}

function isActiveTab(
  category: ProductCategory,
  currentCategory: string | null
): boolean {
  // If no category is selected (null or empty) and this is the "All" tab
  if ((!currentCategory || currentCategory === "") && category.slug === "all") {
    return true;
  }

  // Otherwise, check if the tab's searchParam matches the current category
  return category.slug === currentCategory;
}

export default function Products() {
  const categorySearchParam = useSearchParams().get("category");
  const { data: products, error } =
    useGetProductsByProductCategoryID(categorySearchParam ?? "all");
  if (error) {
    console.error(error);
  }
  console.log(products);
  return (
    <div>
      <h1>Products</h1>
      <Tabs />
      {/* {data?.length === 0 && <div>No products found</div>} */}
      {/* <ProductsTable data={data ?? []} /> */}
    </div>
  );
}

function Tabs() {
  const { data: productCategories, error } = useGetProductCategories();
  const router = useRouter();
  const categorySearchParam = useSearchParams().get("category");
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
