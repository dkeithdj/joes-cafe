"use client";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Button } from "@ui/components/ui/button";
import { Card } from "@ui/components/ui/card";
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
import { RouterInputs, RouterOutputs, trpc } from "@admin/hooks/trpc";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { DialogClose } from "@radix-ui/react-dialog";
type ProductOptions = RouterOutputs["getProducts"][0];

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
        (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE,
      );
    }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type),
      );
    }, "File type is not supported")
    .or(z.string()),
  isAvailable: z.boolean(),
});

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image),
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}
const EditProduct = ({ product }: { product: ProductOptions }) => {
  const utils = trpc.useUtils();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(
    `http://${process.env.NEXT_PUBLIC_HOST_URL}:3000/${product.image}`,
  );
  const [open, setOpen] = useState(false);
  // const [preview, setPreview] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      category: product.category.id,
      price: product.price,
      image: product.image as string,
      isAvailable: product.isAvailable,
    },
  });

  const { data: categories } = trpc.getCategories.useQuery();

  const { mutate } = trpc.updateProduct.useMutation({
    onSuccess: () => {
      utils.getProducts.invalidate();
      utils.getAllProducts.invalidate();
      toast.success("Updated Product");
    },
    onError: (error) => {
      toast.warning(error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { name, category, price, image, isAvailable } = values;

    console.log(image);
    if (image == product.image) {
      mutate({
        id: product.id,
        name: name,
        category: category,
        price: price,
        image: product.image,
        isAvailable: isAvailable,
      });
    } else {
      const formData = new FormData();
      formData.append("productName", JSON.stringify({ name: name }));
      formData.append("file", image[0]);

      fetch(
        `http://${process.env.NEXT_PUBLIC_HOST_URL}:3000/api/uploadProductImage/${product.id}`,
        {
          method: "PATCH",
          body: formData,
        },
      )
        .then((res) => res.json())
        .then((data: { imagePath: string }) => {
          mutate({
            id: product.id,
            name: name || product.name,
            category: category || product.category.id,
            price: price || product.price,
            image: data.imagePath,
            isAvailable: isAvailable || product.isAvailable,
          });
          setOpen(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong, try again");
        });
    }
  };

  return (
    <Card className=" h-[150px] max-w-[500px] rounded-[24px] flex flex-row items-center  space-x-2 bg-[#e1cdad] border-none">
      <div className="flex w-[130px] h-[130px] items-center rounded-[14px] justify-center ml-[10px]  object-cover overflow-hidden">
        <img
          // FIXME: do environment variable
          src={
            (product.image &&
              `http://${process.env.NEXT_PUBLIC_HOST_URL}:3000/${product.image}?q=50`) ||
            "/Joes-Logo-Whitebg.png"
          }
          alt={product.name}
        />
      </div>
      <div className="">
        <div className="">
          <div className="flex flex-col">
            <div className="text-2xl font-bold">{product.name}</div>
            <div className="font-['Yantramanav'] font-semibold">
              PHP {product.price}.00
            </div>
            <div className="font-['Yantramanav'] font-semibold">
              {product.category.name}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <div className="w-[50px]">
                  <Button>Edit</Button>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Product</DialogTitle>
                  <DialogDescription>Edit product.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-3 gap-1.5">
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field: { onChange, value, ...rest } }) => (
                          <FormItem className="flex flex-col justify-center items-center rounded-lg row-span-full bg-[#f9ebd3] h-[180px]">
                            <FormLabel>
                              {product.image || preview ? (
                                <img
                                  className="cursor-pointer object-cover h-[180px] rounded-lg"
                                  src={
                                    (preview as string) ||
                                    `http://${process.env.NEXT_PUBLIC_HOST_URL}:3000/${product.image}` ||
                                    "/Joes-Logo-Whitebg.png"
                                  }
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
                                  const { files, displayUrl } =
                                    getImageData(event);
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
                                <Input
                                  placeholder="Enter product name"
                                  {...field}
                                />
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
                                <Input
                                  {...field}
                                  className="col-span-3"
                                  type="number"
                                />
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
                      <Button type="submit">Edit Product</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EditProduct;
