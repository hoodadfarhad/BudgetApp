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
  
  const [sums, setSums] = useState({ monthName: "avrill", income: 0, expenses: 0 });


useEffect(()=>{
  console.log(sums);
  async function historyCalc() {
    const res = await fetch("http://localhost:5001/api/figureCalc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: prop.id }),
    });
    const calcResult = await res.json();

    

    setSums((prev)=>({
      ...prev,
      income: parseFloat(calcResult[1].sum),
      expenses: parseFloat(calcResult[0].sum),
    }))
    // console.log(calcResult);
    
    // setHistory(transactionHistory);

    if (res.ok) {
      console.log("Transactions pulled!");
    } else {
      console.log("Something went wrong with pulling transactions.");
    }
  }
 
  




  historyCalc();
  
},[prop.id])
  
useEffect(() => {
  // console.log("Updated sums:", sums);
}, [sums]);
  

  return (
    <div>
      <h1>Total spend in  <button onClick={() => alert("Clicked!")}>Click Me</button></h1>
      <ResponsiveContainer width="100%" height={300}>
     
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
  );
}

export default CurrentMonth;
