import { PrismaClient } from "@prisma/client";

// Fetch all posts (in /pages/api/posts.ts)
const prisma = new PrismaClient();

export default async function handle(req, res) {
  const posts = await prisma.customer.findMany();
  res.json(posts);
}
