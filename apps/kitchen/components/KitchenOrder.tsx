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
    <div className={`bg-[${color}] rounded-lg m-2 `}>
      <CardContent className="py-2">
        <table className="w-full">
          <tbody className="inline-block align-bottom w-full">
            <tr className="flex justify-end">
              <td className="w-full text-white alata">Order #:</td>
              <td className="w-full text-end text-white alata">{order.id}</td>
            </tr>
            <tr className="flex justify-end">
              <td className="w-full text-white alata">Name:</td>
              <td className="w-full text-white text-end alata">
                {order.transaction.customer.name}
              </td>
            </tr>
            <tr className="flex justify-end">
              <td className="w-full text-white alata">Table:</td>
              <td className="w-full text-white text-end alata">{order.table.number}</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
      <Separator className="w-[95%] mx-auto bg-black" />
      <CardContent className="py-2">
        <table className="w-full">
          <tbody>
            {isSuccess &&
              itemsData.map((item, i) => (
                <tr className="flex justify-end" key={i}>
                  <td className="w-full text-black alata">{item.productname}</td>
                  <td className="w-full text-black text-end alata">x{item.totalquantity}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </CardContent>
      <CardContent className="py-2">
        <Button className="w-full alata" onClick={() => handleOrder(order.id)}>
          {text}
        </Button>
      </CardContent>
    </div>
  );
};

export default KitchenOrder;
