import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add an onUnload handler to disconnect the Prisma client when the application shuts down
async function onUnload() {
  await prisma.$disconnect();
}

// Attach the onUnload function to the global process object
process.on("beforeExit", onUnload);

export default prisma;
