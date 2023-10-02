import { ProductProps } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addItem } from "./useItems";

const getProducts = async (): Promise<ProductProps[]> => {
  const res = await fetch("/api/products");
  const data = await res.json();
  return data;
};

const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

const useAddItems = () => {
  const queryClient = useQueryClient();
  return useMutation(addItem, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export { useProducts, getProducts, useAddItems };
