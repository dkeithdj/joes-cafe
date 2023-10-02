"use client";
import Products from "@/components/Product";
import { ProductProps } from "@/types";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";

const CustomerOrder = () => {
  const params = useParams();
  const router = useRouter();

  const {
    data: products,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useProducts();

  const customerCookie = Cookies.get("customer");
  if (!customerCookie) router.push(`/table/${params.slug}`);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error. Try refreshing</div>;

  return (
    <div className="text-white">
      <div className="grid grid-cols-2 place-items-center md:flex">
        {isSuccess &&
          products.map((product: ProductProps) => (
            <Products key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CustomerOrder;
