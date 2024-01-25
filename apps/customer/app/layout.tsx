"use client";
import Nav from "@/components/Nav";
import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Joe's Cafe",
//   description: "Order Menu of Joe's Cafe",
// };

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className="bg-[#f9ebd3]">{children}</body>
      </QueryClientProvider>
    </html>
  );
}
