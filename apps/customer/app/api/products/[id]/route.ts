import { prisma } from "@repo/database";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const product = await req.json();
    delete product["id"];
    delete product["category"];
    const products = await prisma.product.update({
      where: {
        id: params.id,
      },
      data: product,
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
};
