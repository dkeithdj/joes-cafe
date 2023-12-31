"use client";
// import React, { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import { useAddTransaction } from "@/hooks/useTransaction";

const ProductView = () => {
  const params = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const customerCookies = Cookies.get("customer.customer");
  if (customerCookies) {
    router.push(`/table/${params.slug}/${customerCookies}`);
  }

  const {
    mutate: addTransaction,
    isSuccess,
    isError,
    data,
    error,
  } = useAddTransaction();

  const handleSubmit = (e: any) => {
    setSubmitting(true);
    e.preventDefault();
    addTransaction({ name });

    if (isSuccess) {
      const { customerId } = data;
      router.push(`/table/${params.slug}/${customerId}`);
      console.log(customerId);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <div className="relative flex justify-center items-center bg-gradient-to-t from-[#E7D6B8] to-[#D2B48C] h-screen bg-no-repeat ">
        <div className="box">
          <div className="absolute flex justify-center w-full select-none z-20">
            <Image
              className="absolute -top-36 w-64 object-cover "
              src="/Joes-Logo-Whitebg.png"
              alt="joes"
              width={200}
              height={200}
            />
          </div>
        </div>

        <div className="absolute w-80 h-80 flex justify-center items-center select-none z-10">
          <div className="relative w-full h-60 flex justify-center items-center">
            <p className="name absolute top-16">WHAT SHOULD WE CALL YOU?</p>
            <form className="relative flex w-72 pt-10" onSubmit={handleSubmit}>
              <div className="relative flex flex-row w-full h-12 border rounded-l-xl rounded-r-md">
                <input
                  type="text"
                  className="absolute h-10 rounded-md font-['Zilla Slab'] p-2 border-[2px] border-solid border-[#664229]"
                  placeholder=""
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <button
                  disabled={submitting}
                  className="hover:bg-[#664229be] absolute right-0 bg-[#664229] w-24 h-10 rounded-md flex justify-center items-center text-white"
                >
                  <p>CONFIRM</p>
                </button>
                <label className="absolute text-[14px] left-2 top-2 cursor-text select-none ">
                  NAME
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
