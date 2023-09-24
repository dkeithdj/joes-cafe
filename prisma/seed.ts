import {
  Items,
  Category,
  Customer,
  PaymentMethod,
  Prisma,
  PrismaClient,
  Product,
  Staff,
  Status,
} from "@prisma/client";

const client = new PrismaClient();

const getCategories = (): Prisma.CategoryCreateInput[] => [
  { name: "Iced Joe", description: "Iced Joe latte" },
  { name: "Hot Joe", description: "Hot Joe latte" },
  { name: "Frappe", description: "Frappe Drink" },
];

const getCustomer = (): Prisma.CustomerCreateInput[] => [
  { name: "den" },
  { name: "steph" },
  { name: "nick" },
  { name: "dec" },
];

const getStaff = (): Prisma.StaffCreateInput[] => [
  { first_name: "John", last_name: "Doe" },
  { first_name: "Phil", last_name: "Ip" },
  { first_name: "To", last_name: "Paz" },
];

const getPaymentMethod = (): Prisma.PaymentMethodCreateInput[] => [
  { paymentType: "Online" },
  { paymentType: "Cash" },
];

const getStatus = (): Prisma.Order_StatusCreateInput[] => [
  { status: "Processing" },
  { status: "Completed" },
  { status: "Declined" },
];

const getTable = (): Prisma.TableCreateInput[] => [
  { number: 1 },
  { number: 2 },
  { number: 3 },
  { number: 4 },
  { number: 5 },
  { number: 6 },
  { number: 7 },
  { number: 8 },
  { number: 9 },
  { number: 10 },
];

const getProducts = (category: Category[]): Prisma.ProductCreateInput[] => [
  {
    name: "Coffee Latte",
    price: 110,
    category: {
      connect: {
        id: category[0].id,
        name: category[0].name,
        description: category[0].description,
      },
    },
    isAvailable: true,
  },
  {
    name: "Iced Latte",
    price: 130,
    category: {
      connect: {
        id: category[1].id,
        name: category[1].name,
        description: category[1].description,
      },
    },
    isAvailable: true,
  },
  {
    name: "Frappe",
    price: 150,
    category: {
      connect: {
        id: category[2].id,
        name: category[2].name,
        description: category[2].description,
      },
    },
    isAvailable: true,
  },
];

// const getBasket = (
//   customer: Customer[],
//   products: Product[]
// ): Prisma.BasketCreateInput[] => [
//   {
//     customer: {
//       connect: {
//         id: customer[0].id,
//         name: customer[0].name,
//       },
//     },
//     product: {
//       connect: {
//         id: products[0].id,
//       },
//     },
//     quantity: 1,
//   },
//   {
//     customer: {
//       connect: {
//         id: customer[0].id,
//         name: customer[0].name,
//       },
//     },
//     product: {
//       connect: {
//         id: products[1].id,
//       },
//     },
//     quantity: 2,
//   },
//   {
//     customer: {
//       connect: {
//         id: customer[1].id,
//         name: customer[1].name,
//       },
//     },
//     product: {
//       connect: {
//         id: products[1].id,
//       },
//     },
//     quantity: 1,
//   },
// ];

// const getOrders = (
//   staff: Staff[],
//   payment: PaymentMethod[],
//   basket: Basket[],
//   status: Status[]
// ): Prisma.OrderCreateInput[] => [
//   {
//     staff: {
//       connect: {
//         id: staff[0].id,
//         first_name: staff[0].first_name,
//         last_name: staff[0].last_name,
//       },
//     },
//     paymentMethod: {
//       connect: {
//         id: payment[0].id,
//         paymentType: payment[0].paymentType,
//       },
//     },
//     basket: {
//       connect: {
//         id: basket[0].id,
//       },
//     },
//     totalAmount: 500,
//     status: {
//       // connect: {
//       //   id: status[0].
//       // }
//     },
//   },
// ];

const main = async () => {
  const categories = await Promise.all(
    getCategories().map((category) =>
      client.category.create({ data: category })
    )
  );
  const customers = await Promise.all(
    getCustomer().map((customer) => client.customer.create({ data: customer }))
  );
  const staffs = await Promise.all(
    getStaff().map((staff) => client.staff.create({ data: staff }))
  );
  const paymentMethod = await Promise.all(
    getPaymentMethod().map((method) =>
      client.paymentMethod.create({ data: method })
    )
  );
  const status = await Promise.all(
    getStatus().map((status) => client.order_Status.create({ data: status }))
  );
  const products = await Promise.all(
    getProducts(categories).map((product) =>
      client.product.create({ data: product })
    )
  );

  const tables = await Promise.all(
    getTable().map((table) => client.table.create({ data: table }))
  );
  // const baskets = await Promise.all(
  //   getBasket(customers, products).map((basket) =>
  //     client.basket.create({ data: basket })
  //   )
  // );
};

main();