"use client";

import { useAddOrder } from "@/hooks/useOrders";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Checkout = ({ items, totalAmount, tableId, transactionId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    mutate: _placeOrder,
    isSuccess: isOrderPlaced,
    data: orderData,
    isError: isOrderError,
    error: orderError,
  } = useAddOrder();

  const placeOrder = () => {
    _placeOrder({ tableId, transactionId, totalAmount });

    // if (isOrderPlaced) {
    //   console.log("checkout", orderData);
    //   console.log(pathname);

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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="checkout">Checkout</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <Table>
              <TableCaption className="text-3xl text-black">
                Total: PHP {totalAmount}.00
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
                {items.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      {item.productName}
                    </TableCell>
                    <TableCell>{item.productPrice}</TableCell>
                    <TableCell>{item.totalQuantity}</TableCell>
                    <TableCell className="text-right">
                      PHP {item.totalAmount}.00
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="checkout">
            <Table>
              <TableCaption className="">
                <Button onClick={placeOrder} className="w-full text-xl">
                  Confirm Order
                </Button>
              </TableCaption>

              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>[name]</TableCell>
                </TableRow>
              </TableBody>

              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>[date]</TableCell>
                </TableRow>
              </TableBody>

              <TableHeader>
                <TableRow>
                  <TableHead>Reference String</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{transactionId}</TableCell>
                </TableRow>
              </TableBody>

              <TableHeader>
                <TableRow>
                  <TableHead>Table No.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>[table no.]</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Checkout;
