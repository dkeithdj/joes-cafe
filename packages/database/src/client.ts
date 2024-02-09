import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("🚀 Database connected successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

export * from "@prisma/client";

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
