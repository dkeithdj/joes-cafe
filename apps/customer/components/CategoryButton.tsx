"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const CategoryButton = ({
  id,
  name,
  handleClick,
}: {
  id: string;
  name: string;
  handleClick: (id: string) => void;
}) => {
  const searchparams = useSearchParams();
  const categoryParam = searchparams.get("category");
  return (
    <div
      onClick={() => {
        handleClick(id);
      }}
      className={`${
        id === categoryParam ? "text-[#512711] bg-[#e1cdad]" : "text-[#e1cdad]"
      } px-5 py-2 my-2 rounded-lg capitalize whitespace-nowrap text-[20px] `}
      style={{ fontFamily: "Bebas Neue" }}
    >
      {name}
    </div>
  );
};

export default CategoryButton;
