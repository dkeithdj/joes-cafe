import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

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
      select: {
        id: true,
        customer: true,
      },
    });

    cookies().set("customer.transaction", createTransaction.id, {
      maxAge: 60 * 60 * 24,
    });
    cookies().set("customer.customer", createTransaction.customer.id, {
      maxAge: 60 * 60 * 24,
    });
    cookies().set("customer.name", createTransaction.customer.name, {
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
