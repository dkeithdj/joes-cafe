import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const data = [
  { name: "Page A", uv: 400 },
  { name: "Page C", uv: 300 },
  { name: "Page B", uv: 500 },
  { name: "Page D", uv: 600 },
];

const emulate_data = [
  { month: "January", customers: 42 },
  { month: "February", customers: 79 },
  { month: "March", customers: 15 },
  { month: "April", customers: 61 },
  { month: "May", customers: 36 },
  { month: "June", customers: 92 },
  { month: "July", customers: 50 },
  { month: "August", customers: 23 },
  { month: "September", customers: 87 },
  { month: "October", customers: 10 },
  { month: "November", customers: 68 },
  { month: "December", customers: 31 },
];

const Analytics = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="col-span-1 lg:col-span-2 h-[300px]">
          <div className="text-center">Number of Customers per Month</div>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart
              data={emulate_data.sort((a, b) => a.customers - b.customers)}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis name="aa" dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="customers" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="col-span-1  h-[300px]">
          <div className="text-center">Bar plot</div>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart
              data={emulate_data}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="month" type="category" scale={"band"} />
              <Tooltip />
              <Legend />
              <Bar dataKey="customers" fill="#323232" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="col-span-1  h-[300px]">
          <div className="text-center">Number of Customers per Month</div>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
