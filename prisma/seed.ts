import { Category, Prisma, PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const getCategories = (): Prisma.CategoryCreateInput[] => [
  { name: "Iced Joe", description: "Iced Joe latte" },
];

const getProducts = (category: Category): Prisma.ProductsCreateInput[] => [
  {
    productName: "Iced Dark Choco Latte",
    price: 130,
    category: {
      connect: {
        id: category.id,
        name: category.name,
        description: category.description,
      },
    },
    isAvailable: true,
  },
];

const main = async () => {
  const categories = await Promise.all(
    getCategories().map((category) =>
      client.category.create({ data: category })
    )
  );
  const products = await Promise.all(
    getProducts(category).map((product) =>
      client.products.create({ data: product })
    )
  );
};
