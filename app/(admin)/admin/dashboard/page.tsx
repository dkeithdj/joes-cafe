"use client";
import Dashboard from "@/components/Dashboard";
import _Dashboard from "@/components/_Dashboard";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (session === null) router.push("/admin/login");
  // console.log(session);
  // console.log(status);
  // if (status !== "authenticated") {
  //   router.push("/admin/dashboard");
  // }

  return (
    <div>
      Analytics
      {/* <_Dashboard /> */}
    </div>
  );
};

export default DashboardPage;
