import { notFound } from "next/navigation";
import QuoteView from "@/components/quotes/QuoteView";
import { getPublicQuoteById } from "@/queries/quotes/server";

interface PublicQuotePageProps {
  params: {
    id: string;
  };
  searchParams: {
    token?: string;
  };
}

export default async function PublicQuotePage({
  params,
  searchParams,
}: PublicQuotePageProps) {
  const { id } = params;
  const { token } = searchParams;

  try {
    // Get the quote data
    const { quote, products, client } = await getPublicQuoteById(id);

    // If no quote found or token doesn't match, return 404
    if (!quote || !quote.public_access || quote.public_token !== token) {
      notFound();
    }

    // Compute client name
    const clientName = client?.company || client?.name || "Client";

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="py-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Quote from {clientName}</h1>
              <p className="text-gray-500">
                Thank you for considering our services. Please review the quote details below.
              </p>
            </div>
            <QuoteView 
              quote={quote} 
              products={products} 
              clientName={clientName} 
              isPublic={true} 
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching quote:", error);
    notFound();
  }
}