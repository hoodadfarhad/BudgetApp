import React from "react";
import { Link } from "react-router-dom";

function Sidebar(prop) {
  return (
    <div
      className="d-flex flex-column flex-shrink-0  p-3 text-bg-dark sidebar"
      style={{ width: "280px" }}
    >
      <Link
        to="/hey"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">Sidebar</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/hey" className="nav-link active" aria-current="page">
            Home
          </Link>
        </li>

        <li>
          <Link to="/" className="nav-link text-white">
            Dashboard
          </Link>
        </li>

        <li>
          <button
            name="AddBtn"
            className="nav-link text-white"
            onClick={() => {
              prop.optionSelector(2);
            }}
          >
            Add Expenses
          </button>
        </li>

        <li>
          <Link to="/" className="nav-link text-white">
            Products
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link text-white">
            Customers
          </Link>
        </li>
      </ul>
      <hr />
    </div>
  );
}

export default Sidebar;
