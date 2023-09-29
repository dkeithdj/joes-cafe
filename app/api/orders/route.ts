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
          select: {},
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
    const { tableId, customerId, transactionId } = await req.json();

    const order = await prisma.order.create({
      data: {
        totalAmount: 0,
        table: {
          connect: {
            id: tableId,
          },
        },
        transaction: {
          create: {},
          // connectOrCreate: {
          //   create: {
          //     customerId: customerId,
          //   },
          //   where: {
          //     id: transactionId,
          //   },
          // },
        },
      },
    });
    return NextResponse.json("a");
  } catch (error) {
    return NextResponse.json(error);
  }
};
