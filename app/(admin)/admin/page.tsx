import Admin from "@/components/Admin";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col">
      <Link href="/admin/register">Register</Link>
      <Link href="/admin/login">Login</Link>
    </div>
  );
};

export default page;
