"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { ProductProps } from "@/types";
import Products from "@/components/Products";

const ProductView = ({ params }: { params: { slug: string } }) => {
  const [name, setName] = useState("");
  const router = useRouter();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
    // fetchCustomers();
  }, []);

  //@ts-ignore
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Send the POST request here
  //     const response = await fetch("/api/customers", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ name: name }),
  //     });

  //     if (response.ok) {
  //       console.log(yay);
  //       // const customer = await response.json();
  //       // router.push(`/table/${params.slug}/${customer.id}`);
  //     } else {
  //       console.error("Failed to submit name");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  return (
    <>
      <div className="grid grid-cols-2 place-items-center px-2 md:flex">
        {products.map((product: ProductProps) => (
          <Products key={product.id} product={product} />
        ))}
      </div>
      {/* <div className="relative flex justify-center items-center bg-gradient-to-t from-[#E7D6B8] to-[#D2B48C] h-screen bg-no-repeat ">
        <div className="box">
          <div className="absolute flex justify-center w-full select-none z-20">
            <Image
              className="absolute -top-36 w-64 object-cover "
              src="/Joes-Logo-Whitebg.png"
              alt="joes"
              width={200}
              height={200}
            />
          </div>
        </div>

        <div className="absolute w-80 h-80 flex justify-center items-center select-none z-10">
          <div className="relative w-full h-60 flex justify-center items-center">
            <p className="name absolute top-16">WHAT SHOULD WE CALL YOU?</p>
            <form className="relative flex w-72 pt-10" onSubmit={handleSubmit}>
              <div className="relative flex flex-row w-full h-12 border rounded-l-xl rounded-r-md">
                <input
                  type="text"
                  className="absolute h-10 rounded-md font-['Zilla Slab'] p-2 border-[2px] border-solid border-[#664229]"
                  placeholder=""
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <button className="absolute right-0 bg-[#664229] w-24 h-10 rounded-md flex justify-center items-center text-white">
                  <p>CONFIRM</p>
                </button>
                <label className="absolute text-[14px] left-2 top-2 cursor-text select-none ">
                  NAME
                </label>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ProductView;
