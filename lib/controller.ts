import { OrderProps, ProductProps, TransactionProps } from "@/types";
import { ItemsView, Order } from "@prisma/client";

export const getOrders = async (): Promise<OrderProps[]> => {
  const res = await fetch("/api/orders");
  const data = await res.json();
  return data;
};

export const createTransaction = async (): Promise<TransactionProps> => {
  const res = await fetch("/api/transaction");
  const data = await res.json();
  return data;
};

export const createCustomer = async ({ customer }: { customer: string }) => {
  return await fetch("/api/transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });
};
