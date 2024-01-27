"use client";
import { useCategories } from "@/hooks/useCategories";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ScrollArea } from "@ui/components/ui/scroll-area";

const Categories = () => {
  const router = useRouter();
  const { data } = useCategories();

  const [categoryId, setCategoryId] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [active, setActive] = useState({
    id: "all",
    isSet: false,
  });

  // useEffect(() => {
  //   console.log(active);
  //   router.push(`?category=${active.id}`);
  // }, [active]);

  if (active.id.length === 0) router.push("?");
  // router.push("?");
  // console.log(active);
  return (
    <div className="flex justify-between w-full gap-5 flex-wrap">
      <div className="flex gap-2 overflow-auto">
        {data?.map((category) => (
          <div
            className={`${
              active.isSet && active.id === category.id
                ? "text-[#512711] bg-[#e1cdad]"
                : "text-[#e1cdad]"
            } px-4 py-2 my-2 rounded-lg capitalize whitespace-nowrap`}
            key={category.id}
            onClick={() => {
              setActive({
                id: category.id,
                isSet: active.id !== category.id ? true : !active.isSet,
              });
              // console.log(active);
              router.push(
                `${
                  active.isSet && active.id === category.id
                    ? `?category=${active.id}`
                    : `?`
                }`,
              );
            }}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
