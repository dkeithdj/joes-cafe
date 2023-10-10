import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const data = await req.json();
    const createTransaction = await prisma.transaction.create({
      data: {
        customer: {
          connectOrCreate: {
            where: {
              id: data.id,
            },
            create: {
              name: data.name,
            },
          },
        },
      },
    });

    cookies().set("customer.transaction", createTransaction.id, {
      maxAge: 60 * 60 * 24,
    });
    cookies().set("customer.customer", createTransaction.customerId, {
      maxAge: 60 * 60 * 24,
    });
    // cookies().set("customer.transaction", createTransaction.id, {
    //   maxAge: 60,
    // });
    // cookies().set("customer.customer", createTransaction.customerId, {
    //   maxAge: 60,
    // });
    console.log(cookies().get("customer-customer"));

    return NextResponse.json(createTransaction);
  } catch (error) {
    return NextResponse.json(error);
  }
};
