import prisma from "@/lib/prisma";

const Categories = async () => {
  const categories = await prisma.category.findMany();
  return (
    <div className="flex justify-between w-full gap-5 flex-wrap">
      <div className="flex gap-2 overflow-auto">
        {categories.map((category) => (
          <div
            className="px-4 py-3 rounded-lg capitalize whitespace-nowrap"
            key={category.id}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
