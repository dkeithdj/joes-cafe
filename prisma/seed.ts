import {
  Items,
  Category,
  // Customer,
  PaymentMethod,
  Prisma,
  Product,
  Staff,
  PrismaClient,
  // Status,
} from "@prisma/client";

const prisma = new PrismaClient();

const getCategories = (): Prisma.CategoryCreateInput[] => [
  { name: "Iced Joe" },
  { name: "Hot Joe" },
  { name: "Frappe" },
  { name: "Smoothies" },
  { name: "Affogato" },
  { name: "Fruit Tea" },
  { name: "Fruit Latte" },
  { name: "Tea" },
  { name: "Snacks" },
  { name: "Sparkling Drinks" },
  { name: "Sandwhiches" },
  { name: "Meals" },
  { name: "Ala Carte" },
  { name: "Specials" },
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
  { id: 1, status: "Processing" },
  { id: 2, status: "Completed" },
  { id: 3, status: "Declined" },
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
      },
    },
    isAvailable: true,
  },
  {
    name: "Salisbury Steak",
    price: 150,
    category: {
      connect: {
        id: category[11].id,
      },
    },
    isAvailable: true,
  },
  {
    name: "Fries",
    price: 125,
    category: {
      connect: {
        id: category[8].id,
      },
    },
    isAvailable: true,
  },
  {
    name: "Popcorn",
    price: 100,
    category: {
      connect: {
        id: category[8].id,
      },
    },
    isAvailable: true,
  },
];

const main = async () => {
  const categories = await Promise.all(
    getCategories().map((category) =>
      prisma.category.create({ data: category })
    )
  );
  const customers = await Promise.all(
    getCustomer().map((customer) => prisma.customer.create({ data: customer }))
  );
  const staffs = await Promise.all(
    getStaff().map((staff) => prisma.staff.create({ data: staff }))
  );
  const paymentMethod = await Promise.all(
    getPaymentMethod().map((method) =>
      prisma.paymentMethod.create({ data: method })
    )
  );
  const status = await Promise.all(
    getStatus().map((status) => prisma.order_Status.create({ data: status }))
  );
  const products = await Promise.all(
    getProducts(categories).map((product) =>
      prisma.product.create({ data: product })
    )
  );

  const tables = await Promise.all(
    getTable().map((table) => prisma.table.create({ data: table }))
  );
  // const baskets = await Promise.all(
  //   getBasket(customers, products).map((basket) =>
  //     client.basket.create({ data: basket })
  //   )
  // );
};

main();
prisma.$disconnect;
