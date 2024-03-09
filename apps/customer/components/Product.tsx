"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@ui/components/ui/card";
import Image from "next/image";
import { ProductProps } from "@customer/types";
import Cookies from "js-cookie";
import { trpc } from "@customer/hooks/trpc";

const Product = ({
  product,
}: {
  product: {
    name: string;
    price: number;
    category: {
      name: string;
      id: string;
    };
    image: string | null;
    isAvailable: boolean;
    id: string;
  };
}) => {
  const utils = trpc.useUtils();
  const {
    mutate: _addItem,
    isSuccess,
    data,
    isError,
    error,
  } = trpc.addItem.useMutation({
    onSuccess(data, variables, context) {
      utils.getItem.invalidate();
    },
  });
  const productId = product.id;

  const customerId = Cookies.get("customer.customer") as string;
  const transactionId = Cookies.get("customer.transaction") as string;

  const addItem = () => {
    _addItem({ transactionId, productId, customerId });
  };

  return (
    <Card className="relative w-[250px] h-full m-4 rounded-[24px] flex flex-col items-center bg-[#221E1D]">
      {!product.isAvailable && (
        <div className="absolute inset-0 bg-muted/60 h-full rounded-[24px] overflow-hidden"></div>
      )}
      <div className="flex w-[130px] h-[130px] items-center rounded-[14px] justify-center mt-[10px] object-cover overflow-hidden ">
        <img
          src={
            (product.image &&
              `http://${process.env.NEXT_PUBLIC_HOST_URL}:3000/${product.image}`) ||
            "/Joes-Logo-Whitebg.png"
          }
          alt={product.name}
        />
      </div>
      <div className="w-[200px] mt-4 ">
        <div className="">
          <div className="flex items-start justify-between">
            <div className="bebasNeue text-xl leading-4 text-[#B3875D]">
              {product.name}
            </div>
            <Image
              src={"/add.svg"}
              alt="add"
              width={30}
              height={30}
              className=""
              onClick={addItem}
              hidden={!product.isAvailable}
            />
          </div>
        </div>
        <div className="">
          <div className="font-['Yantramanav'] font-semibold text-[#D4B797]">
            PHP {product.price}.00
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Product;
