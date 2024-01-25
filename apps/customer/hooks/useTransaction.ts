import { CustomerProps } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createTransaction = async ({ name }: { name: string }) => {
  const response = await fetch("/api/transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  });
  const data = await response.json();
  return data;
};

export const useAddTransaction = () => {
  // const queryClient = useQueryClient();
  return useMutation(createTransaction);
};

export const updateTransaction = async (customer: CustomerProps) => {
  const response = await fetch(`/api/transaction/${customer.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });
  const data = await response.json();
  return data;
};

export const useUpdateTransaction = () => {
  return useMutation(updateTransaction);
};
