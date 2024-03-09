"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ScrollArea } from "@ui/components/ui/scroll-area";
import { trpc } from "@customer/hooks/trpc";
import CategoryButton from "./CategoryButton";

const Categories = () => {
  const router = useRouter();
  const searchparams = useSearchParams();

  const { data } = trpc.getCategories.useQuery();

  const categoryParam = searchparams.get("category");

  const [isActive, setIsActive] = useState(false);

  const handleClick = (id: string) => {
    router.push(`?category=${id}`);
    setIsActive(!isActive);
    if (id === categoryParam) {
      router.push("?");
    }
  };
  return (
    <div className="flex top-0 w-full h-24 sm:h-24 bg-[#211d1c] drop-shadow-[0px_10px_10px_rgba(0,0,0,0.4)]">
      <div className="absolute bottom-0 max-w-full">
        <div
          className="flex space-x-4 overflow-x-auto scrollbar-hide"
          id="style2"
        >
          {data
            ?.sort((a, b) => a.name.localeCompare(b.name))
            .map((category) => (
              <CategoryButton
                key={category.id}
                id={category.id}
                name={category.name}
                handleClick={handleClick}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
