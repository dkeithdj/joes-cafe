import fastifyCors from "@fastify/cors";
import ws from "@fastify/websocket";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import fastifyModernImages from "fastify-modern-images";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify, { FastifyReply } from "fastify";
import type { FastifyRequest } from "fastify/types/request";

import { appRouter } from "./router";
import type { AppRouter } from "./router";
import { createTRPCContext } from "./context";
import { promisify } from "util";
import { pipeline } from "stream";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export { appRouter, type AppRouter } from "./router";
export { createTRPCContext } from "./context";

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const prefix = "/trpc";
const server = fastify({ logger: dev, maxParamLength: 5000 });
const pump = promisify(pipeline);

void server.register(ws);
void server.register(multipart);
void server.register(fastifyStatic, {
  root: path.join(__dirname, "..", "..", "..", "data"),
  prefix: "/public/",
});
void server.register(fastifyModernImages, {
  quality: "6",
});
void server.register(fastifyTRPCPlugin, {
  prefix,
  useWSS: true,
  trpcOptions: {
    router: appRouter,
    // ctx: createTRPCContext,
    createContext: ({
      req,
      res,
    }: {
      req: FastifyRequest;
      res: FastifyReply;
    }) => {
      return createTRPCContext({ req, res });
    },
  },
});

server.post("/api/uploadProductImage", async (req, reply) => {
  const parts = await req.parts();

  let fileName = "";
  for await (const part of parts) {
    if (part.type === "file") {
      const image = part.filename.split(".");
      const dir = path.join(__dirname, "..", "..", "..", "data", fileName);

      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      const imagePath = `${fileName}.${image[1]}`;

      await pump(part.file, fs.createWriteStream(path.join(dir, imagePath)));

      return reply.send({
        imagePath: `public/${fileName}/${fileName}.${image[1]}`,
      });
    } else {
      const { name }: { name: string } = JSON.parse(part.value as string);
      fileName = name.toLowerCase().trim().replace(/ +/g, "_");
    }
  }
});
// FIXME: delete/override previous file
server.patch("/api/uploadProductImage/:id", async (req, reply) => {
  const { id } = req.params as { id: string };
  console.log(id);
  const parts = await req.parts();

  let fileName = "";
  for await (const part of parts) {
    if (part.type === "file") {
      const image = part.filename.split(".");
      const dir = path.join(__dirname, "..", "..", "..", "data", fileName);

      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      const imagePath = `${fileName}.${image[1]}`;

      await pump(part.file, fs.createWriteStream(path.join(dir, imagePath)));

      return reply.send({
        imagePath: `public/${fileName}/${fileName}.${image[1]}`,
      });
    } else {
      const { name }: { name: string } = JSON.parse(part.value as string);
      fileName = name.toLowerCase().trim().replace(/ +/g, "_");
    }
  }
});

const start = async () => {
  try {
    await server.register(fastifyCors, {
      origin: [
        // "http://localhost:3001",
        // "http://localhost:3000",
        // "http://localhost:3002",
        process.env.NEXT_ADMIN_URL as string,
        process.env.NEXT_CUSTOMER_URL as string,
        process.env.NEXT_KITCHEN_URL as string,
        `http://${process.env.NEXT_PUBLIC_HOST_URL}:3001`,
        `http://${process.env.NEXT_PUBLIC_HOST_URL}:3002`,
        `http://${process.env.NEXT_PUBLIC_HOST_URL}:3003`,
      ],
      credentials: true,
    });
    await server.listen({ port: 3000, host: "::" });
    console.log("💫 Server listening on port 3000...");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

void start();
