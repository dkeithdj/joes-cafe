"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@ui/components/ui/button";
import { DialogClose, DialogFooter } from "@ui/components/ui/dialog";
import { Label } from "@ui/components/ui/label";
import { Input } from "@ui/components/ui/input";
import { Switch } from "@ui/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select";
import Image from "next/image";
import { trpc } from "@admin/hooks/trpc";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  category: z.string().min(1, { message: "Select a category" }),
  price: z.coerce.number().positive(),
  image: z.any(),
  isAvailable: z.boolean(),
});

const AddProduct = () => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      image: "",
      isAvailable: true,
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    // setPreview(acceptedFiles.map((file) => Object.assign(file,{preview: URL.createObjectURL(file)}) ));
    const file = new FileReader();

    file.onload = () => {
      setPreview(file.result);
    };

    file.readAsDataURL(acceptedFiles[0]);
  }, []);
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ onDrop });

  const { data: categories } = trpc.getCategories.useQuery();
  // const { mutate: addProduct, data } = useAddProduct();
  const mutation = trpc.createProduct.useMutation();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // mutation.mutate({
    //   name: productName,
    //   category: category,
    //   price: price,
    //   image: "",
    //   isAvailable: isAvailable,
    // });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-3 gap-1.5">
          <div
            {...getRootProps({
              className:
                "flex justify-center items-center rounded-lg row-span-full bg-[#f9ebd3] h-[180px]",
            })}
          >
            <Input
              {...getInputProps()}
              className="w-24 h-24 opacity-0 absolute"
            />
            <Label htmlFor="product-image">
              {preview ? (
                <img
                  className="cursor-pointer object-cover h-[180px] rounded-lg"
                  src={preview as string}
                  alt={acceptedFiles[0]?.name}
                />
              ) : (
                <Image
                  className="w-24 h-24 cursor-pointer"
                  src={"/add.svg"}
                  alt="add"
                  width={100}
                  height={100}
                />
              )}
            </Label>
          </div>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} className="col-span-3" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <div> */}
            {/*   <Label htmlFor="productNname" className=""> */}
            {/*     Product Name */}
            {/*   </Label> */}
            {/*   <Input */}
            {/*     id="productNname" */}
            {/*     value={productName} */}
            {/*     onChange={(e) => setProductName(e.target.value)} */}
            {/*     className="" */}
            {/*     required */}
            {/*   /> */}
            {/* </div> */}
            {/* <div> */}
            {/*   <Label htmlFor="price" className=""> */}
            {/*     Price */}
            {/*   </Label> */}
            {/*   <Input */}
            {/*     id="price" */}
            {/*     type="number" */}
            {/*     value={price} */}
            {/*     onChange={(e) => setPrice(Number(e.target.value))} */}
            {/*     className="col-span-3" */}
            {/*     required */}
            {/*   /> */}
            {/* </div> */}
            <div className="grid grid-cols-3">
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Category</SelectLabel>
                              {categories?.map((item, i) => (
                                <SelectItem key={i} value={item.id}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <Label htmlFor="category" className=""> */}
                {/*   Category */}
                {/* </Label> */}
                {/* <select */}
                {/*   id="category" */}
                {/*   onChange={(e) => setCategory(e.target.value)} */}
                {/*   className="rounded-lg outline outline-[#664229b4] w-[100px]" */}
                {/*   required */}
                {/* > */}
                {/*   <option value="" disabled selected> */}
                {/*     Select... */}
                {/*   </option> */}
                {/*   {categories?.map((item, i) => ( */}
                {/*     <option key={i} value={item.id}> */}
                {/*       {item.name} */}
                {/*     </option> */}
                {/*   ))} */}
                {/* </select> */}
              </div>

              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="isAvailable"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability</FormLabel>
                      <FormControl>
                        <div className="flex justify-center items-center pt-2">
                          <Switch
                            id="isAvailable"
                            onCheckedChange={field.onChange}
                            checked={field.value}
                            className="data-[state=checked]:bg-[#512711] data-[state=unchecked]:bg-[#f9ebd3]"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <Label htmlFor="isAvailable">Availabilty</Label> */}
                {/* <div> */}
                {/*   <Switch */}
                {/*     id="isAvailable" */}
                {/*     onClick={() => setIsAvailable(!isAvailable)} */}
                {/*     checked={isAvailable} */}
                {/*     className="data-[state=checked]:bg-[#512711] data-[state=unchecked]:bg-[#f9ebd3]" */}
                {/*   /> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="pt-4">
          <DialogClose>
            <Button type="submit">Add Product</Button>
          </DialogClose>
        </DialogFooter>
        <Button type="submit">Add Product</Button>
      </form>
    </Form>
  );
};

export default AddProduct;
