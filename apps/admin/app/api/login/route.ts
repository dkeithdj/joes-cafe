import { prisma } from "@repo/database";
import bcrypt from "bcrypt";
// import { prisma } from "@repo/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    console.log(body);

    if (!name || !email || !password) {
      return NextResponse.json({ message: "missing inputs" }, { status: 400 });
    }

    const exist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (exist)
      return NextResponse.json(
        { message: "User already exist" },
        { status: 400 },
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    // const user = await prisma.user.create({
    //   data: {
    //     name: name,
    //     email: email,
    //     hashedPassword: hashedPassword,
    //   },
    // });

    return NextResponse.json(hashedPassword);
  } catch (error) {
    return NextResponse.json(error);
  }
};
