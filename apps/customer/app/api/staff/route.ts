import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const staff = await prisma.staff.findMany();
    return NextResponse.json(staff);
  } catch (error) {
    return NextResponse.json(error);
  }
};
