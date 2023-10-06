"use client";
import _Admin from "@/components/_Admin";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Admin = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading User...</div>;
  if (session === null) {
    router.push("/admin/login");
  } else {
    router.push("/admin/dashboard");
  }
  return <div>Redirecting...</div>;
};

export default Admin;
