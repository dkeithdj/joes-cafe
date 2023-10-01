import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest
  // { params }: { params: { id: string } }
) => {
  try {
    // const data = await req.json();
    // const { itemId, productId, transactionId } = data;
    // const itemsView = await prisma.itemsView.findMany();
    // console.log(itemsView);

    const itemsView = await prisma.itemsView.findMany();

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

          // connect: {
          //   id: transactionId,
          // },
        },
        // transactionId: transactionId,
        // productId: productId,
      },
    });
    //   return NextResponse.json(items);
    // }

    // if (itemId && productId) {
    // const items = await prisma.items.upsert({
    //   where: {
    //     id: itemId
    //   },
    //   create: {
    //     product: {
    //       connect: {
    //         id: productId
    //       }
    //     },
    //     transaction: {
    //       connect: {
    //         id: transactionId
    //       }
    //     }
    //   },
    //   update: {
    //     der
    //   }
    // })
    // }
    return NextResponse.json(items, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
