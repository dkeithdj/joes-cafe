"use client";

import { Button } from "@ui/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ui/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";
import { trpc } from "@customer/hooks/trpc";
import { itemsview } from "@repo/database";

type itemsView = Pick<
  itemsview,
  | "id"
  | "productid"
  | "productname"
  | "productimage"
  | "productprice"
  | "totalquantity"
  | "transactionid"
> & { totalamount: string | null; productimage: string | null };

const Checkout = ({
  items,
  totalAmount,
  tableId,
  transactionId,
}: {
  items: itemsView[];
  totalAmount: number;
  tableId: string;
  transactionId: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [submitted, setSubmitted] = useState(false);
  const {
    mutate: _placeOrder,
    isSuccess: isOrderPlaced,
    data,
    isError: isOrderError,
    error: orderError,
    // } = useAddOrder();
  } = trpc.createOrder.useMutation();

  const placeOrder = () => {
    _placeOrder({ tableId, transactionId, totalAmount });

    // if (isOrderPlaced) {
    // console.log("checkout", orderData);
    // console.log(pathname);

    // const data = await orderData.json();
    // console.log(data);
    // console.log(data.id);
    // Cookies.set("orderId", data.id);
    router.push(`${pathname}/checkout`);
    // }
  };

  return (
    <div>
      <div>
        <Tabs defaultValue="orders" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <Table>
              <TableCaption className="text-3xl text-black">
                <div>Total: PHP {totalAmount}.00</div>
                <Button
                  onClick={() => {
                    placeOrder();
                    setSubmitted(!submitted);
                  }}
                  disabled={submitted}
                  className="w-full text-xl"
                >
                  Confirm Order
                </Button>
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, i: number) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      {item.productname}
                    </TableCell>
                    <TableCell>{item.productprice}</TableCell>
                    <TableCell>{item.totalquantity}</TableCell>
                    <TableCell className="text-right">
                      PHP {item.totalamount}.00
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Checkout;
