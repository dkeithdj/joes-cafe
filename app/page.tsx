import Image from "next/image";

import { PrismaClient } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Products from "@/components/Products";
import prisma from "@/lib/prisma";

export default async function Home() {
  const products: {
    id: string;
    name: string;
    price: number;
    description: string | null;
    image: string | null;
    category: { id: string; name: string; description: string | null };
    isAvailable: boolean;
    categoryId: string;
  }[] = await prisma.product.findMany({
    include: {
      category: true,
    },
  });
  const basket = await prisma.basket.findMany({
    where: {
      customer: {
        name: "den",
      },
    },
    include: {
      customer: true,
      product: true,
    },
  });

  console.log(basket.map((product) => product));
  // console.log(products.map((product) => product));

  return (
    <div className="grid grid-cols-2 place-items-center px-2 md:flex">
      {products.map((product) => (
        <Products pos={product} />
      ))}
    </div>
  );
}
