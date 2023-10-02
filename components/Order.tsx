import Image from "next/image";
import React from "react";

const Order = () => {
  return (
    <div className="relative bg-gradient-to-t from-[#E7D6B8] to-[#D2B48C] min-h-screen bg-no-repeat">
      <div className="absolute w-full h-full z-0 bg-[url('/background.png')]"></div>
      <div className="flex justify-center items-center w-full h-screen z-10">
        <div className="flex flex-col justify-center items-center w-80 h-96">
          <div className="plate border rounded-full bg-white w-64 h-64 mb-10 drop-shadow-[1px_3px_1px_rgba(0,0,0,0.2)] select-none">
            <Image
              className="logo drop-shadow-[1px_6px_1px_rgba(0,0,0,0.2)] object-cover select-none"
              src="/Joes-Logo-Whitebg.png"
              alt="background"
              width={300}
              height={300}
            />
          </div>
          <div className="text-center z-10">
            <p className="font-['Zilla Slab'] font-light text-[32px]">
              WAITING FOR YOUR PAYMENT...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
