import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

const getOrders = async () => {
  const response = await fetch("/api/orders");
  const data = await response.json();
  return data;
};

const useOrders = () => {
  return useQuery({
    queryKey: ["order"],
    queryFn: getOrders,
  });
};

const getOrder = async ({ orderId }: { orderId: string }) => {
  const response = await fetch(`/api/orders/${orderId}`);
  const data = await response.json();
  return data;
};

const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder({ orderId }),
  });
};

const updateOrder = async ({
  orderId,
  staffId,
  paymentId,
  statusId,
}: {
  orderId: string;
  staffId: string;
  paymentId: string;
  statusId: string;
}) => {
  const response = await fetch(`/api/orders/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ staffId, paymentId, statusId }),
  });
  const data = await response.json();
  return data;
};

const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(updateOrder, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["orders", variables.orderId]);
    },
  });
};

export {
  getOrder,
  useOrder,
  fetchOrder,
  useAddOrder,
  useUpdateOrder,
  getOrders,
  useOrders,
};
