import { ItemsView } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getItems = async (transaction: string): Promise<ItemsView[]> => {
  const res = await fetch(`/api/items?transactionId=${transaction}`);
  const data = await res.json();
  return data;
};

const useItems = (transactionId: string) => {
  return useQuery({
    queryKey: ["items", transactionId],
    queryFn: () => getItems(transactionId),
  });
};

const addItem = async ({
  transactionId,
  productId,
  customerId,
}: {
  transactionId: string;
  productId: string;
  customerId: string;
}) => {
  const response = await fetch("/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transactionId: transactionId,
      productId: productId,
      customerId: customerId,
    }),
  });
  return response;
};

const deleteItem = async ({ itemId }: { itemId: string }) => {
  const response = await fetch("/api/items", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      itemId: itemId,
    }),
  });
  return response;
};

const useMinusQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteItem, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};
const useAddQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation(addItem, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export { useItems, getItems, addItem, useMinusQuantity, useAddQuantity };
