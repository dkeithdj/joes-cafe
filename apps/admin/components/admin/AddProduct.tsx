"use client";
import React, { useState } from "react";
import { Button } from "@ui/components/ui/button";
import { DialogClose, DialogFooter } from "@ui/components/ui/dialog";
import { Label } from "@ui/components/ui/label";
import { Input } from "@ui/components/ui/input";
import { Switch } from "@ui/components/ui/switch";
import { Select } from "@ui/components/ui/select";
// import { useCategories } from "@admin/hooks/useCategories";
// import { useAddProduct } from "@admin/hooks/useProducts";
import Image from "next/image";
import { ScrollArea } from "@ui/components/ui/scroll-area";
import { trpc } from "@admin/hooks/trpc";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);

  const [type, setType] = useState("");
  const [product, setProduct] = useState({
    name: "",
    category: {
      connect: {
        id: "",
      },
    },
    price: 0,
    isAvailable: true,
  });

  const { data: categories } = trpc.getCategories.useQuery();
  // const { mutate: addProduct, data } = useAddProduct();
  const mutation = trpc.createProduct.useMutation();

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    mutation.mutate({
      name: productName,
      category: category,
      price: price,
      image: "",
      isAvailable: isAvailable,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-3 gap-1.5">
        {/* <div className=" flex justify-center items-center rounded-lg row-span-full bg-[#f9ebd3]">
          <Input
            type="file"
            name="product-image"
            accept="image/*"
            className="w-24 h-24 opacity-0 absolute"
          />
          <Label htmlFor="product-image">
            <Image
              className="w-24 h-24 cursor-pointer"
              src="/add.svg"
              alt="add"
              width={100}
              height={100}
            />
          </Label>
        </div> */}
        <div className="col-span-2">
          <div>
            <Label htmlFor="productNname" className="">
              Product Name
            </Label>
            <Input
              id="productNname"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className=""
              required
            />
          </div>
          <div>
            <Label htmlFor="price" className="">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-2">
            <div className="col-span-1">
              <Label htmlFor="category" className="">
                Category
              </Label>
              <select
                id="category"
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg outline outline-[#664229b4] w-[100px]"
                required
              >
                <option value="" disabled selected>
                  Select...
                </option>
                {categories?.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-1">
              <Label htmlFor="isAvailable">Availabilty</Label>
              <div>
                <Switch
                  id="isAvailable"
                  onClick={() => setIsAvailable(!isAvailable)}
                  checked={isAvailable}
                  className="data-[state=checked]:bg-[#512711] data-[state=unchecked]:bg-[#f9ebd3]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter className="pt-4">
        <DialogClose>
          <Button>Add Product</Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
};

export default AddProduct;
