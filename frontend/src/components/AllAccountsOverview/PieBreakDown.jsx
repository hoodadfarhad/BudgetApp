import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = [
    "#FF6384", // Red-Pink
    "#36A2EB", // Blue
    "#FFCE56", // Yellow
    "#4BC0C0", // Teal
    "#9966FF", // Purple
    "#FF9F40", // Orange
    "#C9CBCF", // Gray
    "#FF5A5E", // Red
    "#8B0000", // Dark Red
    "#00FA9A", // Medium Spring Green
    "#FFD700", // Gold
    "#1E90FF", // Dodger Blue
    "#ADFF2F", // Green Yellow
    "#FF69B4", // Hot Pink
    "#20B2AA", // Light Sea Green
    "#CD5C5C", // Indian Red
    "#87CEEB", // Sky Blue
    "#32CD32", // Lime Green
    "#8A2BE2", // Blue Violet
    "#FFA07A"  // Light Salmon
  ];
  


function PieBreakDown(prop) {

const [categories, setCategories] = useState([
  ]);

useEffect (() => {

    async function catGetter(params) {

        
        
        const res = await fetch("http://localhost:5001/api/getCatAmount", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: prop.id, date: prop.date,  accountID: prop.accountID }),
          });

          const CatAmount = await res.json();

          
          
          const parsed = CatAmount.map(item => ({
            ...item,
            sum: parseFloat(item.total)
          }))


     let   accumulated =  parsed.reduce((acc, item) => acc + item.sum, 0)

     const percent = parsed.map(item => ({
      ...item,
      sum: Math.round((parseFloat(item.total)/accumulated)*100)
    }));

    //  console.log(accumulated);
    //   console.log(percent);
      
     
     
          
          setCategories(percent);
        
          
    }
    
catGetter();




},[prop.id, prop.date, prop.accountID])
// console.log("john cena");

// console.log(categories);

// if (categories.length > COLORS.length) {
    
// }


  return (


    <div>
      <h2 className="pieH2">Category BreakDown</h2>
    <div className="chart" style={{marginBottom:"80px"}}>




      {categories.length === 0 ? 
      
      
      
      
      
      (
        <div style={{ textAlign: "center", marginTop: 50 }}>
          <div style={{
            width: 220,
            height: 220,
            borderRadius: "50%",
            border: "8px dashed #ccc",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            color: "#888"
          }}>
      
            <div>
              <p style={{ margin: 0 }}>No data yet</p>
              <p style={{ fontSize: 14, color: "#aaa" }}>Your pie chart will appear here!</p>
            </div>
          </div>
        </div>
      )
      
      
      
      
      
      
      
      : 
      

      <ResponsiveContainer  width= "100%" height={320} >
      


        
        <PieChart>
          <Pie
            data={categories}
            dataKey="sum"
            nameKey="category_name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label = {({ name, value }) => `${value}%`}
          >
            {categories.map((item, index) => (
              <Cell key={`slice-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
     
      } </div>  </div>
      
    
  );
}

export default PieBreakDown;
