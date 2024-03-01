import { publicProcedure } from ".";

// routes for admin
const adminRouter = {
  hello: publicProcedure.query(({ ctx, input }) => {
    // ctx.req
    return { greeting: "hello world" };
  }),
};
