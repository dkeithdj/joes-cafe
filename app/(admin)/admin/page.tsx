"use client";
import Admin from "@/components/Admin";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (session === null) router.push("/admin/login");
  console.log(session);
  return (
    <div className="flex flex-col">
      content goes here
      {/* <Link href="/admin/register">Register</Link>
      <Link href="/admin/login">Login</Link> */}
    </div>
  );
};

export default page;
