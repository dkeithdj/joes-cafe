"use client";
import Products from "@customer/components/Product";
import { trpc } from "@customer/hooks/trpc";
import { ProductProps } from "@customer/types";
import Cookies from "js-cookie";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
  } = trpc.getProducts.useQuery();

  const customerCookie = Cookies.get("customer.customer");

  useEffect(() => {
    if (customerCookie === undefined) router.push(`/${params.slug}`);
  }, [customerCookie]);

  // if (!customerCookie) router.push(`/${params.slug}`);

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
                : filter,
            )
            .map((product) => <Products key={product.id} product={product} />)}
      </div>
    </div>
  );
};

export default CustomerOrder;
