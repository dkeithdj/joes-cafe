import { Order_Status } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const getStatus = async (): Promise<Order_Status[]> => {
  const response = await fetch("/api/status");
  const data = await response.json();
  return data;
};

export const useStatus = () => {
  return useQuery({
    queryKey: ["status"],
    queryFn: getStatus,
  });
};
