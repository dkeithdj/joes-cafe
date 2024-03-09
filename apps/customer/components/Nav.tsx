"use client";
import React, { useState } from "react";
import Basket from "./Basket";
import Categories from "./Categories";
import { trpc } from "@customer/hooks/trpc";
import Cookies from "js-cookie";

const Nav = () => {
  // const customer = Cookies.get("customer.name") as string;
  return (
    <div className="bg-[rgba(33,29,28,1)] pt-4 sticky top-0 z-10">
      <div className="flex justify-between px-4">
        <Basket />
        <div className="flex flex-row items-center gap-x-4 text-2xl text-[#f9ebd3] font-bold">
          {/* {customer} */}
        </div>
      </div>
      <Categories />
    </div>
  );
};

export default Nav;
