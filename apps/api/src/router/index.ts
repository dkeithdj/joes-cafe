import { initTRPC } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { Status, prisma } from "@repo/database";
import { z } from "zod";
import { Context } from "../context/index.js";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

/* TODO: separate mutations and queries
 * <table>.<get/post/put/patch/delete>.<filter, e.g. by id, name, etc.>
 */

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
      }),
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
        .setCookie("customer.transaction", createTransaction.id, {
          maxAge: 60 * 60 * 24,
          path: "/",
        })
        .setCookie("customer.customer", createTransaction.customer.id, {
          maxAge: 60 * 60 * 24,
          path: "/",
        })
        .setCookie("customer.name", createTransaction.customer.name, {
          maxAge: 60 * 60 * 24,
          path: "/",
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
      }),
    )
    .mutation(async (opts) => {
      return await prisma.product.create({
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
      }),
    )
    .query(async (opts) => {
      return await prisma.order.findMany({
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
  createOrder: publicProcedure
    .input(
      z.object({
        tableId: z.string(),
        transactionId: z.string(),
        totalAmount: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { tableId, transactionId, totalAmount } = input;

      const order = await prisma.order.create({
        data: {
          transaction: {
            connect: {
              id: transactionId,
            },
          },
          table: {
            connect: {
              id: tableId,
            },
          },
          status: {
            connect: {
              id: 1,
            },
          },
          totalAmount: totalAmount,
        },
      });
      return order;
    }),
  getStatus: publicProcedure.query(() => {}),
  getStaff: publicProcedure.query(async () => {
    return await prisma.staff.findMany();
  }),
  getCategories: publicProcedure.query(async ({ input, ctx }) => {
    return await prisma.category.findMany();
  }),
  addItem: publicProcedure
    .input(
      z.object({
        // itemId: z.string(),
        productId: z.string(),
        transactionId: z.string(),
        customerId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { productId, transactionId, customerId } = input;
      // if (!itemId) {
      const items = await prisma.items.create({
        data: {
          product: {
            connect: {
              id: productId,
            },
          },
          transaction: {
            connectOrCreate: {
              where: {
                id: transactionId,
              },
              create: {
                customer: {
                  connect: {
                    id: customerId,
                  },
                },
              },
            },
          },
        },
      });
    }),
  getItem: publicProcedure
    .input(z.object({ transactionId: z.string() }))
    .query(async ({ input, ctx }) => {
      const itemsView = await prisma.itemsView.findMany({
        where: { transactionId: input.transactionId },
      });

      return itemsView;
    }),
  deleteItem: publicProcedure
    .input(z.object({ itemId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const deleteItem = await prisma.items.delete({
        where: {
          id: input.itemId,
        },
      });
      return deleteItem;
    }),
  updateTransaction: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const updateTransaction = await prisma.transaction.create({
        data: {
          customer: {
            connectOrCreate: {
              where: {
                id: input.id,
              },
              create: {
                name: input.name,
              },
            },
          },
        },
      });

      // ctx.res
      //   .setCookie("customer.transaction", createTransaction.id, {
      ctx.res.setCookie("customer.transaction", updateTransaction.id, {
        maxAge: 60 * 60 * 24,
      });
      ctx.res.setCookie("customer.customer", updateTransaction.customerId, {
        maxAge: 60 * 60 * 24,
      });

      return updateTransaction;
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
