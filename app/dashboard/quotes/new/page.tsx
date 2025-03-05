"use client";
import ManualProductAdd from "@/components/ManualProductAdd";
import QuoteTable from "@/components/QuoteTable";
import { Suspense } from "react";
export default function NewQuote() {
  return (
    <>
      <QuoteTable />
      {/* <Suspense>
        <ManualProductAdd />
      </Suspense> */}
    </>
  );
}
