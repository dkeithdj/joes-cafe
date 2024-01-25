import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const cookie = cookies()
      .getAll()
      .filter((filter) => filter.name.startsWith("customer"));
    return NextResponse.json(cookie);
  } catch (error) {
    return NextResponse.json(error);
  }
};
