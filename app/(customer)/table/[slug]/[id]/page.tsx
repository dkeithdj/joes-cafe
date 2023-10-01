"use client";
import Products from "@/components/Product";
import prisma from "@/lib/prisma";
import { fetcher } from "@/lib/utils";
import { ProductProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const CustomerOrder = ({
  params,
}: {
  params: { id: string; slug: string };
}) => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [amount, setAmount] = useState([]);
  // const [customers, setCustomers] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    setProducts(data);
  };

  const fetchAmount = async () => {
    const response = await fetch("/api/items");
    const data = await response.json();
    setAmount(data);
  };
  // const fetchCustomers = async () => {
  //   const response = await fetch("/api/customers");
  //   const data = await response.json();
  //   setCustomers(data);
  // };

  useEffect(() => {
    fetchProducts();
    fetchAmount();
    // fetchCustomers();
  }, []);
  // console.log(products);
  console.log(amount);

  // console.log(qqCustomers.data);

  // console.log(qCustomers);
  // if (!error) {
  //   console.log(data);
  // } else {
  //   console.log(error);
  // }
  // const itemsCookie = Cookies.get("items");
  // if (itemsCookie) {
  //   const itemsList = JSON.parse(itemsCookie);
  //   console.log(itemsList);
  // }

  const customerCookie = Cookies.get("customer");
  if (!customerCookie) router.push(`/table/${params.slug}`);

  // console.log(JSON.parse(Cookies.get("customer")));

  return (
    <div className="text-white">
      {/* <div className="text-lg">Customer Order</div>
      <div className="">
        This is the table ID:{" "}
        <span className="text-red-500">{params.slug}</span>
      </div>
      <div>
        This is the customer ID:{" "}
        <span className="text-red-500">{params.id}</span>
      </div> */}

      <div className="grid grid-cols-2 place-items-center px-2 md:flex">
        {products.map((product: ProductProps) => (
          <Products key={product.id} product={product} />
        ))}
      </div>
      {/* <div>
        {customers.map((customer: CustomerProps) => (
          <div key={customer.id}>{customer.name}</div>
        ))}
      </div> */}
    </div>
  );
};

export default CustomerOrder;
