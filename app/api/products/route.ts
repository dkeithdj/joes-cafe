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
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to fetch all prompts", { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const input = await req.json();

    return NextResponse.json({ message: "yehey" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
