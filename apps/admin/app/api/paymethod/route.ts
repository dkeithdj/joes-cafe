import { prisma } from "@repo/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const paymethod = await prisma.paymentMethod.findMany();
    return NextResponse.json(paymethod);
  } catch (error) {
    return NextResponse.json(error);
  }
};
