"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const _Dashboard = () => {
  const router = useRouter();
  return (
    <div className="w-full h-screen bg-[#F9EBD3]">
      <div className="flex w-full h-full">
        {/* <!--Side Options--> */}
        <div className="relative w-[250px] h-full bg-[#E1CDAD] drop-shadow-xl">
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
                onClick={() => router.push("/dashboard/")}
                className="text-[#E1CDAD] text-[20px] font-['Alata'] bg-[#512711] rounded-xl w-full h-14"
              >
                Dashboard
              </button>
            </div>
            <div className="pb-5">
              <button
                onClick={() => router.push("/orders")}
                className="text-[#512711] text-[20px] font-['Alata'] bg-[#F9EBD3] rounded-xl w-full h-14"
              >
                Orders
              </button>
            </div>
            <div className="pb-5">
              <button
                onClick={() => router.push("/products")}
                className="text-[#512711] text-[20px] font-['Alata'] bg-[#F9EBD3] rounded-xl w-full h-14"
              >
                Products
              </button>
            </div>
            <div className="pt-8 justify-end">
              <button className="text-[#512711] text-[20px] font-['Alata'] bg-[#F9EBD3] rounded-xl w-full h-14">
                Log Out
              </button>
            </div>
          </div>
        </div>
        {/* <!--Main Container--> */}
        <div>Chart goes herer</div>
      </div>
    </div>
  );
};

export default _Dashboard;
