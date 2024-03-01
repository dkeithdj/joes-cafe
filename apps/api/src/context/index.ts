import { prisma } from "@repo/database";
import type { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify";

export const createTRPCContext = async ({
  req,
  res,
}: {
  req: FastifyRequest;
  res: FastifyReply;
}) => {
  return { prisma: prisma, req, res };
};
export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
// export type InnerContext = inferAsyncReturnType<typeof createContextInner>;
