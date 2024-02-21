"use client";
import "@repo/ui/globals.css";
import Provider from "@admin/components/Provider";
import _Dashboard from "@admin/components/_Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TrpcProvider } from "@admin/components/TrpcProvider";

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
          <Provider>
            {/* <QueryClientProvider client={queryClient}> */}
            <main className="bg-[#f9ebd3]">{children}</main>
            {/* </QueryClientProvider> */}
          </Provider>
        </TrpcProvider>
      </body>
    </html>
  );
}
