"use client";
import KitchenOrder from "@kitchen/components/KitchenOrder";
import { trpc } from "@kitchen/hooks/trpc";
import { Card, CardDescription, CardHeader } from "@ui/components/ui/card";

const KitchenPage = () => {
  const utils = trpc.useUtils();

  const { data: orderData, isSuccess } = trpc.getKitchenOrders.useQuery();

  trpc.onUpdateOrder.useSubscription(undefined, {
    onData: (data) => {
      utils.getKitchenOrders.invalidate();
    },
  });

  const { mutate: updateOrder } = trpc.updateKitchenOrder.useMutation({
    onSuccess: (data) => {
      utils.getKitchenOrders.invalidate();
    },
  });

  // moves from Preparing -> Brewing
  const handleIncoming = (orderId: string) => {
    // 5: Brewing
    updateOrder({ orderId: orderId, statusId: "5" });
  };
  // moves from Brewing -> Completed
  const handleOnGoing = (orderId: string) => {
    // 2: Completed
    updateOrder({ orderId: orderId, statusId: "2" });
  };
  // can view the status/info of item
  const handleCompleted = (orderId: string) => {
    console.log(`Order ${orderId} Served`);
  };
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-2 justify-items-center ">
      <Card className="rounded-3xl w-11/12 my-16">
        <CardHeader className="bg-[#D2B48C] rounded-3xl rounded-b-none w-full flex items-center justify-center">
          <h1 className="text-3xl text-mainText alata leading-10 text-[#512711]">
          INCOMING
          </h1>
        </CardHeader>
        {isSuccess &&
          orderData
            .filter((filter) => filter.status.status.toString() === "Preparing")
            .map((order, i) => (
              <KitchenOrder
                key={i}
                order={order}
                handleOrder={handleIncoming}
                text={"Accept"}
                color={"#D2B48C"}
              />
            ))}
      </Card>
      <Card className="rounded-3xl w-11/12 my-16">
        <CardHeader className="bg-[#B09478] rounded-3xl rounded-b-none w-full flex items-center justify-center">
        <h1 className="text-3xl text-mainText alata text-[#F9EBD3]">
          ON-GOING
        </h1>
        </CardHeader>
        {isSuccess &&
          orderData
            .filter((filter) => filter.status.status.toString() === "Brewing")
            .map((order, i) => (
              <KitchenOrder
                key={i}
                order={order}
                handleOrder={handleOnGoing}
                text={"Complete"}
                color={"#B09478"}
              />
            ))}
      </Card>
      <Card className="rounded-3xl w-11/12 my-16">
        <CardHeader className="bg-[#603D04] rounded-3xl rounded-b-none w-full flex items-center justify-center">
        <h1 className="text-3xl text-mainText alata  text-[#F9EBD3]">
          COMPLETED
        </h1>
        </CardHeader>
        {isSuccess &&
          orderData
            .filter((filter) => filter.status.status.toString() === "Completed")
            .map((order, i) => (
              <KitchenOrder
                key={i}
                order={order}
                handleOrder={handleCompleted}
                text={"Order Served"}
                color={"#603D04"}
              />
            ))}
      </Card>
    </div>
  );
};

export default KitchenPage;
