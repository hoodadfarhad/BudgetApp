import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", income: 4000, expenses: 2500 },
  { name: "Feb", income: 1000, expenses: 2700 },
  { name: "Mar", income: 3900, expenses: 3200 },
];

function CompareMonths(prop) {
  return (
    <div className="">
      <h1>compare months</h1>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#82ca9d" />
          <Line type="monotone" dataKey="expenses" stroke="#ff6961" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CompareMonths;
