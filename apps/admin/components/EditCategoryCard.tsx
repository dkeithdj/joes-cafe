import { RouterOutputs, trpc } from "@admin/hooks/trpc";
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
import { Input } from "@ui/components/ui/input";
import { Switch } from "@ui/components/ui/switch";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { Button } from "@ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type CategoryOptions = RouterOutputs["getCategoriesAndProductCount"][0];

const formSchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }),
  isAvailable: z.boolean(),
});

const EditCategoryCard = ({ category }: { category: CategoryOptions }) => {
  const [open, setOpen] = useState(false);
  const utils = trpc.useUtils();

  const { mutate: updateCategory } = trpc.updateCategory.useMutation({
    onSuccess() {
      utils.getCategoriesAndProductCount.invalidate();
      utils.getCategories.invalidate();
      toast.success("Edited Category");
    },
    onError(err) {
      toast.error(err.message);
    },
  });
  console.log(category.name);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category.name,
      isAvailable: category.isAvailable,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { name, isAvailable } = values;

    updateCategory({
      id: category.id,
      name: name,
      isAvailable: isAvailable,
    });
    setOpen(false);
  };

  return (
    <Card className="flex flex-col max-w-[500px] rounded-[24px] space-x-2 bg-[#e1cdad] border-none">
      <div className="flex justify-between">
        <CardHeader className="">
          <CardTitle>
            <p className="">{category.name}</p>
          </CardTitle>
        </CardHeader>
        <CardHeader className="text-xl font-bold">
          {category._count.products}
        </CardHeader>
      </div>
      <CardFooter className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="w-[50px]">
              <Button>Edit</Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter category name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="">
                    <FormField
                      control={form.control}
                      name="isAvailable"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Availability{field.value}</FormLabel>
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
                <DialogFooter className="pt-4">
                  <Button type="submit">Edit Product</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default EditCategoryCard;
