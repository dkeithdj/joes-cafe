import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const items = await prisma.items.findMany({
      where: {
        transaction: {
          id: params.id,
        },
      },
      select: {
        id: true,
        product: {
          select: {
            id: true,
            name: true,
            image: true,
            price: true,
          },
        },
        quantity: true,
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const items = await prisma.items.create({
      data: {
        product: {
          connect: {
            id: "",
          },
        },
        transaction: {
          connect: {
            id: "",
          },
        },
        quantity: 1,
      },
    });
    return NextResponse.json("a");
  } catch (error) {
    return NextResponse.json(error);
  }
};
