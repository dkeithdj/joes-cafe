import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const customers = await prisma.customer.findMany({
      select: {
        name: true,
      },
    });
    return new NextResponse(JSON.stringify(customers), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to fetch all prompts", { status: 500 });
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
