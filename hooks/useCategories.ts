import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch("/api/categories");
  const data = await response.json();
  return data;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
