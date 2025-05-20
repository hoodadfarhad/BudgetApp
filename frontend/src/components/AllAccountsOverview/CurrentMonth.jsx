import React, { useState , useEffect} from "react";

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



function CurrentMonth(prop) {
  

  const monthNameArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]

  const [sums, setSums] = useState({monthName: monthNameArr[ new Date().getMonth()] + new Date().getFullYear() ,  income: 0, expenses: 0 });

  // console.log(sums.m);
  const API_BASE = process.env.REACT_APP_API_BASE;

  // console.log(monthName[sums.m-1]);
  
  

useEffect(()=>{
  
  // console.log(prop.accountID);
  

  async function historyCalc() {
  
      const res = await fetch(`${API_BASE}/api/figureCalc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: prop.id, date: prop.date, accountID: prop.accountID }),
      });
      const calcResult = await res.json();
  
   
    // console.log(calcResult);
    


    setSums((prev)=>({
      ...prev,
      monthName: monthNameArr[ prop.date.month -1] + " "+ prop.date.year,
      income: calcResult.find(item => item.is_income == true)?.sum || 0,
      expenses: calcResult.find(item => item.is_income == false)?.sum || 0,
    }))

  }
 

  historyCalc();
 
  
  
  console.log(sums);


  
},[prop.id, prop.date, prop.accountID])
  
  

  return (
    <div>
      <h2>Total Spend</h2>


      <div className="chart d-flex flex-column align-items-center justify-content-center">
      <div style={{ width: "100%", maxWidth: 400 }}>
      <ResponsiveContainer width="100%" height={320}>
     
        <BarChart data={[sums]}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="monthName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#82ca9d" />
          <Bar dataKey="expenses" fill="#ff6961" />
        </BarChart>
       
      </ResponsiveContainer>
    </div>
    </div>
    </div>
  );
}

export default CurrentMonth;
