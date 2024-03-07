"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ScrollArea } from "@ui/components/ui/scroll-area";
import { useState } from "react";

const SideBarNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currPathName = pathname.substring(1).split("/");
  // console.log(pathname.substring(1).split("/"));
  const [active, setActive] = useState(currPathName[1]);

  return (
    <ScrollArea className="h-screen rounded-md">
      <div className="relative w-full h-60">
        <div className="absolute w-full h-full">
          <Image
            src="/Joes-Logo-Whitebg.png"
            className="drop-shadow-lg mx-auto mt-6 w-48 h-48"
            alt="Joes"
            width={1000}
            height={1000}
            // width={"auto"}
            // height={"auto"}
          />
        </div>
      </div>
      <div className="flex flex-col w-full px-8">
        <div className="pt-3 pb-5">
          <button
            onClick={() => {
              setActive("analytics");
              router.push("/dashboard/analytics");
            }}
            className={`hover:bg-[#512711] hover:text-[#F9EBD3] ${
              active === "analytics"
                ? "bg-[#512711] text-[#F9EBD3]"
                : "text-[#512711] bg-[#F9EBD3]"
            } text-[20px] font-['Alata']  rounded-xl w-full h-14 `}
          >
            Dashboard
          </button>
        </div>
        <div className="pb-5">
          <button
            onClick={() => {
              setActive("orders");
              router.push("/dashboard/orders");
            }}
            className={`hover:bg-[#512711] hover:text-[#F9EBD3] ${
              active === "orders"
                ? "bg-[#512711] text-[#F9EBD3]"
                : "text-[#512711] bg-[#F9EBD3]"
            } text-[20px] font-['Alata']  rounded-xl w-full h-14`}
          >
            Orders
          </button>
        </div>
        <div className="pb-5">
          <button
            onClick={() => {
              setActive("products");
              router.push("/dashboard/products");
            }}
            className={`hover:bg-[#512711] hover:text-[#F9EBD3] ${
              active === "products"
                ? "bg-[#512711] text-[#F9EBD3]"
                : "text-[#512711] bg-[#F9EBD3]"
            } text-[20px] font-['Alata']  rounded-xl w-full h-14`}
          >
            Products
          </button>
        </div>
        <div className="pb-5">
          <button
            onClick={() => {
              setActive("Categories");
              router.push("/dashboard/categories");
            }}
            className={`hover:bg-[#512711] hover:text-[#F9EBD3] ${
              active === "categories"
                ? "bg-[#512711] text-[#F9EBD3]"
                : "text-[#512711] bg-[#F9EBD3]"
            } text-[20px] font-['Alata']  rounded-xl w-full h-14`}
          >
            Categories
          </button>
        </div>
        <div className="pb-5">
          <button
            onClick={() => {
              setActive("tables");
              router.push("/dashboard/tables");
            }}
            className={`hover:bg-[#512711] hover:text-[#F9EBD3] ${
              active === "tables"
                ? "bg-[#512711] text-[#F9EBD3]"
                : "text-[#512711] bg-[#F9EBD3]"
            } text-[20px] font-['Alata']  rounded-xl w-full h-14`}
          >
            Tables
          </button>
        </div>
        <div className="pt-8 pb-4 justify-end">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="hover:bg-[#512711] hover:text-[#F9EBD3] text-[#512711]  bg-[#F9EBD3] text-[20px] font-['Alata'] rounded-xl w-full h-14"
          >
            Log Out
          </button>
        </div>
      </div>
      {/* </> */}
    </ScrollArea>
  );
};

export default SideBarNav;
