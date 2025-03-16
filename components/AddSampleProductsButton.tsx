"use client";

import { addSampleProducts } from "@/app/dashboard/products/actions";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function AddSampleProductsButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success?: string;
    error?: string;
    count?: number;
  } | null>(null);

  const handleAddSampleProducts = () => {
    startTransition(async () => {
      const response = await addSampleProducts();
      setResult(response);

      if (response.success) {
        // Wait a moment before refreshing so the user can see the success message
        setTimeout(() => {
          router.refresh();
        }, 1500);
      }
    });
  };

  return (
    <div>
      <button
        onClick={handleAddSampleProducts}
        disabled={isPending}
        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300"
        type="button"
      >
        {isPending ? "Adding..." : "Add Sample Products"}
      </button>

      {result && (
        <div
          className={`mt-3 p-3 rounded-md text-sm ${result.error ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}
        >
          {result.error && <p>{result.error}</p>}

          {result.success && (
            <p>
              {result.success}
              {result.count && ` (${result.count} products added)`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
