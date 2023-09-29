"use client";
import prisma from "@/lib/prisma";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

const TableView = () => {
  // const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("/api/orders");
      const data = await res.json();

      return data;
    },
  });

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>Error</div>;

  const data = query.data;
  return (
    <div>
      <div>Scan QR code again to order</div>
      <div>
        {data.map((e: { id: string; table: { number: string } }) => (
          <div key={e.id}>
            <div>id: {e.id}</div>
            <div>table: {e.table.number}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableView;
