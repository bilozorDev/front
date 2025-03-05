// "use client";

// import {
//   Combobox,
//   ComboboxInput,
//   Dialog,
//   DialogPanel,
//   DialogBackdrop,
// } from "@headlessui/react";
// import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
// import { useCallback, useState } from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// // import { useFuzzyProductSearch } from "@/queries/fuzzyProductSearch";
// import { Product } from "@/types/types.t";
// import useQuoteStore from "@/store/quote-store";
// const recent: Product[] = [];

// export default function AddProductSearch({
//   open,
//   setOpen,
// }: {
//   open: boolean;
//   setOpen: (open: boolean) => void;
// }) {
//   const [query, setQuery] = useState("");
//   // const debouncedQuery = useDebounce(query, 300);
//   // const { data, isLoading } = useFuzzyProductSearch(debouncedQuery);
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const createQueryString = useCallback(
//     (name: string, value: string) => {
//       const params = new URLSearchParams(searchParams.toString());
//       params.set(name, value);
//       return params.toString();
//     },
//     [searchParams]
//   );

//   const handleManualAddProduct = useCallback(() => {
//     setOpen(false);
//     router.push(
//       pathname + "?" + createQueryString("addProductManually", "true")
//     );
//   }, [setOpen, router, pathname, createQueryString]);

//   const { addProduct, quote } = useQuoteStore();

//   return (
//     <Dialog
//       className="relative z-50"
//       as="div"
//       open={open}
//       onClose={() => {
//         setOpen(false);
//         setQuery("");
//       }}
//     >
//       <DialogBackdrop
//         transition
//         className="fixed inset-0 z-10 bg-gray-500/25 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
//       />

//       <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
//         <DialogPanel
//           transition
//           className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
//         >
//           <Combobox as="div">
//             {({ activeOption }) => (
//               <>
//                 <div className="grid grid-cols-1">
//                   <ComboboxInput
//                     autoFocus
//                     className="col-start-1 row-start-1 h-12 w-full pl-11 pr-4 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm"
//                     placeholder="Start typing to search..."
//                     onChange={(event) => setQuery(event.target.value)}
//                     onBlur={() => setQuery("")}
//                   />
//                   <MagnifyingGlassIcon
//                     className="pointer-events-none col-start-1 row-start-1 ml-4 size-5 self-center text-gray-400"
//                     aria-hidden="true"
//                   />
//                 </div>

//                 {/* {isLoading ? (
//                   <LoadingProductSkeleton />
//                 ) : (
//                   (query === "" || (data && data.length > 0)) && (
//                     <ComboboxOptions
//                       as="div"
//                       static
//                       hold
//                       className="flex transform-gpu divide-x divide-gray-100"
//                     >
//                       <div
//                         className={classNames(
//                           "max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4",
//                           (activeOption as Product) ? "sm:h-96" : ""
//                         )}
//                       >
//                         {query === "" && (
//                           <h2 className="mb-4 mt-2 text-xs font-semibold text-gray-500">
//                             Recent searches
//                           </h2>
//                         )}
//                         <div className="-mx-2 text-sm text-gray-700">
//                           {(query === "" ? recent : data)?.map((product) => (
//                             <ComboboxOption
//                               as="div"
//                               key={product.id}
//                               value={product}
//                               className="group flex cursor-default select-none items-center rounded-md p-2 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
//                             >
//                               <span className="ml-3 flex-auto truncate">
//                                 {product.name}
//                               </span>
//                               <ChevronRightIcon
//                                 className="ml-3 hidden size-5 flex-none text-gray-400 group-data-[focus]:block"
//                                 aria-hidden="true"
//                               />
//                             </ComboboxOption>
//                           ))}
//                         </div>
//                       </div>

//                       {(activeOption as Product) ? (
//                         <>
//                           <div className="hidden w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
//                             <div className="flex-none p-6 text-center">
//                               <img
//                                 src={(activeOption as Product).image_url}
//                                 alt={(activeOption as Product).name}
//                                 className="mx-auto h-48 w-auto"
//                               />
//                               <h2 className="mt-3 font-semibold text-gray-900">
//                                 {(activeOption as Product).name}
//                               </h2>
//                               <p className="text-sm/6 text-gray-500">
//                                 {(activeOption as Product).model}
//                               </p>
//                             </div>
//                             <div className="flex flex-auto flex-col justify-between p-6">
//                               <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
//                                 <dt className="col-end-1 font-semibold text-gray-900">
//                                   Manufacturer
//                                 </dt>
//                                 <dd className="truncate">
//                                   {(activeOption as Product).vendor_id}
//                                 </dd>
//                                 <dt className="col-end-1 font-semibold text-gray-900">
//                                   Price
//                                 </dt>
//                                 <dd>
//                                   {formatPrice((activeOption as Product).price)}
//                                 </dd>
//                                 <dt className="col-end-1 font-semibold text-gray-900">
//                                   URL
//                                 </dt>
//                                 <dd className="truncate">
//                                   <a
//                                     href={(activeOption as Product).product_url}
//                                     className="text-indigo-600 underline"
//                                   >
//                                     {(activeOption as Product).product_url}
//                                   </a>
//                                 </dd>
//                                 <dt className="col-end-1 font-semibold text-gray-900">
//                                   Availability
//                                 </dt>
//                                 <dd className="truncate">
//                                   {(activeOption as Product).availability}
//                                 </dd>
//                               </dl>
//                               <button
//                                 type="button"
//                                 className="mt-6 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                                 onClick={() =>
//                                   addProduct({
//                                     ...(activeOption as Product),
//                                     quantity: 1,
//                                     total:
//                                       (activeOption as Product).price *
//                                       quote.markup,
//                                   })
//                                 }
//                               >
//                                 Add product
//                               </button>
//                             </div>
//                           </div>
//                         </>
//                       ) : (
//                         <div className="px-6 py-14 text-center text-sm sm:px-14">
//                           <ExclamationCircleIcon
//                             className="mx-auto size-6 text-gray-400"
//                             aria-hidden="true"
//                           />
//                           <p className="mt-4 font-semibold text-gray-900">
//                             Start typing to search ...
//                           </p>
//                           <p className="mt-2 text-gray-500">
//                             You can search our database or add the product
//                             manually.
//                           </p>
//                           <button
//                             type="button"
//                             onClick={handleManualAddProduct}
//                             className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                           >
//                             Add product manually
//                           </button>
//                         </div>
//                       )}
//                     </ComboboxOptions>
//                   )
//                 )}

//                 {query !== "" && !isLoading && data?.length === 0 && (
//                   <div className="px-6 py-14 text-center text-sm sm:px-14">
//                     <ExclamationCircleIcon
//                       className="mx-auto size-6 text-gray-400"
//                       aria-hidden="true"
//                     />
//                     <p className="mt-4 font-semibold text-gray-900">
//                       No products found
//                     </p>
//                     <p className="mt-2 text-gray-500">
//                       We couldn&apos;t find anything with that term. Please try
//                       again or add the product manually.
//                     </p>
//                     <button
//                       type="button"
//                       className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                       onClick={handleManualAddProduct}
//                     >
//                       Add product manually
//                     </button>
//                   </div>
//                 )} */}
//               </>
//             )}
//           </Combobox>
//         </DialogPanel>
//       </div>
//     </Dialog>
//   );
// }

// const LoadingProductSkeleton = () => {
//   return (
//     <div className="flex flex-row">
//       <div className="flex transform-gpu divide-x divide-gray-100 w-full">
//         <div className="max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4">
//           <h2 className="mb-4 mt-2 text-xs font-semibold text-gray-500">
//             Recent searches
//           </h2>
//           <div className="-mx-2 text-sm text-gray-700">
//             {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
//               <div
//                 key={index}
//                 className="group flex cursor-default select-none items-center rounded-md p-2 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
//               >
//                 <span className="ml-3 h-8 w-full bg-gray-200 animate-pulse flex "></span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="hidden border-l border-gray-100 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
//         <div className="flex-none p-6 text-center">
//           <div className="mx-auto h-48 w-48 bg-gray-100 animate-pulse" />
//           <h2 className="mt-3 font-semibold text-gray-900 h-5 w-full bg-gray-100 animate-pulse"></h2>
//           <p className="text-sm/6 bg-gray-100 animate-pulse h-6 mt-2"></p>
//         </div>
//         <div className="flex flex-auto flex-col justify-between p-6">
//           <div className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
//             {[1, 2].map((index) => (
//               <p
//                 key={index}
//                 className="text-sm/6 bg-gray-100 animate-pulse h-6 mt-2"
//               ></p>
//             ))}
//           </div>
//           <div className="mt-6 w-full rounded-md bg-indigo-200 animate-pulse px-3 py-2 h-12 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"></div>
//         </div>
//       </div>
//     </div>
//   );
// };
