import { Staff } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const getStaff = async () => {
  const response = await fetch("/api/staff");
  const data = await response.json();
  return data;
};

export const useStaff = () => {
  return useQuery({
    queryKey: ["staff"],
    queryFn: getStaff,
  });
};
