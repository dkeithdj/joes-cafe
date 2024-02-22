import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { prisma } from "@repo/database";
import type { FastifyRequest } from "fastify/types/request";
// Reference required for compilation
import type fastify from "fastify";
import { FastifyReply } from "fastify";

// export async function createContextInner(opts?: CreateFastifyContextOptions) {
//   return {
//     prisma,
//   };
// }

// eslint-disable-next-line @typescript-eslint/require-await
type Customer = {
  id: string | null;
  name: string | null;
  transactionId: string | null;
  orderId: string | null;
};
export const createTRPCContext = async ({
  req,
  res,
}: {
  req: FastifyRequest;
  res: FastifyReply;
}) => {
  return { prisma: prisma, req, res, customer: {} };
};
export async function createContext({ req, res }: CreateFastifyContextOptions) {
  const server = req.server;

  return {
    fastify: server,
    req,
    res,
    prisma,
  };
}
export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
// export type InnerContext = inferAsyncReturnType<typeof createContextInner>;
