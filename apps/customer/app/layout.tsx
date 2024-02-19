"use client";
import Nav from "@customer/components/Nav";
import "@repo/ui/globals.css";
import type { Metadata } from "next";
import Footer from "@customer/components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TrpcProvider } from "@customer/components/TrpcProvider";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TrpcProvider>
          <QueryClientProvider client={queryClient}>
            <main className="bg-[#f9ebd3]">{children}</main>
          </QueryClientProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
