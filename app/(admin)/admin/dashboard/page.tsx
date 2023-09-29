"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);
  // if (status !== "authenticated") {
  //   router.push("/admin/dashboard");
  // }

  return (
    <div>
      <div>Dashboard</div>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};

export default Dashboard;
