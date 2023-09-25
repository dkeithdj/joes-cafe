"use client";
import { fetcher } from "@/lib/utils";
import React from "react";
import useSWR from "swr";

const Orders = () => {
  const getOrders = () => {
    const { data, error } = useSWR("http://localhost:3000/api/orders", fetcher);
    if (!error) {
      console.log(data);
    } else {
      console.log(error);
    }
  };
  const getItems = () => {
    const { data, error } = useSWR(
      `http://localhost:3000/api/items/${"72ac1510-c31d-46b6-906d-cf8a884c55d8"}`,
      fetcher
    );
    if (!error) {
      console.log(data);
    } else {
      console.log(error);
    }
  };

  getOrders();
  console.log("owowow1");
  getItems();

  return <div>Order</div>;
};

export default Orders;
