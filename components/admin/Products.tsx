"use client";
import React, { useState } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { useProducts } from "@/hooks/useProducts";
import { Switch } from "../ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const Products = ({ product }) => {
  const [productName, setProductName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [isAvailable, setIsAvailable] = useState(product.isAvailable);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...product,
      name: productName,
      price: price,
      isAvailable: isAvailable,
    });
    // console.log(e.target.price.value);
  };

  return (
    <Card className=" w-full h-[150px] rounded-[24px] flex flex-row items-center ">
      <div className="flex w-[130px] h-[130px] items-center rounded-[14px] justify-center mt-[10px] bg-red-400 object-cover overflow-hidden">
        <Image
          src={"/coffee_default.png"}
          alt="coffee"
          width={130}
          height={130}
        />
      </div>
      <div className="">
        <div className="">
          <div className="flex flex-col">
            <div className="text-2xl leading-4">{product.name}</div>
            <div className="font-['Yantramanav'] font-semibold">
              PHP {product.price}.00
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Product</DialogTitle>
                  <DialogDescription>
                    Edit the product details.
                  </DialogDescription>
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
                    <Button>Save changes</Button>
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
