import React from "react";
import { useState, useEffect } from "react";
 
import "bootstrap-icons/font/bootstrap-icons.css";

function TableRecent(prop) {
  const [range, setRange] = useState({ from: 0, to: 5, pgNumber: 1 });
  const [history, setHistory] = useState([]);
 




useEffect(() => {
  console.log(history);
  async function transactionHistoryGetter() {
    const res = await fetch("http://localhost:5001/api/getAllTransactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: prop.id }),
    });
    const transactionHistory = await res.json();
    setHistory(transactionHistory);

    if (res.ok) {
      console.log("Transactions pulled!");
    } else {
      console.log("Something went wrong with pulling transactions.");
    }
  }

  transactionHistoryGetter();
}, [prop.id]);

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

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Number</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          {history.slice(range.from, range.to).map((item, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{item.category_name}</td>
              <td>{item.amount}</td>
              <td>{item.date.slice(0,10)}</td>
              <td>{item.description}</td>
              <td>
                <button>
                  <i className="bi bi-pencil-square"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-center align-items-center gap-3">
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
      </div>
    </div>
  );
}

export default TableRecent;
