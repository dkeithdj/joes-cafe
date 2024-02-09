import {
  FastifyTRPCPluginOptions,
  fastifyTRPCPlugin,
} from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import ws from "@fastify/websocket";
import { connectDB } from "@repo/database";
import fastifyCors from "@fastify/cors";
import { AppRouter, appRouter } from "./router";
import { createContext } from "./context";


const server = fastify({
  maxParamLength: 5000,
});
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

(async () => {
  try {
    await connectDB();
    await server.register(fastifyCors, {
      origin: ["http://localhost:3001", "http://localhost:3000", "http://localhost:3002"],
      credentials: true,
    });
    await server.listen({ port: 3000 });
    console.log("💫 Server listening on port 3000...");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
