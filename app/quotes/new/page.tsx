"use client";
import ManualProductAdd from "@/components/ManualProductAdd";
import QuoteTable from "@/components/QuoteTable";
import { useState } from "react";

export default function NewQuote() {
  const [markup, setMarkup] = useState(1.2);
  return (
    <>
      <QuoteTable />
      <ManualProductAdd />
    </>
  );
}
