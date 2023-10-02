import { useMutation } from "@tanstack/react-query";
import { createTransaction } from "./useTransaction";

const fetchOrder = async ({
  tableId,
  transactionId,
  totalAmount,
}: {
  tableId: string;
  transactionId: string;
  totalAmount: number;
}) => {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tableId: tableId,
      transactionId: transactionId,
      totalAmount: totalAmount,
    }),
  });
  return response;
};

const useAddOrder = () => {
  return useMutation(fetchOrder);
};

export { fetchOrder, useAddOrder };
