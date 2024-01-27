import { prisma } from "@repo/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const status = await prisma.order_Status.findMany();
    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json(error);
  }
};
