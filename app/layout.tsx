"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Hydration from "@/utils/hydration";
import Layout from "@/components/Layout";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <ClerkProvider>
          <QueryClientProvider client={queryClient}>
            <Layout>{children}</Layout>
            <ReactQueryDevtools initialIsOpen={false} />
            <Hydration />
            
          </QueryClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
