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

const updateProduct = async (product) => {
  const res = await fetch(`/api/products/${product.id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
  const data = await res.json();
  return data;
};

const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export {
  useProducts,
  getProducts,
  useAddItems,
  updateProduct,
  useUpdateProduct,
};
