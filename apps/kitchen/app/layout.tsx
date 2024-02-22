"use client";
import "@repo/ui/globals.css";
import { TrpcProvider } from "@kitchen/components/TrpcProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TrpcProvider>
          <main className="bg-[#f9ebd3]">{children}</main>
        </TrpcProvider>
      </body>
    </html>
  );
}
