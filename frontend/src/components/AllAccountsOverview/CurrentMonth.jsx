import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [{ name: "April", income: 4000, expenses: 3000 }];

function CurrentMonth() {
  return (
    <div>
      <h1>Total spend this month</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#82ca9d" />
          <Bar dataKey="expenses" fill="#ff6961" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CurrentMonth;
