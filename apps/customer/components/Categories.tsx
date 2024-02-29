"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ScrollArea } from "@ui/components/ui/scroll-area";
import { trpc } from "@customer/hooks/trpc";

const Categories = () => {
  const router = useRouter();
  const { data } = trpc.getCategories.useQuery();

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
    <div className="flex top-0 w-full h-24 sm:h-24 bg-[#211d1c] drop-shadow-[0px_10px_10px_rgba(0,0,0,0.4)]">
      <div className = "absolute bottom-0 max-w-full">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide" id="style2">
        {data?.map((category) => (
          <div
            className={`mr-2 ${
              active.isSet && active.id === category.id
                ? "text-[#512711] bg-[#e1cdad]"
                : "text-[#e1cdad]"
            } px-5 py-2 my-2 rounded-lg capitalize whitespace-nowrap text-[20px] `}  style={{fontFamily:'Bebas Neue'}} 
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
    </div>
  );
};

export default Categories;
