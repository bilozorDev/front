"use client";
import { Quote } from "@/app/db/schema";
import { useRouter } from "next/navigation";
import PageHeaderWithAction from "./PageHeaderWithAction";

export default function QuotesList({ quotes }: { quotes: Quote[] }) {
  const router = useRouter();

  return (
    <div>
      <PageHeaderWithAction
        title="Quotes"
        action={() => {
          router.push("/dashboard/quotes/new");
        }}
        actionText="Add quote"
      />
      <div className="mt-4">
        {quotes.length === 0 ? (
          <div>No quotes found</div>
        ) : (
          quotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))
        )}
      </div>
    </div>
  );
}

function QuoteCard({ quote }: { quote: Quote }) {
    return (
    <div>
      <div>{quote.id}</div>
      <div>{quote.client_name}</div>
      <div>{quote.created_at}</div>
    </div>
  );
}
