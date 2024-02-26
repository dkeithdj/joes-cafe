"use client";
import { CardContent } from "@ui/components/ui/card";
import { Button } from "@ui/components/ui/button";
import { Separator } from "@ui/components/ui/separator";
import React from "react";

const KitchenOrder = ({
  order,
}: {
  order: {
    id: string;
    name: string;
    table: string;
    status: string;
    items: {
      id: string;
      name: string;
      quantity: number;
    }[];
  };
}) => {
  return (
    <div className="bg-[#D2B48C] rounded-lg m-2">
      <CardContent className="py-2">
        <table>
          <tr>
            <td className="w-[15ch]">Order Number:</td>
            <td className="w-[10ch] text-end">{order.id}</td>
          </tr>
          <tr>
            <td className="w-[15ch]">Name:</td>
            <td className="w-[10ch] text-end">{order.name}</td>
          </tr>
          <tr>
            <td className="w-[15ch]">Table:</td>
            <td className="w-[10ch] text-end">{order.table}</td>
          </tr>
        </table>
      </CardContent>
      <Separator className="w-[90%] mx-auto" />
      <CardContent className="py-2">
        <table>
          {order.items.map((item) => (
            <tr className="">
              <td className="w-[15ch]">{item.name}</td>
              <td className="w-[10ch] text-end">x{item.quantity}</td>
            </tr>
          ))}
        </table>
      </CardContent>
      <CardContent className="py-2">
        <Button>[dynamic]</Button>
      </CardContent>
    </div>
  );
};

export default KitchenOrder;
