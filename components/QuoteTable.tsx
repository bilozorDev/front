// import useQuoteStore from "@/store/quote-store";
// import dynamic from "next/dynamic";
// import { useState } from "react";
// // import AddProductSearch from "./AddProductSearch";
// import { formatPrice } from "@/utils/formatPrice";
// import { MinusIcon, PlusIcon } from "@heroicons/react/16/solid";

// function calculateTotalForProduct(
//   price: number,
//   quantity: number,
//   margin: number
// ) {
//   return price * margin * quantity;
// }

// function QuoteTable() {
//   const [, setOpen] = useState(false);
//   const { quoteProducts, removeProduct, increaseQuantity, decreaseQuantity } =
//     useQuoteStore();

//   return (
//     <div className="px-4 sm:px-6 lg:px-8">
//       <div className="sm:flex sm:items-center">
//         <div className="sm:flex-auto">
//           <h1 className="text-base font-semibold text-gray-900">
//             Transactions
//           </h1>
//           <p className="mt-2 text-sm text-gray-700">
//             A table of placeholder stock market data that does not make any
//             sense.
//           </p>
//         </div>
//         <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex flex-row gap-2 items-center">
//           {/* <p className="text-sm text-gray-700">
//               Changes saved 30 seconds ago
//             </p> */}
//           <button
//             type="button"
//             onClick={() => setOpen(true)}
//             className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             Add product
//           </button>
//         </div>
//       </div>
//       <div className="mt-8 flow-root">
//         <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//           <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
//             <table className="min-w-full divide-y divide-gray-300">
//               <thead>
//                 <tr>
//                   <th
//                     scope="col"
//                     colSpan={2}
//                     className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
//                   >
//                     Product
//                   </th>
//                   <th
//                     scope="col"
//                     className="whitespace-nowrap px-2 py-3.5 text-right text-sm font-semibold text-gray-900 w-32"
//                   >
//                     Cost
//                   </th>
//                   <th
//                     scope="col"
//                     className="whitespace-nowrap px-2 py-3.5 text-right text-sm font-semibold text-gray-900 w-24"
//                   >
//                     Margin
//                   </th>
//                   <th
//                     scope="col"
//                     className="whitespace-nowrap px-2 py-3.5 text-center text-sm font-semibold text-gray-900 w-32"
//                   >
//                     Quantity
//                   </th>
//                   <th
//                     scope="col"
//                     className="whitespace-nowrap px-2 py-3.5 text-right text-sm font-semibold text-gray-900 w-32"
//                   >
//                     Total
//                   </th>
//                   <th
//                     scope="col"
//                     className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0 w-24"
//                   >
//                     <span className="sr-only">remove</span>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200 bg-white">
//                 {quote.products.length > 0 &&
//                   quote.products.map((product) => (
//                     <tr key={product.id}>
//                       <td
//                         colSpan={2}
//                         className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0"
//                       >
//                         {product.name}
//                       </td>
//                       <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 text-right font-mono tabular-nums">
//                         {formatPrice(product.price)}
//                       </td>
//                       <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900 text-right font-mono tabular-nums">
//                         {((quote.markup - 1) * 100).toFixed(0)}%
//                       </td>
//                       <td className="whitespace-nowrap select-none px-2 py-2 text-sm flex items-center justify-center gap-2 text-gray-500">
//                         <button
//                           onClick={() => decreaseQuantity(product)}
//                           className={`w-4 h-4 cursor-pointer hover:text-red-600 ${
//                             product.quantity === 1 ? "cursor-not-allowed" : ""
//                           }`}
//                         >
//                           <MinusIcon />
//                         </button>
//                         <span className="w-6 text-center font-mono tabular-nums">
//                           {product.quantity}
//                         </span>
//                         <button
//                           onClick={() => increaseQuantity(product)}
//                           className="w-4 h-4 cursor-pointer hover:text-green-600"
//                         >
//                           <PlusIcon />
//                         </button>
//                       </td>
//                       <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 text-right font-mono tabular-nums">
//                         {formatPrice(
//                           calculateTotalForProduct(
//                             product.price,
//                             product.quantity,
//                             quote.markup
//                           )
//                         )}
//                       </td>
//                       <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
//                         <button
//                           className="text-indigo-600 hover:text-indigo-900"
//                           onClick={() => removeProduct(product)}
//                         >
//                           Remove
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//               {quote.products.length > 0 && <QuoteTotal />}
//             </table>
//           </div>
//         </div>
//       </div>
//       {/* <AddProductSearch open={open} setOpen={setOpen} /> */}
//     </div>
//   );
// }

// function QuoteTotal() {
//   const { quote } = useQuoteStore();
//   const subtotal = quote.products.reduce(
//     (acc, product) => acc + product.price * product.quantity,
//     0
//   );
//   const totalMargin = quote.products.reduce(
//     (acc, product) =>
//       acc + (product.price * quote.markup - product.price) * product.quantity,
//     0
//   );

//   return (
//     <tfoot>
//       <tr>
//         <th
//           scope="row"
//           colSpan={6}
//           className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
//         >
//           Subtotal
//         </th>
//         <td className="pl-3 pr-4 pt-6 text-right text-sm text-gray-500 sm:pr-0 font-mono tabular-nums">
//           {formatPrice(subtotal)}
//         </td>
//       </tr>
//       <tr>
//         <th
//           scope="row"
//           colSpan={6}
//           className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
//         >
//           Margin
//         </th>
//         <td className="pl-3 pr-4 pt-4 text-right text-sm text-gray-500 sm:pr-0 font-mono tabular-nums">
//           {formatPrice(totalMargin)}
//         </td>
//       </tr>
//       <tr>
//         <th
//           scope="row"
//           colSpan={6}
//           className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0"
//         >
//           Total
//         </th>
//         <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0 font-mono tabular-nums">
//           {formatPrice(subtotal + totalMargin)}
//         </td>
//       </tr>
//     </tfoot>
//   );
// }

// export default dynamic(() => Promise.resolve(QuoteTable), { ssr: false });
