"use client";
import { CardContent } from "@ui/components/ui/card";
import { Button } from "@ui/components/ui/button";
import { Separator } from "@ui/components/ui/separator";
import React from "react";
import { RouterOutputs } from "@repo/api";
import { trpc } from "@kitchen/hooks/trpc";

type OrderOptions = RouterOutputs["getKitchenOrders"][0];

const KitchenOrder = ({
  order,
  handleOrder,
  text,
  color,
}: {
  order: OrderOptions;
  handleOrder: (e: string) => void;
  text: string;
  color: string;
}) => {
  const { data: itemsData, isSuccess } = trpc.getKitchenItems.useQuery({
    transactionId: order.transaction.id,
  });
  return (
    <div className={`bg-[${color}] rounded-lg m-2`}>
      <CardContent className="py-2">
        <table>
          <tbody>
            <tr>
              <td className="w-[8ch] text-ellipsis">Order #:</td>
              <td className="max-w-[17ch] text-end truncate">{order.id}</td>
            </tr>
            <tr>
              <td className="w-[8ch]">Name:</td>
              <td className="w-[17ch] text-end">
                {order.transaction.customer.name}
              </td>
            </tr>
            <tr>
              <td className="w-[8ch]">Table:</td>
              <td className="w-[17ch] text-end">{order.table.number}</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
      <Separator className="w-[90%] mx-auto" />
      <CardContent className="py-2">
        <table>
          <tbody>
            {isSuccess &&
              itemsData.map((item, i) => (
                <tr className="" key={i}>
                  <td className="w-[20ch]">{item.productname}</td>
                  <td className="w-[5ch] text-end">x{item.totalquantity}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </CardContent>
      <CardContent className="py-2">
        <Button className="w-full" onClick={() => handleOrder(order.id)}>
          {text}
        </Button>
      </CardContent>
    </div>
  );
};

export default KitchenOrder;
