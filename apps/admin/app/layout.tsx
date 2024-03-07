"use client";
import "@repo/ui/globals.css";
import _Dashboard from "@admin/components/_Dashboard";
import { TrpcProvider } from "@admin/components/TrpcProvider";
import { Toaster } from "@ui/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f9ebd3]">
        <TrpcProvider>
          <main>{children}</main>
          <Toaster />
        </TrpcProvider>
      </body>
    </html>
  );
}
