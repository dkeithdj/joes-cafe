"use client";
import React, { useState } from "react";
import { Card } from "@ui/components/ui/card";
import Image from "next/image";
import { useProducts, useUpdateProduct } from "@/hooks/useProducts";
import { Switch } from "@ui/components/ui/switch";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog";
import { Button } from "@ui/components/ui/button";
import { Label } from "@ui/components/ui/label";
import { Input } from "@ui/components/ui/input";
import { useRouter } from "next/navigation";
// import { DialogClose } from "@radix-ui/react-dialog";

const Products = ({ product }) => {
  const [productName, setProductName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [isAvailable, setIsAvailable] = useState(product.isAvailable);

  const { mutate, data } = useUpdateProduct();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      ...product,
      name: productName,
      price: price,
      isAvailable: isAvailable,
    });
  };

  return (
    <Card className=" h-[150px] max-w-[500px] rounded-[24px] flex flex-row items-center  space-x-2">
      <div className="flex w-[130px] h-[130px] items-center rounded-[14px] justify-center ml-[10px]  object-cover overflow-hidden">
        <Image
          // src={"/Joes-Logo-Whitebg.png"}
          src={product.image || "/Joes-Logo-Whitebg.png"}
          alt="coffee"
          width={130}
          height={130}
        />
      </div>
      <div className="">
        <div className="">
          <div className="flex flex-col">
            <div className="text-2xl">{product.name}</div>
            <div className="font-['Yantramanav'] font-semibold">
              PHP {product.price}.00
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-[50px]">
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Product</DialogTitle>
                  <DialogDescription>Edit product.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="productNname" className="text-right">
                        Product Name
                      </Label>
                      <Input
                        id="productNname"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">
                        Price
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="isAvailable" className="text-right">
                        Availability
                      </Label>
                      <Switch
                        onClick={() => setIsAvailable(!isAvailable)}
                        checked={isAvailable}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose>
                      <Button>Save changes</Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Products;
