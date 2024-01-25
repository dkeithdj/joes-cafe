"use client";

import { SessionProvider } from "next-auth/react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider refetchOnWindowFocus={true}>{children}</SessionProvider>
  );
};

export default Provider;
