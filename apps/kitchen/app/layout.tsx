"use client";
import "@repo/ui/globals.css";
import { TrpcProvider } from "@kitchen/components/TrpcProvider";
import Nav from "@kitchen/components/Nav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f9ebd3]">
        <TrpcProvider>
          <Nav />
          <main>{children}</main>
        </TrpcProvider>
      </body>
    </html>
  );
}
