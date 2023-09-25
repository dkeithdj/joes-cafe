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
          customerId: params.id,
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
