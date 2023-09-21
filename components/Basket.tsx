import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

const Basket = () => {
  return (
    <div className="flex relative rounded-lg shadow-sm">
      <div className="absolute right-[-8px] top-[-8px] ml-2 inline-block whitespace-nowrap bg-red-400 rounded-full px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none">
        6
      </div>
      <div className="w-10 h-10 bg-[#f9ebd3] rounded-l-lg flex justify-center items-center border-r">
        ☕
      </div>
      <div className="w-24 h-10 bg-white rounded-r-lg flex justify-center items-center border-l">
        Coffee Basket
      </div>
    </div>
  );
};

export default Basket;
