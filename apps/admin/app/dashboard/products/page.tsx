"use client";
import Loading from "@admin/components/Loading";
import AddProduct from "@admin/components/admin/AddProduct";
import Products from "@admin/components/admin/Products";
import { Button } from "@ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog";
import React, { useState } from "react";
import { trpc } from "@admin/hooks/trpc";
import EditProduct from "@admin/components/admin/EditProduct";
const AdminProducts = () => {
  const [open, setOpen] = useState(false);
  const {
    data: products,
    isSuccess,
    isLoading,
    isError,
    error,
  } = trpc.getProducts.useQuery(null);

  const [availability, setAvailability] = useState(true);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="w-auto mx-14">
      {/* <Dashboard /> */}
      <div className="flex flex-row justify-between">
        <div className="text-6xl text-[#603D04] py-4 ">Products</div>
        <div className="flex flex-row items-center gap-x-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div>Add Product</div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Product</DialogTitle>
                <DialogDescription>Add product details.</DialogDescription>
              </DialogHeader>
              <AddProduct setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex pb-4">
        <div className="w-fit h-10 items-center justify-center rounded-md bg-[#E1CDAD] p-1 text-muted-foreground">
          <button
            disabled={availability}
            onClick={() => setAvailability(true)}
            className="inline-flex disabled:bg-[#512711] disabled:text-[#E1CDAD] items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none  "
          >
            Available
          </button>
          <button
            disabled={!availability}
            onClick={() => setAvailability(false)}
            className="inline-flex disabled:bg-[#512711] disabled:text-[#E1CDAD] items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none "
          >
            Unavailable
          </button>
        </div>
      </div>
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Loading length={6} height="150" />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        {isSuccess &&
          products
            .filter((product) => availability === product.isAvailable)
            .map((product) => (
              <EditProduct key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default AdminProducts;
