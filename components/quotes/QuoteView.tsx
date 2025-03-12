"use client";

import { useEffect, useState } from "react";
import { Quote, Product } from "@/types/types.t";
import { formatPrice } from "@/utils/formatPrice";

interface QuoteViewProps {
  quote: Quote;
  products: Product[];
  clientName?: string;
  isPublic?: boolean;
}

export default function QuoteView({ quote, products, clientName, isPublic = false }: QuoteViewProps) {
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    // Calculate total from products
    const total = products.reduce((sum, product) => {
      const qty = product.qty || 1;
      return sum + (product.price || 0) * qty;
    }, 0);
    setTotalAmount(total);
  }, [products]);

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Quote #{quote.quote_number}</h2>
          {!isPublic && (
            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
              quote.status === "draft" ? "bg-yellow-50 text-yellow-800" :
              quote.status === "sent" ? "bg-blue-50 text-blue-800" :
              quote.status === "accepted" ? "bg-green-50 text-green-800" :
              "bg-gray-50 text-gray-800"
            }`}>
              {quote.status?.toUpperCase()}
            </span>
          )}
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-500">Issued</p>
              <p className="font-medium">{new Date(quote.issue_date).toLocaleDateString()}</p>
            </div>
            {quote.due_date && (
              <div>
                <p className="text-gray-500">Due date</p>
                <p className="font-medium">{new Date(quote.due_date).toLocaleDateString()}</p>
              </div>
            )}
            {quote.expiry_date && (
              <div>
                <p className="text-gray-500">Expires</p>
                <p className="font-medium">{new Date(quote.expiry_date).toLocaleDateString()}</p>
              </div>
            )}
            {clientName && (
              <div>
                <p className="text-gray-500">Client</p>
                <p className="font-medium">{clientName}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 py-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Products</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qty
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => {
                const qty = product.qty || 1;
                const price = product.price || 0;
                const itemTotal = price * qty;
                
                return (
                  <tr key={product.id}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-gray-500 text-xs mt-1">{product.description}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {qty}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {formatPrice(price)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                      {formatPrice(itemTotal)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex justify-end">
            <div className="w-full max-w-xs">
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Subtotal</span>
                <span className="text-sm font-medium text-gray-900">{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-200">
                <span className="text-base font-medium text-gray-900">Total</span>
                <span className="text-base font-medium text-gray-900">{formatPrice(totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {quote.notes && (
        <div className="px-6 py-5 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Notes</h3>
          <p className="text-sm text-gray-600 whitespace-pre-line">{quote.notes}</p>
        </div>
      )}
    </div>
  );
}