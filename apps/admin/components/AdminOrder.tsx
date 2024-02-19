import React from "react";
import { OrderSelect } from "./OrderSelect";
import { useStaff } from "@admin/hooks/useStaff";
import { User2 } from "lucide-react";

const AdminOrder = ({ order }) => {
  const { data: staff, isSuccess: staffSuccess } = useStaff();
  console.log(staff);

  const new_staff = staff?.map((person) => ({
    id: person.id,
    value: `${person.first_name} ${person.last_name}`,
    label: `${person.first_name} ${person.last_name}`,
    icon: User2,
  }));

  return (
    <div>
      <div>Order ID: {order.id}</div>
      <div>Order Time: {order.date}</div>
      <div>Table Number: {order.table?.number}</div>
      <div>Total Amount: {order.totalAmount}</div>
      <br />
      <div>Order Status: {order.status?.status}</div>
      <div>{new_staff && <OrderSelect />}</div>
      <div>Staff: {order.staff}</div>
      <div>PaymentMethod: {order.paymentMethod}</div>
    </div>
  );
};

export default AdminOrder;
