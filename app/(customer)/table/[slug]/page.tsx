"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const ProductView = ({ params }: { params: { slug: string } }) => {
  const [name, setName] = useState("");
  const router = useRouter();

  //@ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the POST request here
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      });

      if (response.ok) {
        const customer = await response.json();
        router.push(`/table/${params.slug}/${customer.id}`);
      } else {
        console.error("Failed to submit name");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div>Create Customer UI here</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ProductView;
