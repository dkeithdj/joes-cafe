import React from "react";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import Image from "next/image";
import { Switch } from "@ui/components/ui/switch";
import { DialogClose, DialogFooter } from "@ui/components/ui/dialog";
import { Button } from "@ui/components/ui/button";

const ProductForm = ({
  type,
  submitting,
  product,
  setProduct,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-3 gap-1.5">
        <div className=" flex justify-center items-center rounded-lg row-span-full bg-[#f9ebd3]">
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
        </div>
        <div className="col-span-2">
          <div>
            <Label htmlFor="productNname" className="">
              Product Name
            </Label>
            <Input
              id="productNname"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
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
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
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
                onChange={(e) =>
                  setProduct({
                    ...product,
                    category: { connect: { id: e.target.value } },
                  })
                }
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
                  onChange={(e) =>
                    setProduct({ ...product, isAvailable: e.target.value })
                  }
                  checked={product.isAvailable}
                  className="data-[state=checked]:bg-[#512711] data-[state=unchecked]:bg-[#f9ebd3]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter className="pt-4">
        <DialogClose>
          <Button>{type} Product</Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
};

export default ProductForm;
