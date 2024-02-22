"use client";
import React, { FormEvent, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/components/ui/table";
import { trpc, type ReactQueryOptions, RouterOutputs } from "@admin/hooks/trpc";

type OrderOptions = RouterOutputs["getOrders"][0];

const _Orders = ({ order, staff }: { order: OrderOptions; staff: string }) => {
  const utils = trpc.useUtils();

  const [payMethod, setPayMethod] = useState("");
  const [status, setStatus] = useState("");

  const { data: dataPaymethod } = trpc.getPaymentMethod.useQuery();
  console.log(dataPaymethod);

  const { mutate: updateOrder } = trpc.updateOrder.useMutation({
    onSuccess: () => {
      utils.getOrderById.invalidate();
      utils.getOrders.invalidate();
    },
  });
  console.log("hihi", staff);

  const handleOrderProcess = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (staff && payMethod) {
      updateOrder({
        orderId: order.id,
        statusId: status,
        staffId: staff,
        paymentId: payMethod,
      });
    } else {
      alert("empty things");
    }
  };

  const { data: items } = trpc.getItem.useQuery({
    transactionId: order.transaction?.id!,
  });

  const totalPayment =
    items &&
    items
      .map((item) => Number(item.totalamount))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <div className="py-4">
      <div className="grid grid-cols-2 w-full h-24 bg-[#E1CDAD] rounded-tl-3xl rounded-tr-3xl drop-shadow-lg">
        <div className="col-span-1 flex ml-5 items-end w-auto h-12">
          <div className="text-lg text-[#512711]">
            Name:{" "}
            <span className="font-bold">
              {order.transaction?.customer?.name}
            </span>
          </div>
        </div>
        <div className="col-span-1 flex ml-5 items-end w-auto h-12">
          <div className="text-lg text-[#512711]">
            Table Number:{" "}
            <span className="font-bold">{order.table.number}</span>
          </div>
        </div>
        <div className="col-span-1 flex ml-5 items-end w-auto h-12">
          <div className="text-lg text-[#512711]">
            Order Number: <span className="font-bold">{order.id}</span>
          </div>
        </div>
        <div className="col-span-1 flex ml-5 items-end w-auto h-12">
          <div className="text-lg text-[#512711]">
            Order Date:{" "}
            <span className="font-bold">{order.date.toString()}</span>
          </div>
        </div>
      </div>
      <div className="relative w-full bg-white rounded-br-3xl rounded-bl-3xl drop-shadow-lg">
        <Table>
          <TableCaption className="text-3xl text-black">
            {/* Total: PHP {totalAmount}.00 */}
          </TableCaption>
          <TableHeader>
            <TableRow className="text-lg ">
              <TableHead className="font-bold  text-[#B09478] w-60 ">
                Product No.
              </TableHead>
              <TableHead className="font-bold text-[#B09478]">Item</TableHead>
              <TableHead className="font-bold text-[#B09478]">Qty.</TableHead>
              <TableHead className="font-bold text-right text-[#B09478]">
                Price
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items &&
              items.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    {item.productid}
                  </TableCell>
                  <TableCell>{item.productname}</TableCell>
                  <TableCell>{item.totalquantity}</TableCell>
                  <TableCell className="text-right ">
                    PHP {Number(item.totalamount)}.00
                  </TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell className="font-medium"></TableCell>
              <TableCell className="font-bold">Total:</TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right font-bold">
                PHP {totalPayment}.00
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <form
          onSubmit={handleOrderProcess}
          className="relative px-4 pb-4 w-full h-14 bg-white rounded-br-3xl rounded-bl-3xl flex flex-row items-center justify-between"
        >
          <div className="">
            <div className="flex flex-row items-center gap-x-4">
              Payment Method:{" "}
              <span>
                {!order.paymentMethod ? (
                  <select
                    name="paymentMethod"
                    onChange={(e) => setPayMethod(e.target.value)}
                    className="rounded-lg outline outline-[#664229b4] w-[100px] h-8"
                  >
                    <option value="" disabled selected>
                      Select...
                    </option>
                    {dataPaymethod?.map((item, i) => (
                      <option key={i} value={item.id}>
                        {item.paymentType}
                      </option>
                    ))}
                  </select>
                ) : (
                  <>{order.paymentMethod.paymentType}</>
                )}
              </span>
            </div>
          </div>
          {order.status?.id === 1 ? (
            <div className="">
              <div className="flex flex-row">
                <div className="w-24 h-9">
                  <button
                    onClick={(e) => setStatus(e.currentTarget.value)}
                    value={"3"}
                    className="w-full h-full rounded-bl-[7px] rounded-tl-[7px] text-sm text-[#512711] outline outline-[#664229] hover:bg-slate-300"
                  >
                    Decline
                  </button>
                </div>
                <div className="w-24 h-9 bg-[#664229]">
                  <button
                    onClick={(e) => setStatus(e.currentTarget.value)}
                    value={"2"}
                    className="w-full h-full rounded-br-[7px] rounded-tr-[7px] text-sm text-[#F9EBD3] outline outline-[#664229] hover:bg-[#512711]"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-x-4">
              <div>Processed by: </div>
              <span>
                {order.staff?.first_name}{" "}
                <span className="font-bold">{order.staff?.last_name}</span>
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default _Orders;
