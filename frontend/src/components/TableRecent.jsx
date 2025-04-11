import React from "react";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

function TableRecent() {
  const [range, setRange] = useState({ from: 0, to: 5, pgNumber: 1 });
  const { from: start, to: end, pgNumber: pgNum } = range;

  const dummyData = [
    {
      number: 1,
      category: "Rent",
      amount: "$1200",
      date: "2025-04-01",
      description: "Monthly apartment rent",
    },
    {
      number: 2,
      category: "Grocery",
      amount: "$150",
      date: "2025-04-02",
      description: "Weekly groceries from Walmart",
    },
    {
      number: 3,
      category: "Dining",
      amount: "$45",
      date: "2025-04-03",
      description: "Dinner at a local restaurant",
    },
    {
      number: 4,
      category: "Transport",
      amount: "$70",
      date: "2025-04-04",
      description: "Gas and bus pass",
    },
    {
      number: 5,
      category: "Internet",
      amount: "$60",
      date: "2025-04-05",
      description: "Monthly internet bill",
    },
    {
      number: 6,
      category: "Gym",
      amount: "$40",
      date: "2025-04-06",
      description: "Fitness center membership",
    },
    {
      number: 7,
      category: "Clothing",
      amount: "$85",
      date: "2025-04-07",
      description: "New hoodie and jeans",
    },
    {
      number: 8,
      category: "Entertainment",
      amount: "$30",
      date: "2025-04-08",
      description: "Movie night and popcorn",
    },
    {
      number: 9,
      category: "Subscription",
      amount: "$25",
      date: "2025-04-09",
      description: "Netflix and Spotify",
    },
    {
      number: 10,
      category: "Utilities",
      amount: "$110",
      date: "2025-04-10",
      description: "Hydro and water bill",
    },
    {
      number: 1,
      category: "Rent",
      amount: "$1200",
      date: "2025-04-01",
      description: "Monthly apartment rent",
    },
    {
      number: 1,
      category: "Rent",
      amount: "$1200",
      date: "2025-04-01",
      description: "Monthly apartment rent",
    },
  ];

  const numOfPgs = Math.ceil(dummyData.length / 5);

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
          {dummyData.slice(range.from, range.to).map((item, index) => (
            <tr key={index}>
              <td>{item.number}</td>
              <td>{item.category}</td>
              <td>{item.amount}</td>
              <td>{item.date}</td>
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
