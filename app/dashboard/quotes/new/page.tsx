"use client";
import ClientInfoHeader from "@/components/quotes/ClientHeader";
import { useMemo, useState } from "react";
import AddProduct from "@/components/quotes/AddProduct";
import useQuoteStore from "@/store/quote-store";
import { useRouter } from "next/navigation";
export default function NewQuote() {
  const [open, setOpen] = useState(false);

  const { quoteProducts, updateQty, removeProduct, dueDate, updateDueDate } =
    useQuoteStore();
  const sevenDaysFromNow = new Date(
    new Date().setDate(new Date().getDate() + 7)
  )
    .toISOString()
    .split("T")[0];
  return (
    <main className="min-h-screen flex flex-col justify-between ">
      <div className="flex-grow ">
        <header className="relative isolate">
          <ClientInfoHeader />

          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-gray-500">Due Date: </span>
              <input
                type="date"
                value={dueDate || sevenDaysFromNow}
                className="border border-gray-300 rounded-md p-1"
                onChange={(e) => updateDueDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                max={
                  new Date(new Date().setMonth(new Date().getMonth() + 2))
                    .toISOString()
                    .split("T")[0]
                }
              />
            </div>
            <div></div>
          </div>
        </header>
        <table className="mt-16 w-full whitespace-nowrap text-left text-sm/6">
          <colgroup>
            <col className="w-full" />
            <col />
            <col />
            <col />
          </colgroup>

          <thead className="border-b border-gray-200 text-gray-900">
            <tr>
              <th scope="col" className="px-0 py-3 font-semibold">
                Products
              </th>
              <th
                scope="col"
                className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
              >
                Price
              </th>
              <th
                scope="col"
                className="py-3 pl-8 pr-0 text-right font-semibold"
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {quoteProducts.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="max-w-0 px-0 py-5 align-top">
                  <div className="truncate font-medium text-gray-900">
                    {item.name}
                  </div>
                  <div className="truncate text-gray-500">
                    {item.description}
                  </div>
                </td>
                <td className="hidden py-5 pl-8 pr-0 align-top tabular-nums text-gray-700 sm:table-cell text-center">
                  <input
                    type="number"
                    value={item.qty || 0}
                    onChange={(e) => {
                      updateQty(item.id, Number(e.target.value));
                    }}
                    className="peer block w-full bg-gray-100 px-3 py-1.5 text-gray-900 placeholder:text-gray-500 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                  <button onClick={() => removeProduct(item)}>
                    <span className="text-red-500 text-sm">remove</span>
                  </button>
                </td>
                <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                  $ {item.price_to_client?.toFixed(2)}
                </td>
                <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">
                  $
                  {(
                    (Number(item.price_to_client) || 0) * (item.qty || 0)
                  ).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr className="w-full">
              <td className="py-5 flex justify-start items-center   pr-0 text-right align-top tabular-nums text-gray-700">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() => setOpen(true)}
                >
                  Add Product
                </button>
              </td>
            </tr>
          </tbody>
          <TableFooter />
        </table>
        <AddProduct open={open} setOpen={setOpen} />
      </div>
      <FloatingStatusBar />
    </main>
  );
}
const TableFooter = () => {
  const { quoteProducts } = useQuoteStore();
  const total = quoteProducts.reduce((acc, item) => {
    return acc + (item.price_to_client || 0) * (item.qty || 0);
  }, 0);
  return (
    <tfoot>
      <tr>
        <th scope="row" className="pt-4 font-semibold text-gray-900 sm:hidden">
          Total
        </th>
        <th
          scope="row"
          colSpan={3}
          className="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell"
        >
          Total
        </th>
        <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900">
          $ {total.toFixed(2)}
        </td>
      </tr>
    </tfoot>
  );
};

export function FloatingStatusBar() {
  const { resetQuote } = useQuoteStore();
  const router = useRouter();
  const handleResetQuote = () => {
    resetQuote();
    router.replace("/dashboard/quotes/new");
  };
  return (
    <div className="sticky bottom-5 w-full pb-2 sm:pb-5 z-50  ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-indigo-500 p-2 shadow-lg sm:p-3">
          <div className="flex items-center justify-between">
            <div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleResetQuote}
              >
                Reset Quote
              </button>
            </div>
            <p className="ml-3 truncate font-medium text-lg text-white">
              {/* <span className="text-gray-50">Quote # 123456</span> */}
              {/* <span className="text-gray-300 ml-2">Saved as draft</span> */}
            </p>
            <div className="flex ml-autoflex-row gap-2 items-center">
              <button
                onClick={() => {
                  console.log("save");
                }}
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50"
              >
                Save as draft
              </button>
              <a
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50"
              >
                Review and send
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
