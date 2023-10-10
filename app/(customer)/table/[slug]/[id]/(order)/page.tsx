"use client";
import Products from "@/components/Product";
import { ProductProps } from "@/types";
import Cookies from "js-cookie";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import { useEffect } from "react";

const CustomerOrder = () => {
  const params = useParams();
  const router = useRouter();
  const searchparams = useSearchParams();

  const {
    data: products,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useProducts();

  const customerCookie = Cookies.get("customer.customer");
  useEffect(() => {
    if (!customerCookie) router.push(`/table/${params.slug}`);
  }, [customerCookie]);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error. Try refreshing</div>;

  const categoryParam = searchparams.get("category");

  return (
    <div className="text-white ">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center ">
        {isSuccess &&
          products
            .filter((filter) =>
              categoryParam && categoryParam?.length > 0
                ? filter.category.id === categoryParam
                : filter
            )
            .map((product: ProductProps) => (
              <Products key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default CustomerOrder;
