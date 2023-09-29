"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // if (session !== null) router.push("/admin");

  const query = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("/api/orders");
      const data = await res.json();

      return data;
    },
  });

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    signIn("credentials", { ...data, redirect: false });

    // router.push("/admin");
  };
  return (
    <div>
      <form onSubmit={loginUser}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
