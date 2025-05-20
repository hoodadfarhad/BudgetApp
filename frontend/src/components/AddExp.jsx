import React, { useEffect,useState } from "react";

import { Link } from "react-router-dom";
import DropDown from "./DropDown";
import CategoryModal from "./CategoryModal";
import useUserStore from './useUserStore'; // using Zustand here - global state access
import useAccountStore from './useAccountsStore';
import useCardEditStore from "./useCardEditStore";
import useReqFromAddEXP from "./useReqFromAddEXP";






 

function Expenses(prop) {
  const [category, setCategory] = useState([
  ]);
  const { setController } = useCardEditStore();
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const { cardArr, setCardArr } = useAccountStore();
  const { setReqFromAddEXP } = useReqFromAddEXP();
  const { fetchAccounts } = useAccountStore();
  const API_BASE = process.env.REACT_APP_API_BASE;

let today = "";

  useEffect(() => {
    categoryGetter();

    
    if (prop.isSmallScreen) {
       today = new Date().toLocaleDateString('en-CA');
    }


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
  const [date, setDate] = useState(today);
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
  const res = await fetch(`${API_BASE}/api/getCategories`, {
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
  
    const res = await fetch(`${API_BASE}/api/deleteTransaction`, {
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
    prop.optionSelector(0);
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

  const res = await fetch(`${API_BASE}/api/AddUpdateTransaction`, {
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
    <div className="form-wrapper">
    <div className="addTransaction">
      {showModal ? (
        <CategoryModal
          setShowModal={setShowModal}
          setCategory={setCategory}
          category={category}
        />
      ) : (
        <form onSubmit={handleSubmit}>
     <div className="container-fluid">
            <div className="row rowMargin justify-content-around">

                            {/* 

Drop Down for categories 

*/}

<div className="col-md-4 col-12 mb-3 dropdown d-flex justify-content-center" >
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

Drop Down for Accounts 

*/}

<div className="col-12 col-md-6 mt-3 mt-md-0  ">
  <div className="dropdown w-100 d-flex justify-content-center">

                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => fetchAccounts(userID)}
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

<li>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        setController(true);
                        setReqFromAddEXP(true);
                        prop.optionSelector(3);
                      }}
                    >
                      Add New Account
                    </a>
                  </li>
                </ul>
                </div>
              </div>
            </div>









            <div className="row rowMargin justify-content-around">

{/* 

toggle-lable stack 

*/}
              <div className="col-12 col-md-3 d-flex align-items-center justify-content-center gap-3 incomeTrans" >
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
                
autoComplete="off"
                  id="flexSwitchCheckChecked"
                  checked={isIncome}
                  onChange={clickedIncome}
                />
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
               
autoComplete="off"
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

<div className="col-12 mb-3">
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

            <div className="row justify-content-center gap-3">
            <div className="col-auto">
            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
</div>
          { showDeleteBtn ? 
          <div className="col-auto">
          <button className="btn btn-danger mt-2" onClick={() => handleDelete()}>
              Delete
            </button>
            </div>
            :
            null}
            </div>
          </div>
        </form>
      )}
    </div>
    </div>
  );
}

export default Expenses;
