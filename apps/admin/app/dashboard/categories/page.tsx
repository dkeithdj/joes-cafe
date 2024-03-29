"use client";
import { trpc } from "@admin/hooks/trpc";
import { Card } from "@ui/components/ui/card";
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
import Loading from "@admin/components/Loading";
import { toast } from "sonner";
import AddCategoryCard from "@admin/components/AddCategoryCard";
import EditCategoryCard from "@admin/components/EditCategoryCard";

const CategoriesPage = () => {
  const [availability, setAvailability] = useState(true);
  const [open, setOpen] = useState(false);
  const utils = trpc.useUtils();

  const {
    data: categoryByProduct,
    isSuccess,
    isLoading,
  } = trpc.getCategoriesAndProductCount.useQuery(availability);

  const { mutate: createCategory } = trpc.createCategory.useMutation({
    onSuccess() {
      utils.getCategoriesAndProductCount.invalidate();
      utils.getCategories.invalidate();
      toast.success("Added Category");
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  const helperCreateCategory = ({
    name,
    isAvailable,
  }: {
    name: string;
    isAvailable: boolean;
  }) => {
    createCategory({
      name: name,
      isAvailable: isAvailable,
    });
  };

  return (
    <div className="w-auto mx-14">
      <div className="flex flex-row justify-between">
        <div className="text-6xl text-[#603D04] py-4 ">Categories</div>

        <div className="flex flex-row items-center gap-x-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div className="flex flex-row items-center gap-x-4">
                <Button>Add Category</Button>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Category</DialogTitle>
              </DialogHeader>
              <AddCategoryCard
                mutate={helperCreateCategory}
                setOpen={setOpen}
              />
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isSuccess &&
          categoryByProduct
            // .filter((category) => availability === category.isAvailable)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((category, id) => (
              <EditCategoryCard key={id} category={category} />
            ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
