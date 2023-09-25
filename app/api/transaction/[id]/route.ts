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

    console.log(transactions);

    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json(error);
  }
};
