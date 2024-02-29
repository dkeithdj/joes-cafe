// "use client";
import React, { useState } from "react";
import Basket from "./Basket";
import Categories from "./Categories";

const Nav = () => {
  return (
    <div className="bg-[rgba(33,29,28,1)] pt-4 sticky top-0 z-10">
      <div className="flex justify-between px-4">
        <Basket />
      </div>
      <Categories />
    </div>
  );
};

export default Nav;
