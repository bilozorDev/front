"use client";
import { useSearchParams } from "next/navigation";
import ClientInfoHeader from "@/components/quotes/ClientHeader";
import { useState } from "react";
import AddProduct from "@/components/quotes/AddProduct";
export default function NewQuote() {
  const [open, setOpen] = useState(true);
  const params = useSearchParams();
  const clientId = params.get("clientId");
  return (
    <main>
      <header className="relative isolate">
        <ClientInfoHeader />
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
            <th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.id} className="border-b border-gray-100">
              <td className="max-w-0 px-0 py-5 align-top">
                <div className="truncate font-medium text-gray-900">
                  {item.title}
                </div>
                <div className="truncate text-gray-500">{item.description}</div>
              </td>
              <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                {item.hours}
              </td>
              <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                {item.rate}
              </td>
              <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">
                {item.price}
              </td>
            </tr>
          ))}
          <tr className="w-full">
            <td
              colSpan={4}
              className="py-5 flex justify-start items-center  pl-8 pr-0 text-right align-top tabular-nums text-gray-700"
            >
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
    </main>
  );
}

const invoice = {
  subTotal: "$8,800.00",
  tax: "$1,760.00",
  total: "$10,560.00",
  items: [],
};
const TableFooter = () => {
  return (
    <tfoot>
      <tr>
        <th
          scope="row"
          className="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden"
        >
          Subtotal
        </th>
        <th
          scope="row"
          colSpan={3}
          className="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell"
        >
          Subtotal
        </th>
        <td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">
          {invoice.subTotal}
        </td>
      </tr>
      <tr>
        <th scope="row" className="pt-4 font-normal text-gray-700 sm:hidden">
          Tax
        </th>
        <th
          scope="row"
          colSpan={3}
          className="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell"
        >
          Tax
        </th>
        <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900">
          {invoice.tax}
        </td>
      </tr>
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
          {invoice.total}
        </td>
      </tr>
    </tfoot>
  );
};
