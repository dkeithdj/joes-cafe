"use client";
import { getOrders } from "@/lib/controller";
import prisma from "@/lib/prisma";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

const TableView = () => {
  // const queryClient = useQueryClient();
  // const query = useQuery({
  //   queryKey: ["orders"],
  //   queryFn: getOrders,
  // });
  const query = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>Error</div>;

  const { data } = query;

  console.log(data.map((order) => order.id));
  return (
    <div>
      <div>Scan QR code again to order</div>
      <div>
        {data.map((order) => (
          <div key={order.id}>
            <div>id: {order.id}</div>
            <div>table: {order.table.number}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableView;
