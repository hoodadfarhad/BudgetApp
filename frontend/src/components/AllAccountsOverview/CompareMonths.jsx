import React, { useState, useEffect } from "react";
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

// const data = [
//   { name: "Jan", income: 4000, expenses: 2500 },
//   { name: "Feb", income: 1000, expenses: 2700 },
//   { name: "Mar", income: 3900, expenses: 3200 },
// ];



  
  

function CompareMonths(prop) {


  const monthNameArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]


  const [data, setData] = useState([
    { name: monthNameArr[prop.date.month] + " " + prop.date.year, income: 40, expenses: 0 },
    { name: monthNameArr[prop.date.month - 1] + " " + prop.date.year, income: 0, expenses: 0 },
    { name: monthNameArr[prop.date.month - 2] + " " + prop.date.year, income: 0, expenses: 0 },
  ]);
  const [yAxis, setYAxis] = useState(5000);
  





  // console.log(sums.m);
  

  // console.log(monthName[sums.m-1]);
  
  

useEffect(()=>{
  

  async function compareCalc() {
    const res = await fetch("http://localhost:5001/api/compareMonthCalc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: prop.id, date: prop.date }),
    });
    const calcResult = await res.json();

    // console.log(calcResult);
    console.log(prop.date.month);
    


function adjustMonthYear(month, year) {
  let newMonth = month;
  let newYear = year;

  if (newMonth < 0) {
    newMonth += 12;
    newYear -= 1;
  }

  return  monthNameArr[newMonth] +" "+ newYear 
};




    setData((prev) => 
      [
        { name: adjustMonthYear(prop.date.month -3,prop.date.year), income: calcResult[2].income, expenses: calcResult[2].expense },
        { name: adjustMonthYear(prop.date.month -2,prop.date.year), income:calcResult[1].income, expenses: calcResult[1].expense },
        { name: adjustMonthYear(prop.date.month-1,prop.date.year), income: calcResult[0].income, expenses: calcResult[0].expense },
      ]
    );
    
  }
    

  function highestFinder(arr) {
  
  
    let highest = -Infinity;
  
    for (const obj of arr) {
      for (const key in obj) {
        const value = parseFloat(obj[key]);
        if (typeof value === "number" && value > highest) {
          highest = value;
        }
      }
    }
  
    console.log("Highest value:", highest);
    return highest;
  }
  


  compareCalc();

setYAxis(highestFinder(data));

  
},[prop.id, prop.date])

  // prop.id --> instead of Zustand
  return (
    <div className="">
      <h1>compare months</h1>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, Math.ceil((yAxis + 500)/100)*100]} />
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
