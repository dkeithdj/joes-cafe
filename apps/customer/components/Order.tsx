"use client";
import Image from "next/image";
import Cookies from "js-cookie";
import { Button } from "@ui/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { trpc } from "@customer/hooks/trpc";

const Order = () => {
  const params = useParams();
  const router = useRouter();

  const utils = trpc.useUtils();

  const orderId = Cookies.get("orderId") as string;
  const customerId = Cookies.get("customer.customer") as string;
  const customerName = Cookies.get("customer.name") as string;
  // if (!orderId) return <div>Loading Cookies...</div>;
  const { data, isFetched, isError, error } = trpc.getOrderById.useQuery({
    orderId: orderId,
  });
  // const { data, isFetched, isError, error } = useOrder(orderId);

  trpc.onUpdateOrder.useSubscription(undefined, {
    onData: (data) => {
      // TODO: can use this as a route redirect for kitchen
      console.log(data);
      utils.getOrderById.invalidate({ orderId: orderId });
    },
  });

  if (data?.status?.status !== "Processing") console.log("Order Processed");

  // const { mutate: updateTransaction, data: newTransactionId } = useUpdateTransaction();
  const { mutate: updateTransaction, data: newTransactionId } =
    trpc.updateTransaction.useMutation();

  const returnOrder = () => {
    Cookies.remove("orderId");
    //create transactionId here
    updateTransaction({ id: customerId, name: customerName });
    // const transactionId = newTransactionId?.id as string;
    // Cookies.set("customer.transaction", transactionId, { sameSite: "none" });

    router.back();
  };
  return (
    <div className="relative bg-gradient-to-t from-[#E7D6B8] to-[#D2B48C] min-h-screen bg-no-repeat">
      <div className="absolute w-full h-full z-0 bg-[url('/background.png')]"></div>
      <div className="flex justify-center items-center w-full h-screen z-10">
        <div className="flex flex-col justify-center items-center w-80 h-96">
          <div className="plate border rounded-full bg-white w-64 h-64 mb-10 drop-shadow-[1px_3px_1px_rgba(0,0,0,0.2)] select-none">
            <Image
              className="logo drop-shadow-[1px_6px_1px_rgba(0,0,0,0.2)] object-cover select-none"
              src="/Joes-Logo-Whitebg.png"
              alt="background"
              width={300}
              height={300}
            />
          </div>
          <div className="text-center z-10">
            {data?.status?.status === "Processing" && (
              <p className="font-['Zilla Slab'] font-light text-[32px]">
                WAITING FOR YOUR PAYMENT...
              </p>
            )}
            {data?.status?.status === "Preparing" && (
              <div>
                <p className="font-['Zilla Slab'] font-light text-[32px]">
                  Order is Preparing in the Kitchen
                </p>
              </div>
            )}
            {data?.status?.status === "Brewing" && (
              <div>
                <p className="font-['Zilla Slab'] font-light text-[32px]">
                  On the way!
                </p>
              </div>
            )}
            {data?.status?.status === "Completed" && (
              <div>
                <p className="font-['Zilla Slab'] font-light text-[32px]">
                  Enjoyed your food?
                </p>
                <Button onClick={returnOrder}>Order Again!</Button>
              </div>
            )}
            {data?.status?.status === "Declined" && (
              <div>
                <p className="font-['Zilla Slab'] font-light text-[32px]">
                  Order Declined
                </p>
                <Button onClick={returnOrder}>Go back to ordering!</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
