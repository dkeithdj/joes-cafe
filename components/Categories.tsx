import prisma from "@/lib/prisma";

const Categories = async () => {
  const categories = await prisma.category.findMany();
  return (
    <div>
      {categories.map((category) => (
        <div className="" key={category.id}>
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
