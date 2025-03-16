"use client";

import { addSampleClients } from "@/app/dashboard/clients/actions";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function AddSampleClientsButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success?: string;
    error?: string;
    count?: number;
  } | null>(null);

  const handleAddSampleClients = () => {
    startTransition(async () => {
      const response = await addSampleClients();
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
        onClick={handleAddSampleClients}
        disabled={isPending}
        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300"
        type="button"
      >
        {isPending ? "Adding..." : "Add Sample Clients"}
      </button>

      {result && (
        <div
          className={`mt-3 p-3 rounded-md ${result.error ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"} text-sm`}
        >
          {result.error && <p>{result.error}</p>}

          {result.success && (
            <p>
              {result.success}
              {result.count && ` (${result.count} clients added). Refreshing in 1.5 seconds`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
