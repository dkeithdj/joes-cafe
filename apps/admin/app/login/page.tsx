"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  if (session) router.push("/dashboard");

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    signIn("credentials", { ...data, callbackUrl: "/dashboard" });
  };
  return (
    <div>
      <div className="bg-gradient-to-b from-[#D2B48C] to-[#E7D6B8] w-full h-screen">
        {/* <!--Side Backgroundz--> */}
        <div className="flex w-full h-full">
          <div className="relative bg-black w-2/5 h-full bg-cover">
            <Image
              className="absolute w-full h-full object-cover opacity-70 drop-shadow-xl"
              src="/Joes-Cropped-Background.jpg"
              alt="bg-joes"
              width={200}
              height={200}
            />
            <Image
              className="min-[1181px]:w-3/4 min-[1181px]:ml-20 absolute w-full top-40"
              src="/Joes-Logo-Whitebg.png"
              alt="whitebg"
              width={200}
              height={200}
            />
          </div>
          {/* <!--Login Container--> */}
          <div className="flex justify-center items-center w-3/5 h-full">
            <div className="flex flex-col w-9/12 h-3/4 bg-white rounded-[50px] px-16 shadow-xl overflow-hidden">
              <div className="flex justify-center pt-6">
                <h1 className="admin-text">ADMIN LOG-IN</h1>
              </div>
              <form className="flex w-full h-full mt-8" onSubmit={loginUser}>
                <div className="relative w-full h-full">
                  <div className="absolute w-full top-1">
                    <input
                      id="inputs"
                      name="username"
                      type="email"
                      className="w-full h-12 peer
                                text-black
                                border-b-2 border-gray-300 
                                focus:outline-none focus:border-yellow-950
                                placeholder-transparent"
                      placeholder="Username"
                      value={data.email}
                      onChange={(e) => {
                        setData({ ...data, email: e.target.value });
                      }}
                    />
                    <label
                      htmlFor="username"
                      className="labels
                                cursor-text
                                absolute left-0 
                                transition-all
                                peer-placeholder-shown:-top-2.5
                                peer-focus: -top-14
                                peer-placeholder-shown:text-gray-400 peer-focus:text-[#D4B797]
                                "
                    >
                      Username
                    </label>
                  </div>
                  <div className="absolute w-full top-36">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="w-full h-12 peer
                                text-black
                                border-b-2 border-gray-300 
                                focus:outline-none focus:border-yellow-950
                                placeholder-transparent"
                      placeholder="Password"
                      value={data.password}
                      onChange={(e) => {
                        setData({ ...data, password: e.target.value });
                      }}
                    />
                    <label
                      htmlFor="password"
                      className="labels
                                cursor-text
                                absolute 
                                left-0
                                transition-all
                                peer-placeholder-shown:-top-2.5
                                peer-focus: -top-14
                                peer-placeholder-shown:text-gray-400 peer-focus:text-[#D4B797]
                                "
                    >
                      Password
                    </label>
                  </div>
                  <div className="absolute w-full bottom-16">
                    <button
                      type="submit"
                      value="Log In"
                      className="labels
                                w-full h-20 rounded-xl hover:bg-[#D4B797] hover:text-[#512711]
                                cursor-pointer transition ease-in-out delay-75
                                bg-[#512711] text-[#E1CDAD] text-4xl"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
