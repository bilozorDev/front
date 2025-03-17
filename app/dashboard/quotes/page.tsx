import { getQuotes } from "@/app/db/queries";
import QuotesList from "@/components/QuotesList";
export default async function QuotesPage() {
  const quotes = await getQuotes();
  return <QuotesList quotes={quotes} />;
}
