"use client";
import Dashboard from "@/components/Dashboard";
import _Dashboard from "@/components/_Dashboard";
import Analytics from "@/components/admin/Analytics";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "@/components/Loading";

const DashboardPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (session === null) router.push("/admin/login");

  return (
    <div className="w-auto mx-14">
      <div className="flex flex-row justify-between">
        <div className="text-6xl text-[#603D04] py-4 ">Analytics</div>
        <div className="flex flex-row items-center gap-x-4"></div>
      </div>
      <div>
        {status === "loading" ? (
          <div>
            <Loading length={3} height="250" />
          </div>
        ) : (
          <>
            <Analytics />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
