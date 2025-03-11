"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Hydration from "@/utils/hydration";
import Layout from "@/components/Layout";

const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>{children}</Layout>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <Hydration />
    </QueryClientProvider>
  );
}
