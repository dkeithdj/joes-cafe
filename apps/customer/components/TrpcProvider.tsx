"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  httpBatchLink,
  getFetch,
  loggerLink,
  splitLink,
  wsLink,
  createWSClient,
} from "@trpc/client";
import { useState } from "react";
import superjson from "superjson";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { trpc } from "@customer/hooks/trpc";

export const TrpcProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 5000 } },
      }),
  );

  console.log(process.env.DATABASE_URL);
  const url = `http://localhost:3000/trpc/`;

  const urlEnd = `localhost:3000/trpc`;
  const wsClient = createWSClient({ url: `ws://${urlEnd}` });

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: () => true,
        }),
        splitLink({
          condition(op) {
            return op.type === "subscription";
          },
          true: wsLink({ client: wsClient }),
          false: httpBatchLink({
            url: `http://${urlEnd}`,
            fetch: async (input, init?) => {
              const fetch = getFetch();
              return fetch(input, {
                ...init,
                credentials: "include",
              });
            },
          }),
        }),
        httpBatchLink({
          url,
          fetch: async (input, init?) => {
            const fetch = getFetch();
            return fetch(input, {
              ...init,
              credentials: "include",
            });
          },
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </trpc.Provider>
  );
};
