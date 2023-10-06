"use client";
import { useOrders } from "@/hooks/useOrders";
import { useStaff } from "@/hooks/useStaff";
import { useStatus } from "@/hooks/useStatus";
import { OrderSelect } from "./OrderSelect";
import React from "react";
import { User2 } from "lucide-react";

const Dashboard = () => {
  const { data: orders, isSuccess: ordersSuccess } = useOrders();
  console.log(orders);

  const { data: staff, isSuccess: staffSuccess } = useStaff();
  console.log(staff);

  const new_staff = staff?.map((person) => ({
    id: person.id,
    value: `${person.first_name} ${person.last_name}`,
    label: `${person.first_name} ${person.last_name}`,
    icon: User2,
  }));

  // console.log(new_staff);

  const { data: status } = useStatus();
  console.log(status);

  return (
    <div>
      <div>
        <div>Staff</div>
      </div>
      <div>
        <div>Orders</div>
        <div className="">
          {ordersSuccess &&
            orders.map((order, i) => (
              <div key={i} className="py-4">
                <div>Order ID: {order.id}</div>
                <div>Order Time: {order.date}</div>
                <div>Table Number: {order.table?.number}</div>
                <div>Total Amount: {order.totalAmount}</div>
                <br />
                <div>Order Status: {order.status?.status}</div>
                <div>
                  <OrderSelect />
                </div>
                <div>Staff: {order.staff}</div>
                <div>PaymentMethod: {order.paymentMethod}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
