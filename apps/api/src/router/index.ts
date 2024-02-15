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
  createTransaction: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const createTransaction = await prisma.transaction.create({
        data: {
          customer: {
            create: {
              name: input.name,
            },
          },
        },
        select: {
          id: true,
          customer: true,
        },
      });
      ctx.res
        .cookie("customer.transaction", createTransaction.id, {
          maxAge: 60 * 60 * 24,
        })
        .cookie("customer.customer", createTransaction.customer.id, {
          maxAge: 60 * 60 * 24,
        })
        .cookie("customer.name", createTransaction.customer.name, {
          maxAge: 60 * 60 * 24,
        });
      return createTransaction;
    }),
  createProduct: publicProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        category: z.string(),
        image: z.string(),
        isAvailable: z.boolean(),
      })
    )
    .mutation((opts) => {
      return prisma.product.create({
        data: {
          name: opts.input.name,
          price: opts.input.price,
          category: {
            connect: {
              id: opts.input.category,
            },
          },
          image: opts.input.image,
          isAvailable: opts.input.isAvailable,
        },
      });
    }),

  getOrders: publicProcedure
    .input(
      z.object({
        status: z.enum([Status.Declined, Status.Completed, Status.Processing]),
      })
    )
    .query((opts) => {
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
      });
    }),
  getStatus: publicProcedure.query(() => {}),
  getStaff: publicProcedure.query(() => {
    return prisma.staff.findMany();
  }),
  getCategories: publicProcedure.query(({ input, ctx }) => {
    return prisma.category.findMany();
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
