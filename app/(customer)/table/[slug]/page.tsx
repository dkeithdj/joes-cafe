"use client";
// import React, { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { ProductProps } from "@/types";
import Products from "@/components/Product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCustomer,
  createTransaction,
  getProducts,
} from "@/lib/controller";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Cookies from "js-cookie";

const ProductView = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();

  const [name, setName] = useState("");

  const customerRef = useRef(null);
  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const products = queryProduct.data;

  // const queryTransaction = useQuery({
  //   queryKey: ["transaction"],
  //   queryFn: createTransaction,
  // });

  // console.log(queryTransaction);
  // const queryClient = useQueryClient();
  // console.log(queryClient.getQueriesData(["products"]));

  // router.push(`/table/${"56244adf-37ba-436a-8099-bf67b08f3b7b"}`);

  // console.log(params.slug);

  // const addCustomer = useMutation({
  //   mutationFn: createCustomer,
  //   // onSuccess: (data, variable, context) => {
  //   //   console.log(data)
  //   //   // router.push("")
  //   // }
  // });
  // console.log(addCustomer);

  const customerCookies = Cookies.get("customer");
  if (customerCookies) {
    const data = JSON.parse(customerCookies);
    router.push(`/table/${params.slug}/${data.customer}`);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Send the POST request here
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      });

      if (response.ok) {
        // console.log("yay");
        // console.log(response);

        const customer = await response.json();
        console.log(customer);

        Cookies.set(
          "customer",
          JSON.stringify({
            transaction: customer.id,
            customer: customer.customerId,
          }),
          { expires: 1 }
        );

        router.push(`/table/${params.slug}/${customer.customerId}`);
      } else {
        console.error("Failed to submit name");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {/* <input
        className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
      /> */}
      {/* <label
        className="inline-block pl-[0.15rem] hover:cursor-pointer"
        htmlFor="flexSwitchCheckDefault"
      >
        Default switch checkbox input
      </label> */}
      {/* <div className="text-lg">Customer Order</div>
      <div className="">
        This is the table ID:{" "}
        <span className="text-red-500">{params.slug}</span>
      </div>
      <div className="grid grid-cols-2 place-items-center px-2 md:flex">
        {products &&
          products.map((product: ProductProps) => (
            <Products key={product.id} product={product} />
          ))}
      </div> */}
      <div className="relative flex justify-center items-center bg-gradient-to-t from-[#E7D6B8] to-[#D2B48C] h-screen bg-no-repeat ">
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
      </div>
    </div>
  );
};

export default ProductView;
