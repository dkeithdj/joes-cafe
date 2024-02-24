import { TRPCError, initTRPC } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { Status } from "@repo/database";
import { z } from "zod";
import { Context } from "../context";
import fastify from "fastify";
// import superjson from "superjson";

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
  getProducts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.product.findMany({
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
      const createTransaction = await ctx.prisma.transaction.create({
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
      ctx.customer = {
        transactionId: createTransaction.id,
        id: createTransaction.customer.id,
        name: createTransaction.customer.name,
      };
      // ctx.createCookies("hi", "hello");
      ctx.res.header(
        "Set-Cookie",
        "hello=world; Path=/; HttpOnly; Max-Age=3600; Secure; SameSite=Strict",
      );
      ctx.res.header(
        "Set-Cookie",
        "hi=hello; Path=/; HttpOnly; Max-Age=3600; Secure; SameSite=Strict",
      );
      // ctx.res.cookie("hi", "hello") as FastifyReply
      // ctx.res.setCookie("customer.transaction", createTransaction.id, {
      //   maxAge: 60 * 60 * 24,
      //   path: "/",
      // });
      // ctx.res.setCookie("customer.transaction", createTransaction.id, {
      //   maxAge: 60 * 60 * 24,
      //   path: "/",
      // });
      // ctx.res.setCookie("customer.customer", createTransaction.customer.id, {
      //   maxAge: 60 * 60 * 24,
      //   path: "/",
      // });
      // ctx.res.setCookie("customer.name", createTransaction.customer.name, {
      //   maxAge: 60 * 60 * 24,
      //   path: "/",
      // });
      return createTransaction;
    }),
  getSession: publicProcedure.query(({ input, ctx }) => {
    return ctx.customer;
  }),
  setSession: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        transactionId: z.string().optional(),
        orderId: z.string().optional(),
      }),
    )
    .mutation(({ input, ctx }) => {
      if (!ctx.customer) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Customer not found",
        });
      }
      ctx.customer = {
        ...input,
        ...ctx.customer,
      };
      return ctx.customer;
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
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.product.create({
        data: {
          name: input.name,
          price: input.price,
          category: {
            connect: {
              id: input.category,
            },
          },
          image: input.image,
          isAvailable: input.isAvailable,
        },
      });
    }),

  getOrders: publicProcedure
    .input(
      z.object({
        status: z.enum([Status.Declined, Status.Completed, Status.Processing]),
      }),
    )
    .query(async ({ input, ctx }) => {
      const orders = await ctx.prisma.order.findMany({
        where: {
          status: {
            status: input.status,
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
      return orders;
    }),
  getOrderById: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const orders = await ctx.prisma.order.findFirst({
        where: {
          id: input.orderId,
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
              number: true,
            },
          },
          paymentMethod: {
            select: {
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
            },
          },
        },
      });
      return orders;
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

      const order = await ctx.prisma.order.create({
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
      console.log(order);
      if (!ctx.customer) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      ctx.customer = { ...ctx.customer, orderId: order.id };

      // ctx.customer.orderId = order.id;
      // ctx.res.setCookie("orderId", order.id, {
      //   maxAge: 60 * 60 * 24,
      // });
      return order;
    }),
  updateOrder: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
        staffId: z.string(),
        paymentId: z.string(),
        statusId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { orderId, staffId, paymentId, statusId } = input;

      const updateOrder = await ctx.prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          staff: {
            connect: {
              id: staffId,
            },
          },
          paymentMethod: {
            connect: {
              id: paymentId,
            },
          },
          status: {
            connect: {
              id: Number(statusId),
            },
          },
        },
      });
      return updateOrder;
    }),
  getStatus: publicProcedure.query(async ({ input, ctx }) => {
    const status = await ctx.prisma.order_Status.findMany();
    return status;
  }),
  getPaymentMethod: publicProcedure.query(async ({ input, ctx }) => {
    const paymentMethod = await ctx.prisma.paymentMethod.findMany();
    return paymentMethod;
  }),
  getStaff: publicProcedure.query(async ({ input, ctx }) => {
    return await ctx.prisma.staff.findMany();
  }),
  getCategories: publicProcedure.query(async ({ input, ctx }) => {
    return await ctx.prisma.category.findMany();
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
      const items = await ctx.prisma.items.create({
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
      const itemsView = await ctx.prisma.itemsview.findMany({
        where: { transactionid: input.transactionId },
      });

      return itemsView;
    }),
  deleteItem: publicProcedure
    .input(z.object({ itemId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const deleteItem = await ctx.prisma.items.delete({
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
      const updateTransaction = await ctx.prisma.transaction.create({
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
      // ctx.res.setCookie("customer.transaction", updateTransaction.id, {
      //   maxAge: 60 * 60 * 24,
      // });
      // ctx.res.setCookie("customer.customer", updateTransaction.customerId, {
      //   maxAge: 60 * 60 * 24,
      // });
      if (!ctx.customer) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      ctx.customer = {
        ...ctx.customer,
        transactionId: updateTransaction.id,
        id: updateTransaction.customerId,
      };

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
