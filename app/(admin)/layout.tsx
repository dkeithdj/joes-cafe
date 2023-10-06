"use client";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";
import AdminNav from "@/components/_AdminNav";
import _Dashboard from "@/components/_Dashboard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Provider>
        <AdminNav />
        {children}
      </Provider>
    </main>
  );
}
