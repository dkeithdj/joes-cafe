// import {
//   FastifyTRPCPluginOptions,
//   fastifyTRPCPlugin,
// } from "@trpc/server/adapters/fastify";
// import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cookie, { type FastifyCookieOptions } from "@fastify/cookie";
// import session from "@fastify/session";
// import ws from "@fastify/websocket";
// // import { connectDB } from "@repo/database";
import fastifyCors from "@fastify/cors";
// import { AppRouter, appRouter } from "./router";
// import { createContext, createTRPCContext } from "./context";
// import NextAuthPlugin from "fastify-next-auth";
//
// declare module "fastify" {
//   interface FastifyInstance {
//     authenticate: any;
//   }
// }
//
// const dev = process.env.NODE_ENV !== "production";
// const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
// const prefix = "/";
// const server = fastify({ logger: dev, maxParamLength: 5000 });
//
// server.register(cookie, {
//   secret: "thequickbrownfox",
//   parseOptions: {},
// } as FastifyCookieOptions);
// // server.register(session, {
// //   cookieName: "SESSION",
// //   cookie: {
// //     secure: true,
// //   },
// //   secret: "keyboard cat",
// // });
//
// void server.register(ws);
// void server.register(fastifyTRPCPlugin, {
//   prefix,
//   useWSS: true,
//   trpcOptions: {
//     router: appRouter,
//     ctx: createTRPCContext,
//     createContext: ({ req }: { req: FastifyRequest }) => {
//       return createTRPCContext({ req });
//     },
//   },
// });
//
// // server.get("/cookies", async (request: FastifyRequest, reply: FastifyReply) => {
// //   reply
// //     .setCookie("token", "hihi", {
// //       domain: "localhost",
// //       path: "/",
// //       // Switch
// //       secure: false,
// //       httpOnly: true,
// //       sameSite: true,
// //     })
// //     .code(200)
// //     .send("Cookie sent");
// // });
//
// // server.register(fastify,{
// //   secret: process.env.AUTH_SECRET as string,
// //   trustHost: process.env.AUTH_TRUST_HOST as string,
// // providers: [
// //     ],
// // })
//
// (async () => {
//   try {
//     // await connectDB();
//     await server.register(fastifyCors, {
//       origin: [
//         // "http://localhost:3001",
//         // "http://localhost:3000",
//         // "http://localhost:3002",
//         process.env.NEXT_ADMIN_URL as string,
//         process.env.NEXT_CUSTOMER_URL as string,
//         process.env.NEXT_KITCHEN_URL as string,
//       ],
//       credentials: true,
//     });
//     await server.listen({ port: 3000 });
//     console.log("💫 Server listening on port 3000...");
//   } catch (err) {
//     server.log.error(err);
//     process.exit(1);
//   }
// })();

import ws from "@fastify/websocket";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify, { FastifyReply } from "fastify";
import type { FastifyRequest } from "fastify/types/request";

import { appRouter } from "./router";
import type { AppRouter } from "./router";
import { createTRPCContext } from "./context";

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

server.register(cookie);

void server.register(ws);
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
      ],
      credentials: true,
    });
    await server.listen({ port: 3000 });
    console.log("💫 Server listening on port 3000...");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

void start();
