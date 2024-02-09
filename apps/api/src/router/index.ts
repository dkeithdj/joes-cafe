import { initTRPC } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { Status, prisma } from "@repo/database";
import { z } from "zod";
import { Context } from "../context/index.js";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  hello: publicProcedure.query(({ ctx, input }) => {
    return { greeting: "hello world" };
  }),
  getUsers: publicProcedure.query(() => {}),
  getProducts: publicProcedure.query(async () => {
    return await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        image: true,
        isAvailable: true,
      },
    });
  }),

  getOrders: publicProcedure.input(z.object({status: z.enum([Status.Declined,Status.Completed,Status.Processing])})).query((opts) => {
    return prisma.order.findMany({
      where: {
        status: {
          status: opts.input.status,
        },
      },
      select: {
        id: true,
        date: true,
        staff: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        table: {
          select: {
            id: true,
            number: true,
          },
        },
        paymentMethod: {
          select: {
            id: true,
            paymentType: true,
          },
        },
        status: {
          select: {
            id: true,
            status: true,
          },
        },
        totalAmount: true,
        transaction: {
          select: {
            id: true,
            customer: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })
  }),
  getStatus: publicProcedure.query(() => {}),
  getStaff: publicProcedure.query(() => {
    return prisma.staff.findMany()
  }),
  getCategories: publicProcedure.query(({ input, ctx }) => {
    return prisma.category.findMany();
  }),
  getState: publicProcedure.query(() => {
    return { mess: "hi" };
  }),
  randomNumber: publicProcedure.subscription(() => {
    return observable<{ randomNumber: number }>((emit) => {
      const timer = setInterval(() => {
        emit.next({ randomNumber: Math.random() });
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    });
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
