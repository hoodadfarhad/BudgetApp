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
            body: JSON.stringify({ id: prop.id, date: prop.date }),
          });

          const CatAmount = await res.json();

          
          const parsed = CatAmount.map(item => ({
            ...item,
            sum: parseFloat(item.sum)
          }))

          setCategories(parsed);
    }
    
catGetter();



},[prop.id, prop.date])
// console.log("john cena");

// console.log(categories);

// if (categories.length > COLORS.length) {
    
// }


  return (

    <div style={{ width: "100%", height: 300, marginTop:35  }}>

      {categories.length === 0 ? <h2>No record found.</h2>: 
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={categories}
            dataKey="sum"
            nameKey="category_name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {categories.map((item, index) => (
              <Cell key={`slice-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer> }
      
    </div>
  );
}

export default PieBreakDown;
