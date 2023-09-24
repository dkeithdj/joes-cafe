import React from "react";

const Order = async () => {
  const response = await fetch("http://localhost:3000/api/customer", {
    method: "GET",
    cache: "no-cache",
  });
  const data = await response.json();

  console.log(data);

  return <div>Order</div>;
};

export default Order;
