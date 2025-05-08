import React from "react";
import { useState, useEffect } from "react";
import "../styles.css"; 


 
import "bootstrap-icons/font/bootstrap-icons.css";

function TableRecent(prop) {
  const [range, setRange] = useState({ from: 0, to: 5, pgNumber: 1 });
  const [history, setHistory] = useState([]);
  const [hoveredDescription, setHoveredDescription] = useState("");
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  
 
  const monthNameArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]





useEffect(() => {
  // console.log(history);
  async function transactionHistoryGetter() {
    const res = await fetch("http://localhost:5001/api/getAllTransactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: prop.id, date: prop.date, accountID: prop.accountID }),
    });
    const transactionHistory = await res.json();
  
    
    setHistory(transactionHistory);


    // if (res.ok) {
    //   console.log("Transactions pulled!");
    // } else {
    //   console.log("Something went wrong with pulling transactions.");
    // }
  }

  transactionHistoryGetter();
}, [prop.id, prop.date, prop.accountID]);

  const numOfPgs = Math.ceil(history.length / 5);

  function nextPg() {
    setRange((prev) => {
      return {
        from: prev.from + 5,
        to: prev.to + 5,
        pgNumber: prev.pgNumber + 1,
      };
    });
  }

  function prevPg() {
    setRange((prev) => {
      return {
        from: prev.from - 5,
        to: prev.to - 5,
        pgNumber: prev.pgNumber - 1,
      };
    });
  }



  
  function handleClick(item) {  // ITEM MITUNE INJA ITEM.ID tarif BESHE VASE INSERT/UPDATE
    console.log("I was clicked!?");
    prop.setModifyExpData({
      category: item.category_name,
      account: item.account_name, // vaqti history ro set mikonim
      date: item.date,
      isIncome: item.is_income,
      description: item.description,
      amount: item.amount,
      modifiedRow: item.id,
      transEditRequested: true
    })


    
    prop.setClickedOption(1);
     
  }

  return (
    <div className="table-responsive tableHeight ">
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Modify</th>
          </tr>
        </thead>
        {history.length !== 0 ?   
        <tbody>
        {history.slice(range.from, range.to).map((item, index) => {
  // console.log(item.is_income, typeof item.is_income);
  // console.log(item);
  return (
    <tr key={index} 
    onMouseEnter={(e) => {
      setHoveredDescription(item.description);
      setShowTooltip(true);
      setHoverPosition({ x: e.clientX, y: e.clientY });
    }}
    onMouseMove={(e) => {
      setHoverPosition({ x: e.clientX, y: e.clientY });
    }}
    onMouseLeave={() => {
      setShowTooltip(false);
    }}>
      {/* <td>{index + 1}</td> */}
      <td>{item.category_name}</td>
      <td style={{
    backgroundColor:
      item.is_income === true
        ? "#d4edda"
        : "#f8d7da",
  }}>{item.amount}</td>
      <td>{item.date.slice(0, 10)}</td>
      {/* <td>{item.description}</td> */}
      <td>
        <button onClick={() => handleClick(item)}>
          <i className="bi bi-pencil-square"></i>
        </button>
      </td>
    </tr>
  );
})}

        </tbody> : <tr>
      <td colSpan={4} style={{ textAlign: "center" }}>
        No transactions found.
      </td>
    </tr> }
      
      </table>

{history.length === 0 ? <p>no record</p>: <div className="d-flex justify-content-center align-items-center gap-3">
        <button
          className="btn btn-secondary"
          onClick={prevPg}
          disabled={range.pgNumber === 1}
        >
          &lt;
        </button>

        <span>
          Page {range.pgNumber} of {numOfPgs}
        </span>

        <button
          className="btn btn-secondary"
          onClick={nextPg}
          disabled={range.pgNumber === numOfPgs}
        >
          &gt;
        </button>
      </div>}
      

      {showTooltip ? (
  <div
    style={{
      position: "fixed",
      top: hoverPosition.y + 15,
      left: hoverPosition.x + 15,
      backgroundColor: "black",
      color: "white",
      padding: "6px 10px",
      borderRadius: "4px",
      pointerEvents: "none",
      fontSize: "14px",
      maxWidth: "250px",
      zIndex: 1000
    }}
  >
    {hoveredDescription}
  </div>
) : null}

    </div>
  );
}

export default TableRecent;
