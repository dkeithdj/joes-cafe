"use client";
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { ProductProps } from "@/types";
import Cookies from "js-cookie";

const Product = ({ product }: { product: ProductProps }) => {
  const addItem = () => {
    const customerCookie = Cookies.get("customer");

    const { transaction, customer } = JSON.parse(customerCookie as string);

    const createItem = async () => {
      const response = await fetch("/api/items", {
        method: "POST",
        body: JSON.stringify({
          transactionId: transaction,
          productId: product.id,
          customerId: customer,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.log(response);
      }
    };
    createItem();
  };

  return (
    <Card className=" w-[150px] h-[210px] m-4 rounded-[24px] flex flex-col items-center">
      <div className="flex w-[130px] h-[130px] items-center rounded-[14px] justify-center mt-[10px] bg-red-400 object-cover overflow-hidden">
        <Image
          src={"/coffee_default.png"}
          alt="coffee"
          width={130}
          height={130}
        />
      </div>
      <div className="w-[130px] mt-4">
        <div className="">
          <div className="flex items-start justify-between">
            <div className="text-lg leading-4">{product.name}</div>
            <Image
              src={"/add.svg"}
              alt="add"
              width={20}
              height={20}
              className=""
              onClick={addItem}
            />
          </div>
        </div>
        <div className="">
          <div className="font-['Yantramanav'] font-semibold">
            PHP {product.price}.00
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Product;
