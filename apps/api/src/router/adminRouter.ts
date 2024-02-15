import { publicProcedure } from ".";
import { server } from "../server";

// routes for admin
const adminRouter = {
  hello: publicProcedure.query(({ ctx, input }) => {
    // ctx.req
    return { greeting: "hello world" };
  }),
}

