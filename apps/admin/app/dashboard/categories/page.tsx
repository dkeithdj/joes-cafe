"use client";
import { trpc } from "@admin/hooks/trpc";
import { Card } from "@ui/components/ui/card";
import { Button } from "@ui/components/ui/button";
import React from "react";

const CategoriesPage = () => {
  const { data: categories } = trpc.getCategories.useQuery();

  const { data: categoryByProduct, isSuccess } =
    trpc.getCategoriesAndProductCount.useQuery();

  const { mutate } = trpc.updateCategory.useMutation();
  console.log(categoryByProduct);

  const addCategory = () => {};

  return (
    <div className="w-auto mx-14">
      <div className="flex flex-row justify-between">
        <div className="text-6xl text-[#603D04] py-4 ">Categories</div>

        <div className="flex flex-row items-center gap-x-4">
          <Button onClick={addCategory}>Add Category</Button>
        </div>
      </div>
      <div>
        {isSuccess &&
          categoryByProduct
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((category, id) => (
              <Card key={id}>
                <p>{category.id}</p>
                <p>{category.name}</p>
                <p>{category.isAvailable && "yus"}</p>
                <p>{category._count.products}</p>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
