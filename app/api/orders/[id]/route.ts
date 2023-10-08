import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { useRouter } from "next/router";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const cookies = req.cookies.get("orderId");
    const id = cookies?.value;
    // console.log(id);

    const orders = await prisma.order.findFirst({
      where: {
        id: id,
      },
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

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const data = await req.json();
    const { staffId, paymentId, statusId } = data;

    const updateOrder = await prisma.order.update({
      where: {
        id: params.id,
      },
      data: {
        staff: {
          connect: {
            id: staffId,
          },
        },
        paymentMethod: {
          connect: {
            id: paymentId,
          },
        },
        status: {
          connect: {
            id: Number(statusId),
          },
        },
      },
    });
    return NextResponse.json(updateOrder);
  } catch (error) {
    return NextResponse.json(error);
  }
};
