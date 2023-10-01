"use client";
import _Admin from "@/components/_Admin";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

// export const getServersideProps = async (context) => {
//   const session = await getSession({ req: context.req });
//   if (session) return { redirect: { destination: "/admin", permanent: false } };
//   return { props: { session } };
// };

const Admin = () => {
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

export default Admin;
