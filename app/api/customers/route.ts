import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const customers = await prisma.customer.findMany({
      select: {
        name: true,
      },
    });
    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const data = await req.json();

    const createUser = await prisma.customer.create({ data: data });

    return NextResponse.json(createUser);
  } catch (error) {
    return NextResponse.json(error);
  }
};
