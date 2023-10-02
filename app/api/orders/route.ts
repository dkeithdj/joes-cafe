import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        date: true,
        staff: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        table: {
          select: {
            number: true,
          },
        },
        paymentMethod: {
          select: {
            paymentType: true,
          },
        },
        totalAmount: true,
        transaction: {
          select: {
            id: true,
          },
        },
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { tableId, transactionId, totalAmount } = await req.json();

    const order = await prisma.order.create({
      data: {
        transaction: {
          connect: {
            id: transactionId,
          },
        },
        table: {
          connect: {
            id: tableId,
          },
        },
        status: {
          connect: {
            id: 1,
          },
        },
        totalAmount: totalAmount,
      },
    });
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
