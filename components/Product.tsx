"use client";
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { ProductProps } from "@/types";
import Cookies from "js-cookie";
import { useAddItems } from "@/hooks/useProducts";

const Product = ({ product }: { product: ProductProps }) => {
  const { mutate: _addItem, isSuccess, data, isError, error } = useAddItems();
  const productId = product.id;

  const customerId = Cookies.get("customer.customer");
  const transactionId = Cookies.get("customer.transaction");

  const addItem = () => {
    _addItem({ transactionId, productId, customerId });
  };

  return (
    <Card className="relative w-[150px] h-[210px] m-4 rounded-[24px] flex flex-col items-center bg-[#e1cdad]">
      {!product.isAvailable && (
        <div className="absolute inset-0 bg-muted/60 rounded-[24px]"></div>
      )}
      <div className="flex w-[130px] h-[130px] items-center rounded-[14px] justify-center mt-[10px] object-cover overflow-hidden">
        <Image
          // src={"/Joes-Logo-Whitebg.png"}
          src={product?.image || "/Joes-Logo-Whitebg.png"}
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
              hidden={!product.isAvailable}
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
