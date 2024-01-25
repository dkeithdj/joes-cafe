import { ProductProps } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addItem } from "./useItems";

export const getProducts = async (): Promise<ProductProps[]> => {
  const res = await fetch("/api/products");
  const data = await res.json();
  return data;
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useAddItems = () => {
  const queryClient = useQueryClient();
  return useMutation(addItem, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export const updateProduct = async (product) => {
  const res = await fetch(`/api/products/${product.id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
  const data = await res.json();
  return data;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const addProduct = async (product) => {
  const res = await fetch("/api/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
  const data = await res.json();
  return data;
};
export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const uploadImage = async (formData) => {
  const res = await fetch("api/upload", {
    body: formData,
  });
  const data = await res.json();
  return data;
};

export const useUploadImage = () => {
  const queryClient = useQueryClient();
  return useMutation(uploadImage, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
