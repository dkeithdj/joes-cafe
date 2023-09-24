"use client";
import Products from "@/components/Products";
import prisma from "@/lib/prisma";
import { fetcher } from "@/lib/utils";
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

  const { data, error } = useSWR("http://localhost:3000/api/customer", fetcher);

  console.log(data);
  console.log(error);

  // const getProducts = await prisma.product.findMany({
  //   include: {
  //     category: true,
  //   },
  // });

  // const orders = await prisma.order.findMany({
  //   select: {
  //     id: true,
  //     date: true,
  //     staff: {
  //       select: {
  //         id: true,
  //         first_name: true,
  //         last_name: true,
  //       },
  //     },
  //     status: {
  //       select: {
  //         status: true,
  //       },
  //     },
  //     table: {
  //       select: {
  //         number: true,
  //       },
  //     },
  //     paymentMethod: {
  //       select: {
  //         paymentType: true,
  //       },
  //     },
  //     totalAmount: true,
  //     transaction: {
  //       select: {
  //         customer: {
  //           select: {
  //             name: true,
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  // orders.map((order) => console.log(order));

  // console.log(orders);

  // console.log(basket.map((product) => product));
  // console.log(products.map((product) => product));

  // const getProducts = await fetch("http://localhost:3000/api/products", {
  //   method: "GET",
  // });

  // const setProducts = await fetch("http://localhost:3000/api/products", {
  //   method: "POST",
  //   body: JSON.stringify({ input: "heyhey" }),
  // });

  // const getCustomers = await fetch("http://localhost:3000/api/customer", {
  //   method: "GET",
  // });

  // const customers = await getCustomers.json();

  // console.log(customers);
  // console.log(data);

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
        {customers.map((customer) => (
          <div>{customer.name}</div>
        ))}
      </div>
    </div>
  );
};

export default CustomerOrder;
