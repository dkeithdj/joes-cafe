"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
// import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import { useAddQuantity, useItems, useMinusQuantity } from "@/hooks/useItems";
import { useAddItems } from "@/hooks/useProducts";
import { Button } from "./ui/button";
import { useAddOrder } from "@/hooks/useBasket";
import { useParams } from "next/navigation";

const Basket = () => {
  const params = useParams();
  let customerCookie = Cookies.get("customer");
  if (customerCookie) {
    customerCookie = JSON.parse(customerCookie);
  }
  const { transaction, customer } = customerCookie;

  const {
    data: items,
    isSuccess,
    isLoading,
    isFetching,
  } = useItems(transaction);

  const {
    mutate: _minusItem,
    isSuccess: mIsSuccess,
    data: mData,
    isError: mIsError,
    error: mError,
  } = useMinusQuantity();

  const {
    mutate: _addItem,
    isSuccess: aIsSuccess,
    data: aData,
    isError: aIsError,
    error: aError,
  } = useAddQuantity();

  const addItem = (
    productId: string,
    transactionId: string,
    customerId: string
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

  console.log(items);

  const {
    mutate: _placeOrder,
    isSuccess: isOrderPlaced,
    data: orderData,
    isError: isOrderError,
    error: orderError,
  } = useAddOrder();

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

  console.log(params.slug, transaction, totalPayment);
  if (isOrderPlaced) {
    console.log("yay", orderData);
    // do a router push on a loading  screen
    // create new transactionId
    //update the transactionId from cookies
  }

  if (isOrderError) {
    console.log(orderError);
  }

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
      <PopoverContent align="end" className="flex flex-col">
        {items && items.length !== 0 ? (
          <div>
            {items &&
              items.map((item, i) => (
                <Card key={i} className="flex flex-row">
                  <div className="">
                    <Image
                      src={"/coffee_default.png"}
                      alt={item.productName}
                      width={50}
                      height={50}
                    />
                  </div>
                  <div>
                    <div>{item.productName}</div>
                    <div>PHP {item.totalAmount + ""}.00</div>
                    <div>
                      <div className="h-10 w-32">
                        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
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
                                customer
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
        <div className="">
          <Button
            onClick={() =>
              placeOrder({
                tableId: params.slug,
                transactionId: transaction,
                totalAmount: totalPayment,
              })
            }
            className="w-full"
          >
            Checkout PHP {totalPayment}.00
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Basket;
