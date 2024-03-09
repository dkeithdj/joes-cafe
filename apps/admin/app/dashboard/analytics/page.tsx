"use client";
import _Dashboard from "@admin/components/_Dashboard";
import Analytics from "@admin/components/admin/Analytics";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import Loading from "@admin/components/Loading";

const AnalyticsPage = () => {
  // const { data: session, status } = useSession();
  // if (session === null) router.push("/login");

  return (
    <div className="w-auto mx-14">
      <div className="flex flex-row justify-between">
        <div className="text-6xl text-[#603D04] py-4 ">Analytics</div>
        <div className="flex flex-row items-center gap-x-4"></div>
      </div>
      <div>
        {/* {status === "loading" ? ( */}
        {/*   <div> */}
        {/*     <Loading length={3} height="250" /> */}
        {/*   </div> */}
        {/* ) : ( */}
        {/*   <> */}
        {/*     <Analytics /> */}
        {/*   </> */}
        {/* )} */}
        <Analytics />
      </div>
    </div>
  );
};

export default AnalyticsPage;
