"use client";
import Loading from "@admin/components/Loading";
import _Orders from "@admin/components/admin/_Orders";
import { RouterInputs, trpc } from "@admin/hooks/trpc";
import { Status } from "@repo/database";
import React, { useState } from "react";

const AdminOrders = () => {
  const [staff, setStaff] = useState("");
  const [status, setStatus] = useState<Status>(Status.Processing);

  const utils = trpc.useUtils();

  const { data, isSuccess: staffSuccess } = trpc.getStaff.useQuery();

  const {
    data: orders,
    isSuccess: ordersSuccess,
    isLoading,
  } = trpc.getOrders.useQuery({ status: status });

  trpc.onCreateOrder.useSubscription(undefined, {
    onData: (data) => {
      utils.getOrders.invalidate();
    },
  });

  const edit = data?.map((person) => ({
    value: person.id,
    label: person.last_name,
  }));

  const fetchStaff = edit;

  return (
    <div className="w-auto mx-14">
      {/* <Dashboard /> */}
      <div className="flex flex-row justify-between">
        <div className="text-6xl text-[#603D04] py-4 ">Orders</div>
        <div className="flex flex-row items-center gap-x-4">
          Current Staff:{" "}
          <span>
            <select
              name="staff"
              onChange={(e) => setStaff(e.target.value)}
              className="rounded-lg outline outline-[#664229b4] w-[100px] h-8"
            >
              <option value={""} disabled selected>
                Select...
              </option>
              {fetchStaff &&
                fetchStaff.map((item, i) => (
                  <option key={i} value={item.value}>
                    {item.label}
                  </option>
                ))}
            </select>
          </span>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="w-fit h-10 items-center justify-center rounded-md bg-[#E1CDAD] p-1 text-muted-foreground">
          <button
            disabled={status === "Processing"}
            onClick={() => setStatus("Processing")}
            className="inline-flex disabled:bg-[#512711] disabled:text-[#E1CDAD] items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none  "
          >
            Processing
          </button>
          <button
            disabled={status === Status.Completed}
            onClick={() => setStatus(Status.Completed)}
            className="inline-flex disabled:bg-[#512711] disabled:text-[#E1CDAD] items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none "
          >
            Completed
          </button>
          <button
            disabled={status === Status.Declined}
            onClick={() => setStatus(Status.Declined)}
            className="inline-flex disabled:bg-[#512711] disabled:text-[#E1CDAD] items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none "
          >
            Declined
          </button>
        </div>
      </div>
      <div>{isLoading && <Loading length={5} height="200" />}</div>
      {orders && orders.length !== 0 ? (
        orders.map((order, i) => (
          <_Orders staff={staff} order={order} key={i} />
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AdminOrders;
