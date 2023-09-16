import Image from "next/image";

import { PrismaClient } from "@prisma/client";
import Product from "../components/Product";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const prisma = new PrismaClient();

export default async function Home() {
  const products = await prisma.products.findMany();
  const test = await prisma.products.findMany();

  console.log(test.map((product) => product));
  console.log(products.map((product) => product));

  return (
    <div className="flex">
      {products.map((product) => (
        <Product pos={product} />
      ))}
    </div>
  );
}
