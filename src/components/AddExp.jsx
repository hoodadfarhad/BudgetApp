import React, { useState } from "react";
import { cardArr } from "./Cards";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";
import CategoryModal from "./CategoryModal";

function Expenses(prop) {
  const [category, setCategory] = useState([
    "housing",
    "grocery",
    "bills",
    "entertainment",
  ]);

  const [state, setState] = useState({
    name1: "Select Account",
    name2: "Category",
  });
  const [isIncome, setIsIncome] = useState(false);
  const [date, setDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  function clickedIncome() {
    setIsIncome((ghablia) => {
      return !ghablia;
    });
  }

  function selectedDate(date) {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentDay = now.getDate();

    const [year, month, day] = date.split("-");

    if (currentMonth == month) {
      setDate(date);
    } else {
      alert("Be advised that this does not belong to this month");
      setDate(date);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (state.name1 === "Select Account" || !state.name1) {
      alert("Please select an account.");
      return;
    }
  }

  return (
    <div className="addTransaction">
      {showModal ? (
        <CategoryModal
          setShowModal={setShowModal}
          setCategory={setCategory}
          category={category}
        />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="row rowMargin justify-content-around">
              {/* 

toggle-lable stack 

*/}
              <div className="col-md-6 form-check form-switch switchStack">
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckChecked"
                >
                  Income?
                </label>

                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckChecked"
                  checked={isIncome}
                  onChange={clickedIncome}
                />
              </div>

              {/* 

Drop Down for Accounts 

*/}

              <div className="col-md-6 dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {state.name1}
                </button>

                <ul className="dropdown-menu dropdown-menu-dark">
                  {cardArr.map((item, index) => {
                    return (
                      <DropDown
                        items={item.bankName + " " + item.accountName}
                        key={index}
                        setFace={setState}
                        name="name1"
                      />
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="row rowMargin justify-content-around">
              {/* 

Drop Down for categories 

*/}

              <div className="col-md-4 dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {state.name2}
                </button>

                <ul className="dropdown-menu dropdown-menu-dark">
                  {category.map((item, index) => {
                    return (
                      <DropDown
                        items={item}
                        key={index}
                        setFace={setState}
                        name="name2"
                      />
                    );
                  })}
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        setShowModal(true);
                      }}
                    >
                      Customize
                    </a>
                  </li>
                </ul>
              </div>

              {/* 

Fee amount

*/}
              <div className="col-md-4 mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="$Amount"
                  min="0"
                  max="10000"
                  step="0.01"
                  required
                />
              </div>

              {/* 

Calendar

*/}

              <div className="col-md-4">
                <input
                  type="date"
                  name="transactionDate"
                  className="form-control"
                  value={date}
                  onChange={(e) => selectedDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row rowMargin justify-content-around">
              {/* 

Transaction Description

*/}

              <div className="col-md-8 mb-3">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Description..."
                ></textarea>
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Expenses;
