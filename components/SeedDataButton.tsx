"use client";

import { seedUserData } from "@/utils/seedUserData";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function SeedDataButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success?: string;
    error?: string;
    summary?: Record<string, number>;
  } | null>(null);

  const handleSeedData = () => {
    if (
      window.confirm(
        "Are you sure you want to create sample data for your account? This will add demo clients, products, and quotes.",
      )
    ) {
      startTransition(async () => {
        const response = await seedUserData();
        setResult(response);

        if ("success" in response) {
          // Wait a moment before refreshing so the user can see the success message
          setTimeout(() => {
            router.refresh();
          }, 1500);
        }
      });
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleSeedData}
        disabled={isPending}
        className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300"
      >
        {isPending ? "Creating Sample Data..." : "Create Sample Data"}
      </button>

      {result && (
        <div
          className={`mt-3 p-4 rounded-md ${result.error ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}
        >
          {result.error && <p>{result.error}</p>}

          {result.success && (
            <div>
              <p className="font-medium">{result.success}</p>
              {result.summary && (
                <ul className="mt-2 text-sm">
                  <li>✓ {result.summary.clients} clients created</li>
                  <li>✓ {result.summary.products} products created</li>
                  <li>✓ {result.summary.quotes} quotes created</li>
                  <li>✓ {result.summary.quoteItems} quote items created</li>
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
