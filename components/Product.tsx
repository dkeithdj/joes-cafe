import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";

const Product = ({ pos }) => {
  return (
    <Card className=" w-[150px] h-[200px] m-4">
      <CardHeader className="flex items-center">
        <Image src={"/coffee.png"} alt="coffee" width={50} height={50} />
      </CardHeader>
      <CardContent className="px-4">
        <div className="flex items-start justify-between">
          <div className="text-lg leading-4">{pos.productName}</div>
          <Image
            src={"/add.svg"}
            alt="add"
            width={16}
            height={16}
            className=""
          />
        </div>
        <div className="font-['Yantramanav'] font-semibold">
          PHP {pos.price}.00
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default Product;
