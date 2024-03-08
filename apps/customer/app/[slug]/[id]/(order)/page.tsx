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

  const categoryParam = searchparams.get("category");

  const {
    data: products,
    isSuccess,
    isLoading,
    isError,
    error,
  } = trpc.getProducts.useQuery(categoryParam!);

  const customerCookie = Cookies.get("customer.customer");

  useEffect(() => {
    if (customerCookie === undefined) router.push(`/${params.slug}`);
  }, [customerCookie]);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error. Try refreshing</div>;

  return (
    <div className="text-white ">
      <div className="grid grid-cols-2 gap-x-5 gap-y-5 pl-5 pr-5 pt-5 w-full bg-[#f9ebd3] h-full md:grid-cols-3 lg:grid-cols-4 place-items-center ">
        {isSuccess &&
          products?.map((product) => (
            <Products key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CustomerOrder;
