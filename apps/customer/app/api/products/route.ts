import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        image: true,
        isAvailable: true,
      },
    });
    // return new NextResponse(JSON.stringify(products), { status: 200 });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const product = await prisma.product.create({
      data: data,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(error);
  }
};
