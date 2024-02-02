import { PaymentMethod } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const getPaymethod = async (): Promise<PaymentMethod[]> => {
  const response = await fetch("/api/paymethod");
  const data = await response.json();
  return data;
};

export const usePaymethod = () => {
  return useQuery({
    queryKey: ["paymethod"],
    queryFn: getPaymethod,
  });
};
