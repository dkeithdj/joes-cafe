import { prisma } from "@repo/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest
  // { params }: { params: { id: string } }
) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const transactionId = searchParams.get("transactionId");
    // const data = await req.json();
    // const { itemId, productId, transactionId } = data;
    // const itemsView = await prisma.itemsView.findMany();
    // console.log(itemsView);

    const itemsView = await prisma.itemsView.findMany({
      where: { transactionId: transactionId! },
    });

    return NextResponse.json(itemsView, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

//if product exist in items, update quantity

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const data = await req.json();
    const { itemId, productId, transactionId, customerId } = data;
    // if (!itemId) {
    const items = await prisma.items.create({
      data: {
        product: {
          connect: {
            id: productId,
          },
        },
        transaction: {
          connectOrCreate: {
            where: {
              id: transactionId,
            },
            create: {
              customer: {
                connect: {
                  id: customerId,
                },
              },
            },
          },
        },
      },
    });
    return NextResponse.json(items, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    const { itemId } = await req.json();
    const deleteItem = await prisma.items.delete({
      where: {
        id: itemId,
      },
    });
    return NextResponse.json(deleteItem, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
