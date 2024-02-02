"use client";
import "@repo/ui/globals.css";
import Provider from "@/components/Provider";
import _Dashboard from "@/components/_Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <QueryClientProvider client={queryClient}>
            <main className="bg-[#f9ebd3]">{children}</main>
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
