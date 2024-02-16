"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@ui/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";
// import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import { useAddQuantity, useItems, useMinusQuantity } from "@/hooks/useItems";
// import { useAddOrder } from "@/hooks/useOrders";
import { useParams } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@ui/components/ui/dialog";
import Checkout from "./Checkout";
import { Button } from "@ui/components/ui/button";
import { trpc } from "@/hooks/trpc";
// import {cookies} from "next/headers"

const Basket = () => {
  const params = useParams();
  // cookies().
  const customer = Cookies.get("customer.customer");
  const transaction = Cookies.get("customer.transaction");
  const utils = trpc.useUtils();

  const {
    data: items,
    isSuccess,
    isLoading,
    isFetching,
  } = trpc.getItem.useQuery({ transactionId: transaction! });

  const {
    mutate: _minusItem,
    isSuccess: mIsSuccess,
    data: mData,
    isError: mIsError,
    error: mError,
  } = trpc.deleteItem.useMutation({
    onSuccess: () => utils.getItem.invalidate(),
  });

  const {
    mutate: _addItem,
    isSuccess: aIsSuccess,
    data: aData,
    isError: aIsError,
    error: aError,
  } = trpc.addItem.useMutation({ onSuccess: () => utils.getItem.invalidate() });

  const addItem = (
    productId: string,
    transactionId: string,
    customerId: string,
  ) => {
    _addItem({ productId, transactionId, customerId });
  };

  const minusItem = (itemId: string) => {
    _minusItem({ itemId });
  };

  const totalPayment =
    items &&
    items
      .map((item) => Number(item.totalAmount))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  // console.log(items);

  const {
    mutate: _placeOrder,
    isSuccess: isOrderPlaced,
    data: orderData,
    isError: isOrderError,
    error: orderError,
  } = trpc.createOrder.useMutation();

  const placeOrder = ({
    tableId,
    transactionId,
    totalAmount,
  }: {
    tableId: string;
    transactionId: string;
    totalAmount: number;
  }) => {
    _placeOrder({ tableId, transactionId, totalAmount });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex relative rounded-lg shadow-sm">
          {items && items.length > 0 ? (
            <div>
              {!isLoading && (
                <div className="absolute right-[-8px] top-[-8px] ml-2 inline-block whitespace-nowrap bg-red-400 rounded-full px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none">
                  {items?.length}
                </div>
              )}
            </div>
          ) : (
            <div></div>
          )}
          <div className="w-10 h-10 bg-[#f9ebd3] rounded-l-lg flex justify-center items-center border-r">
            ☕
          </div>
          <div className="w-24 h-10 bg-white rounded-r-lg flex justify-center items-center border-l">
            Coffee Basket
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col">
        {items && items.length !== 0 ? (
          <div>
            {items &&
              items.map((item, i) => (
                <Card
                  key={i}
                  className=" h-[100px] rounded-[24px] flex flex-row items-center  space-x-2 my-2"
                >
                  <div className="flex w-[80px] h-[80px] items-center rounded-[14px] justify-center ml-[10px]  object-cover overflow-hidden">
                    <Image
                      // src={"/Joes-Logo-Whitebg.png"}
                      src={item?.productImage}
                      alt={item.productName}
                      width={90}
                      height={90}
                    />
                  </div>
                  <div className="grid grid-cols-2 pr-2 py-2 w-[80%]">
                    <div className="font-bold text-base">
                      {item.productName}
                    </div>
                    <div className="text-end">
                      PHP {item.totalAmount + ""}.00
                    </div>
                    <div className="col-span-2">
                      <div className="h-10 w-full">
                        <div className="flex flex-row h-8 w-full rounded-lg relative bg-transparent mt-1">
                          <button
                            onClick={() => minusItem(item.id)}
                            className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                          >
                            <span className="m-auto text-2xl font-thin">-</span>
                          </button>
                          <input
                            type="number"
                            className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
                            name="custom-input-number"
                            value={item.totalQuantity}
                            readOnly
                          ></input>
                          <button
                            onClick={() =>
                              addItem(
                                item.productId,
                                item.transactionId,
                                customer,
                              )
                            }
                            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                          >
                            <span className="m-auto text-2xl font-thin">+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        ) : (
          <div>Basket is empty, Buy our Products!</div>
        )}
        <div className="flex flex-grow w-full justify-end pt-2">
          <Dialog>
            {items?.length !== 0 && (
              <DialogTrigger className="">
                <div className="">
                  <Button className="">Proceed to Checkout</Button>
                </div>
              </DialogTrigger>
            )}
            <DialogContent>
              <Checkout
                items={items}
                totalAmount={totalPayment}
                tableId={params.slug}
                transactionId={transaction}
              />
            </DialogContent>
          </Dialog>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Basket;
