import { TRPCError, initTRPC } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { Status } from "@repo/database";
import { z } from "zod";
import { Context } from "../context";
import fastify from "fastify";
import { EventEmitter } from "stream";
// import superjson from "superjson";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

const ee = new EventEmitter();

/* TODO: separate mutations and queries
 * <table>.<get/post/put/patch/delete>.<filter, e.g. by id, name, etc.>
 */

export const appRouter = router({
  hello: publicProcedure.query(({ ctx, input }) => {
    return { greeting: "hello world" };
  }),
  getProducts: publicProcedure
    .input(z.string().nullable())
    .query(async ({ input, ctx }) => {
      console.log(typeof input);
      const products = await ctx.prisma.product.findMany({
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
      if (input === null) {
        return products;
      }
      const productsByCategory = await ctx.prisma.product.findMany({
        where: {
          category: {
            id: input,
          },
        },
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
      return productsByCategory;
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
      ctx.res.header(
        "Set-Cookie",
        `customer.transaction=${createTransaction.id}; Path=/; Max-Age=86400`,
      );
      ctx.res.header(
        "Set-Cookie",
        `customer.customer=${createTransaction.customer.id}; Path=/; Max-Age=86400`,
      );
      ctx.res.header(
        "Set-Cookie",
        `customer.name=${createTransaction.customer.name}; Path=/; Max-Age=86400`,
      );
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
    .mutation(async ({ ctx, input }) => {
      const productExists = await ctx.prisma.product.findFirst({
        where: { name: input.name },
        select: {
          name: true,
        },
      });
      if (productExists) {
        throw new TRPCError({
          message: `${productExists.name} already exists`,
          code: "CONFLICT",
        });
      }
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
        status: z.enum([Status.Processing, Status.Declined, Status.Accepted]),
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
  getKitchenOrders: publicProcedure.query(async ({ input, ctx }) => {
    const orders = await ctx.prisma.order.findMany({
      where: {
        status: {
          OR: [
            { status: { equals: Status.Preparing } },
            { status: { equals: Status.Brewing } },
            { status: { equals: Status.Completed } },
          ],
        },
      },
      select: {
        id: true,
        table: {
          select: {
            number: true,
          },
        },
        status: {
          select: {
            id: true,
            status: true,
          },
        },
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
      ctx.res.header(
        "Set-Cookie",
        `orderId=${order.id}; Path=/; Max-Age=86400`,
      );

      ee.emit("createOrder", order.statusId);

      return order;
    }),
  onCreateOrder: publicProcedure.subscription(() => {
    return observable<{ status: number }>((emit) => {
      const onCreateOrder = (data: { status: number }) => {
        emit.next(data);
      };
      ee.on("createOrder", onCreateOrder);
      return () => {
        ee.off("createOrder", onCreateOrder);
      };
    });
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
      ee.emit("updateOrder", updateOrder.statusId);

      return updateOrder;
    }),
  updateKitchenOrder: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
        statusId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { orderId, statusId } = input;

      const updateOrder = await ctx.prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: {
            connect: {
              id: Number(statusId),
            },
          },
        },
      });
      ee.emit("updateOrder", updateOrder.statusId);

      return updateOrder;
    }),
  onUpdateOrder: publicProcedure.subscription(() => {
    return observable<{ status: number }>((emit) => {
      const onUpdateOrder = (data: { status: number }) => {
        emit.next(data);
      };
      ee.on("updateOrder", onUpdateOrder);
      return () => {
        ee.off("updateOrder", onUpdateOrder);
      };
    });
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
      return items;
    }),
  getItem: publicProcedure
    .input(z.object({ transactionId: z.string() }))
    .query(async ({ input, ctx }) => {
      const itemsView = await ctx.prisma.itemsview.findMany({
        where: { transactionid: input.transactionId },
      });

      return itemsView;
    }),
  getKitchenItems: publicProcedure
    .input(z.object({ transactionId: z.string() }))
    .query(async ({ input, ctx }) => {
      const itemsView = await ctx.prisma.itemsview.findMany({
        where: { transactionid: input.transactionId },
        select: {
          productname: true,
          totalquantity: true,
        },
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

      ctx.res.header(
        "Set-Cookie",
        `customer.transaction=${updateTransaction.id}; Path=/; Max-Age=86400`,
      );
      ctx.res.header(
        "Set-Cookie",
        `customer.customer=${updateTransaction.customerId}; Path=/; Max-Age=86400`,
      );
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
