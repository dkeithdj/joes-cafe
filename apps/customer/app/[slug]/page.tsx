"use client";
// import React, { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
import { trpc } from "@customer/hooks/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ui/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { Input } from "@ui/components/ui/input";
import Cookies from "js-cookie";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

const ProductView = () => {
  const params = useParams();
  const router = useRouter();

  const customerCookies = Cookies.get("customer.customer");

  const { data: session } = trpc.getSession.useQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const {
    mutate: addTransaction,
    isSuccess,
    isPending,
    isError,
    data,
    error,
  } = trpc.createTransaction.useMutation();

  useEffect(() => {
    if (customerCookies) {
      router.push(`/${params.slug}/${customerCookies}`);
    } else {
      console.log("no customer cookies");
    }
  }, [data]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addTransaction(values);
  };

  return (
    <div>
      <div className="relative flex justify-center items-center bg-gradient-to-t from-[#E7D6B8] to-[#D2B48C] h-screen bg-no-repeat ">
           {/*This is the background */}
          <div className="absolute w-full h-full z-0">
          <Image 
          className="w-full h-full object-cover sm " 
          src="/background.png"
          alt="background"
          layout="fill"
          />
           {/*This is the logo */}
          </div>
          <div className="absolute flex justify-center w-full select-none z-20">
            <Image
              className="absolute -top-[300px] w-64 object-cover "
              src="/Joes-Logo-Whitebg.png"
              alt="joes"
              width={200}
              height={200}
            />
          </div>
        {/*This is the transparent background */}
        <div className="box" style={{ width: '20rem', height: '20rem', position: 'relative' }}>
        <div style={{ content: ' ', position: 'absolute', width: '20rem', height: '20rem', background: 'white', zIndex: '1', mixBlendMode: 'soft-light', borderRadius: '10px' }}></div>
        </div>
   
        <div className="absolute w-80 h-80 flex justify-center items-center select-none z-10">
          <div className="relative w-full h-60 top-4 flex justify-center items-center">
            {/* <p className="name absolute top-16">WHAT SHOULD WE CALL YOU?</p> */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-center text-sm">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="customer name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your name on the receipt.
                      </FormDescription>
                      <FormMessage className="text-xs"/>
                    </FormItem>
                  )}
                />
                <div className="flex justify-center mt-2">
                  <Button type="submit" disabled={isPending}>
                  Submit
                  </Button>
                </div>
            
              </form>
            </Form>
          </div>
          {/* <form className="relative flex w-72 pt-10" onSubmit={handleSubmit}> */}
          {/*   <div className="relative flex flex-row w-full h-12 border rounded-l-xl rounded-r-md"> */}
          {/*     <input */}
          {/*       type="text" */}
          {/*       className="absolute h-10 rounded-md font-['Zilla Slab'] p-2 border-[2px] border-solid border-[#664229]" */}
          {/*       placeholder="" */}
          {/*       id="name" */}
          {/*       value={name} */}
          {/*       onChange={(e) => setName(e.target.value)} */}
          {/*       required */}
          {/*     /> */}
          {/*     <button */}
          {/*       disabled={submitting} */}
          {/*       className="hover:bg-[#664229be] absolute right-0 bg-[#664229] w-24 h-10 rounded-md flex justify-center items-center text-white" */}
          {/*     > */}
          {/*       <p>CONFIRM</p> */}
          {/*     </button> */}
          {/*     <label className="absolute text-[14px] left-2 top-2 cursor-text select-none "> */}
          {/*       NAME */}
          {/*     </label> */}
          {/*   </div> */}
          {/* </form> */}
        </div>
      
      </div>
    </div>
  );
};

export default ProductView;
