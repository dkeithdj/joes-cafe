import Image from "next/image";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Home() {
  const post = await prisma.products.findMany({
    include: {
      category: true,
    },
    // select: {
    //   productName: true,
    //   categoryID: true,
    //   description: true,
    // },
  });
  console.log(post.map((pos) => pos));
  // console.log("owo");
  // console.log(post.map((pos) => pos.id));

  return (
    <ul>
      {post.map((pos) => (
        <div>
          {/* <div>{pos}</div> */}
          {/* <div>{pos.price}</div> */}
        </div>
      ))}
    </ul>
  );
}
