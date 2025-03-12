"use client";

import { useParams } from "next/navigation";
import { useGetQuoteById } from "@/queries/quotes/client";
import { useToggleQuotePublicAccess, getShareableQuoteLink } from "@/queries/quotes/shareQuote";
import { useEffect, useState } from "react";
import QuoteView from "@/components/quotes/QuoteView";
import { ShareIcon, LockClosedIcon, DocumentDuplicateIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function QuoteDetailsPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const { data, isLoading, error } = useGetQuoteById(id);
  const { mutate: togglePublicAccess } = useToggleQuotePublicAccess();
  const [shareableLink, setShareableLink] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const quote = data?.data;
  const isPublic = quote?.public_access || false;
  const publicToken = quote?.public_token || "";

  useEffect(() => {
    if (quote && isPublic && publicToken) {
      setShareableLink(getShareableQuoteLink(id, publicToken));
    }
  }, [quote, isPublic, publicToken, id]);

  const handleToggleSharing = () => {
    togglePublicAccess(
      { quoteId: id, makePublic: !isPublic },
      {
        onSuccess: (data) => {
          if (data.isPublic) {
            setShareableLink(getShareableQuoteLink(id, data.token));
          } else {
            setShareableLink("");
          }
        },
      }
    );
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading quote details...</div>;
  }

  if (error || !quote) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-red-600">Error loading quote</h2>
        <p className="mt-2 text-gray-600">The quote could not be found or you don't have permission to view it.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Quote Details</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleToggleSharing}
            className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium shadow-sm ${
              isPublic
                ? "border-red-300 bg-white text-red-700 hover:bg-red-50"
                : "border-indigo-300 bg-white text-indigo-700 hover:bg-indigo-50"
            }`}
          >
            {isPublic ? (
              <>
                <LockClosedIcon className="h-5 w-5 mr-2" />
                Make Private
              </>
            ) : (
              <>
                <ShareIcon className="h-5 w-5 mr-2" />
                Share Quote
              </>
            )}
          </button>
        </div>
      </div>

      {isPublic && shareableLink && (
        <div className="mb-6 bg-indigo-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-indigo-800">Shareable Link</h3>
              <p className="text-sm text-indigo-700 mt-1">
                Share this link with your client to let them view the quote:
              </p>
            </div>
            <button
              onClick={copyLinkToClipboard}
              className="inline-flex items-center px-3 py-1.5 border border-indigo-300 rounded-md text-xs font-medium bg-white text-indigo-700 hover:bg-indigo-50"
            >
              {copied ? (
                <>
                  <CheckIcon className="h-4 w-4 mr-1.5" />
                  Copied!
                </>
              ) : (
                <>
                  <DocumentDuplicateIcon className="h-4 w-4 mr-1.5" />
                  Copy Link
                </>
              )}
            </button>
          </div>
          <div className="mt-2">
            <input
              type="text"
              readOnly
              value={shareableLink}
              className="block w-full bg-white border border-indigo-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onClick={(e) => e.currentTarget.select()}
            />
          </div>
        </div>
      )}

      <QuoteView quote={quote} products={[]} clientName="Client Name" />
    </div>
  );
}
