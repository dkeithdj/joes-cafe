// "use client";
import React, { useState } from "react";
import Basket from "./Basket";
import Categories from "./Categories";

const Nav = () => {
  return (
    <div className="bg-[#2e2a29] pt-4 sticky top-0 z-10">
      <div className="flex justify-between px-4">
        <Basket />
      </div>
      <Categories />
    </div>
  );
};

export default Nav;
