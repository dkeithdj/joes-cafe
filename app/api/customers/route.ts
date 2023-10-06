import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    // const customers = await prisma.customer.findMany({
    //   select: {
    //     name: true,
    //   },
    // });
    return NextResponse.json("hiih");
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const data = await req.json();

    // console.log(data.name);

    const createTransaction = await prisma.transaction.create({
      data: {
        customerId: data,
      },
    });

    // const createUser = await prisma.customer.create({ data: data });

    return NextResponse.json(createTransaction);
  } catch (error) {
    return NextResponse.json(error);
  }
};
