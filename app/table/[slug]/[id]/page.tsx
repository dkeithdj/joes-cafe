"use client";
import Products from "@/components/Products";
import prisma from "@/lib/prisma";
import { fetcher } from "@/lib/utils";
import { CustomerProps } from "@/types";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const CustomerOrder = ({
  params,
}: {
  params: { id: string; slug: string };
}) => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    setProducts(data);
  };

  const fetchCustomers = async () => {
    const response = await fetch("/api/customer");
    const data = await response.json();
    setCustomers(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCustomers();
  }, []);

  const { data, error } = useSWR(
    "http://localhost:3000/api/customers",
    fetcher
  );

  // if (!error) {
  //   console.log(data);
  // } else {
  //   console.log(error);
  // }

  return (
    <div className="text-white">
      <div className="text-lg">Customer Order</div>
      <div className="">
        This is the table ID:{" "}
        <span className="text-red-500">{params.slug}</span>
      </div>
      <div>
        This is the customer ID:{" "}
        <span className="text-red-500">{params.id}</span>
      </div>

      <div className="grid grid-cols-2 place-items-center px-2 md:flex">
        {products.map((product) => (
          <Products product={product} />
        ))}
      </div>
      <div>
        {customers.map((customer: CustomerProps) => (
          <div key={customer.id}>{customer.name}</div>
        ))}
      </div>
    </div>
  );
};

export default CustomerOrder;
