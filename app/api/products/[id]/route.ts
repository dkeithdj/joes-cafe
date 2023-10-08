import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const product = await req.json();
    console.log(product);
    // const products = await prisma.product.update({
    //   where: {
    //     id: params.id,
    //   },
    //   data: {
    //     isAvailable: available,
    //   },
    // });
    // return new NextResponse(JSON.stringify(products), { status: 200 });
    return NextResponse.json("wit", { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
