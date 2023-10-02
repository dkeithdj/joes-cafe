import { useMutation, useQueryClient } from "@tanstack/react-query";

const createTransaction = async ({ name }: { name: string }) => {
  const response = await fetch("/api/transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  });
  return response;
};

const useAddTransaction = () => {
  // const queryClient = useQueryClient();
  return useMutation(createTransaction);
};

export { createTransaction, useAddTransaction };
