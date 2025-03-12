import { getQuoteById } from "@/queries/quotes/client";

export default async function QuotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await getQuoteById(id);
  console.log(data);
  return <div>hello</div>;
}
