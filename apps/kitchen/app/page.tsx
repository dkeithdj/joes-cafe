import KitchenOrder from "@kitchen/components/KitchenOrder";
import _Orders from "@kitchen/components/_Orders";
import { Card, CardDescription, CardHeader } from "@ui/components/ui/card";
import Image from "next/image";

const orderTemp = [
  {
    id: "asdfasdf",
    name: "Test Order",
    table: "Table 1",
    status: "incoming",
    items: [
      {
        id: "wftr",
        name: "Test Item",
        quantity: 2,
      },
      {
        id: "aa",
        name: "Test Item 1",
        quantity: 1,
      },
      {
        id: "he",
        name: "Test Item 2",
        quantity: 3,
      },
    ],
  },
  {
    id: "hiae",
    name: "Test Order 1",
    table: "Table 23",
    status: "ongoing",
    items: [
      {
        id: "wftr",
        name: "Test Item",
        quantity: 2,
      },
      {
        id: "aa",
        name: "Test Item 1",
        quantity: 1,
      },
      {
        id: "he",
        name: "Test Item 2",
        quantity: 3,
      },
    ],
  },
  {
    id: "aai",
    name: "Test Order 2",
    table: "Table 11",
    status: "completed",
    items: [
      {
        id: "wftr",
        name: "Test Item",
        quantity: 2,
      },
      {
        id: "aa",
        name: "Test Item 1",
        quantity: 1,
      },
      {
        id: "he",
        name: "Test Item 2",
        quantity: 3,
      },
    ],
  },
  {
    id: "hoe",
    name: "Test Order 3",
    table: "Table 12",
    status: "completed",
    items: [
      {
        id: "wftr",
        name: "Test Item",
        quantity: 2,
      },
      {
        id: "aa",
        name: "Test Item 1",
        quantity: 1,
      },
      {
        id: "he",
        name: "Test Item 2",
        quantity: 3,
      },
    ],
  },
];

const KitchenPage = () => {
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-2 justify-items-center">
      <Card>
        <CardHeader className="bg-[#D2B48C] rounded-md rounded-b-none">
          Incoming
        </CardHeader>
        {orderTemp
          .filter((filter) => filter.status === "incoming")
          .map((order) => (
            <KitchenOrder order={order} />
          ))}
      </Card>
      <Card>
        <CardHeader className="bg-[#D2B48C] rounded-md rounded-b-none">
          On-going
        </CardHeader>
        {orderTemp
          .filter((filter) => filter.status === "ongoing")
          .map((order) => (
            <KitchenOrder order={order} />
          ))}
      </Card>
      <Card>
        <CardHeader className="bg-[#D2B48C] rounded-md rounded-b-none">
          Completed
        </CardHeader>
        {orderTemp
          .filter((filter) => filter.status === "completed")
          .map((order) => (
            <KitchenOrder order={order} />
          ))}
      </Card>
    </div>
  );
};

export default KitchenPage;
