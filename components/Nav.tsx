// "use client";
import React, { useState } from "react";
import Basket from "./Basket";
import Categories from "./Categories";

const Nav = () => {
  return (
    <div className="bg-[#2e2a29] pt-4 ">
      <div className="flex justify-between px-4">
        <div className="space-x-2 text-[#f9ebd3]">
          <a href="/">Home</a>
          <a href="/order">Order</a>
        </div>
        <Basket />
      </div>
      <Categories />
    </div>
  );
};

export default Nav;
