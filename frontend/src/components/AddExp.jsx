import React, { useEffect,useState } from "react";

import { Link } from "react-router-dom";
import DropDown from "./DropDown";
import CategoryModal from "./CategoryModal";
import useUserStore from './useUserStore'; // using Zustand here - global state access
import useAccountStore from './useAccountsStore';


 

function Expenses(prop) {
  const [category, setCategory] = useState([
  ]);

  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const { cardArr } = useAccountStore();

  useEffect(() => {
    categoryGetter();


if (prop.modifyExpData.transEditRequested === true) { 
  setState({
    name1: prop.modifyExpData.account ,
    name2: prop.modifyExpData.category
  });
  setFee(prop.modifyExpData.amount);
  setDescription(prop.modifyExpData.description);
  setDate(prop.modifyExpData.date);
  setIsIncome(prop.modifyExpData.isIncome);
  setShowDeleteBtn(true);
}





return () =>{
  resetModifyExpData();
};

  }, []);


  const [state, setState] = useState({
    name1: "Select Account",
    name2: "Category",
  });
  const [isIncome, setIsIncome] = useState(false);
  const [date, setDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [fee, setFee] = useState("");
  const [description, setDescription] = useState("");
  const [delConfirm, setDelConfirm] = useState(false);
  const { userID, setUserID } = useUserStore();

function resetModifyExpData() {

  prop.setModifyExpData({
      category: "Category",
      account: "Select Account", 
      date: "",
      isIncome: false,
      description: "",
      amount: "",
      modifiedRow: -1
    })
    setShowDeleteBtn(false);
    // setIsIncome(false);
    // setDate("");
    // setState({ name1: "Select Account",
    //   name2: "Category"});
    //   setFee("");
    //   setDescription("")
  
}

  
  

  function clickedIncome() {
    setIsIncome((prev) => {
      return !prev;
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

  function stateReset() {
    setIsIncome(false);
    setDate("");
    setState({ name1: "Select Account",
      name2: "Category"});
      setFee("");
      setDescription("")
    
  }

 async function categoryGetter(params) {
  const res = await fetch("http://localhost:5001/api/getCategories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: userID}),
  });
  const resultCat = await res.json();
  setCategory(resultCat.map(cat => cat.name));
  console.log(resultCat); 
  // return resultCat;
  }


  async function handleDelete(event) {
    // console.log("was it run?");
    
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      // event.preventDefault();
        const transactionDataToDelete = {
          modifiedRow: prop.modifyExpData.modifiedRow
        };
        // console.log(" Sending userID:", transactionDataToSendBack.account);
  
    const res = await fetch("http://localhost:5001/api/deleteTransaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactionDataToDelete),
    });
    const result = await res.json();
    console.log(result);
    if (res.ok) {
      
      alert("Transaction Deleted!");
    } else {
      alert("Something went wrong.");
    }
  
      stateReset();
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (state.name1 === "Select Account" || !state.name1) {
      alert("Please select an account.");
    } else {
      const transactionDataToSendBack = {
        isIncome,
        account: state.name1.trim(),
        category: state.name2.trim(),
        date,
        fee,
        description,
        userID,
        modifiedRow: prop.modifyExpData.modifiedRow
      };
      // console.log(" Sending userID:", transactionDataToSendBack.account);

  const res = await fetch("http://localhost:5001/api/AddUpdateTransaction", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transactionDataToSendBack),
  });
  const result = await res.json();
  console.log(result);
  if (res.ok) {
    
    alert("Transaction submitted!");
  } else {
    alert("Something went wrong.");
  }


    }

    stateReset();
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
                        items={item.name}
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
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
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
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  placeholder="Description..."
                ></textarea>
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>

          { showDeleteBtn ?  <button className="btn btn-danger mt-2" onClick={() => handleDelete()}>
              Delete
            </button>
            :
            null}
          </div>
        </form>
      )}
    </div>
  );
}

export default Expenses;
