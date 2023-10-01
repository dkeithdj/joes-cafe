import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        customerId: params.id,
      },
      select: {
        id: true,
        customer: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const data = await req.json();
    const createTransaction = await prisma.transaction.create({
      data: {
        customer: {
          create: data,
        },
      },
    });
    return NextResponse.json(createTransaction);
  } catch (error) {
    return NextResponse.json(error);
  }
};
