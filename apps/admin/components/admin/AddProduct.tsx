"use client";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Button } from "@ui/components/ui/button";
import { DialogClose, DialogFooter } from "@ui/components/ui/dialog";
import { Label } from "@ui/components/ui/label";
import { Input } from "@ui/components/ui/input";
import { Switch } from "@ui/components/ui/switch";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
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
import { RouterInputs, trpc } from "@admin/hooks/trpc";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpg", "image/jpeg"];
const MAX_IMAGE_SIZE = 4; //In MegaBytes

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

const formSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  category: z.string().min(1, { message: "Select a category" }),
  price: z.coerce.number().positive(),
  image: z
    .custom<FileList>()
    .refine((files) => {
      return Array.from(files ?? []).length !== 0;
    }, "Image is required")
    .refine((files) => {
      return Array.from(files ?? []).every(
        (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE
      );
    }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      );
    }, "File type is not supported"),
  isAvailable: z.boolean(),
});

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}
const AddProduct = () => {
  const utils = trpc.useUtils();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  // const [preview, setPreview] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      isAvailable: true,
    },
  });

  // FIX: create api to save image

  const { data: categories } = trpc.getCategories.useQuery();

  const { mutate } = trpc.createProduct.useMutation({
    onSuccess: () => {
      utils.getProducts.invalidate();
    },
    onError: (error) => {
      toast.warning(error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { name, category, price, image, isAvailable } = values;

    const formData = new FormData();
    formData.append("productName", JSON.stringify({ name: name }));
    formData.append("file", image[0]);

    fetch(`http://localhost:3000/api/uploadProductImage`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data: { imagePath: string }) => {
        mutate({
          name: name,
          category: category,
          price: price,
          image: data.imagePath,
          isAvailable: isAvailable,
        });
      })
      .catch((err) => toast("Something went wrong, try again"));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-3 gap-1.5">
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem className="flex flex-col justify-center items-center rounded-lg row-span-full bg-[#f9ebd3] h-[180px]">
                <FormLabel>
                  {preview ? (
                    <img
                      className="cursor-pointer object-cover h-[180px] rounded-lg"
                      src={preview as string}
                      alt="upload"
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
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...rest}
                    onChange={(event) => {
                      const { files, displayUrl } = getImageData(event);
                      setPreview(displayUrl);
                      onChange(files);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
