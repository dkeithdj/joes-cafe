"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const CategoryButton = ({
  id,
  name,
  handleClick,
  isActive,
}: {
  id: string;
  name: string;
  handleClick: (id: string) => void;
  isActive: boolean;
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
      } px-4 py-2 my-2 rounded-lg capitalize whitespace-nowrap`}
    >
      {name}
    </div>
  );
};

export default CategoryButton;
