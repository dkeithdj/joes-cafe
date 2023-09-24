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
import { fetcher } from "@/lib/swr";
import useSWR from "swr";

export default function Home() {
  // console.log(basket.map((product) => product));
  // console.log(products.map((product) => product));

  return (
    <div className="grid grid-cols-2 place-items-center px-2 md:flex">aa</div>
  );
}
