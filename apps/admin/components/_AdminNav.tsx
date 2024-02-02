"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const AdminNav = () => {
  const { data: session, status } = useSession();
  return (
    <div className="bg-[#2e2a29] pt-4 ">
      <div className="flex justify-between px-4">
        <div className="space-x-2 text-[#f9ebd3]">
          <a href="/">Admin</a>
          {!session?.user && (
            <>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </>
          )}
          {session?.user && (
            <button onClick={() => signOut({ callbackUrl: "/login" })}>
              Logout
            </button>
          )}
          {/* <a href="/api/register">Register</a> */}
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
