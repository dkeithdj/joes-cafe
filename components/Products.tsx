import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { ProductProps } from "@/types";

const Product = ({ product }: { product: ProductProps }) => {
  return (
    <Card className=" w-[150px] h-[200px] m-4">
      <div className="flex items-center justify-center py-2">
        <Image
          src={"/coffee_default.png"}
          alt="coffee"
          width={60}
          height={60}
        />
      </div>
      <CardContent className="px-4">
        <div>{product.category.name}</div>
        <div className="flex items-start justify-between">
          <div className="text-lg leading-4">{product.name}</div>
          <Image
            src={"/add.svg"}
            alt="add"
            width={16}
            height={16}
            className=""
          />
        </div>
        <div className="font-['Yantramanav'] font-semibold">
          PHP {product.price}.00
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default Product;
