import {
  FastifyTRPCPluginOptions,
  fastifyTRPCPlugin,
} from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import cookie, { FastifyCookieOptions } from "@fastify/cookie";
import ws from "@fastify/websocket";
import { connectDB } from "@repo/database";
import fastifyCors from "@fastify/cors";
import { AppRouter, appRouter } from "./router";
import { createContext } from "./context";
import NextAuthPlugin from "fastify-next-auth";

export const server = fastify({
  maxParamLength: 5000,
});

server.register(cookie, {
  secret: "thequickbrownfox",
  parseOptions: {},
} as FastifyCookieOptions);

server.register(ws);
server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: appRouter,
    createContext,
    onError({ path, error }) {
      // report to error monitoring
      console.error(`Error in tRPC handler on path '${path}':`, error);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
  useWSS: true,
});

// server.register(fastify,{
//   secret: process.env.AUTH_SECRET as string,
//   trustHost: process.env.AUTH_TRUST_HOST as string,
// providers: [
//     ],
// })

(async () => {
  try {
    await connectDB();
    await server.register(fastifyCors, {
      origin: [
        "http://localhost:3001",
        "http://localhost:3000",
        "http://localhost:3002",
      ],
      credentials: true,
    });
    await server.listen({ port: 3000 });
    console.log("💫 Server listening on port 3000...");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
