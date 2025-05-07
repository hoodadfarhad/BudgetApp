import React, { useEffect, useState } from "react";
import useUserStore from './useUserStore'; // using Zustand here - global state access
import useCardEditStore from "./useCardEditStore";





function NewCardPanel(prop) {
  const [accountInfo, setAccountInfo] = useState({
    name: "",
    bank: "",
    balance:""
  })
  const { controller, setController } = useCardEditStore();

  const { userID, setUserID } = useUserStore();


  function eventHandler(e) {
    
    setAccountInfo( (prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    })  )

  }

 async function deleteAccount() {
    
  const confirmed = window.confirm("Are you sure you want to delete this account? Your existing data will remain, but you’ll no longer have access to this account.");
  if (confirmed) {


    const res = await fetch ('http://localhost:5001/api/deleteAccountInfo', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ owner_id: userID, accountID: prop.accNumber })
    })
    const data = await res.json();
    console.log(data);

  }
    
  }


useEffect(() => {

  if (prop.modifyCardData.cardEditRequested === true) {
    setAccountInfo({
      name: prop.modifyCardData.accountName,
      bank: prop.modifyCardData.bankName,
      balance: prop.modifyCardData.balance
  })
  }

console.log("controller:" + controller);
console.log("modifyReq:" + prop.modifyCardData.cardEditRequested);
console.log("acc ID:" + prop.accNumber);


  return () =>{
    setAccountInfo({
      name: "",
      bank: "",
      balance: ""
  })
    prop.setModifyCardData((prev)=>({
      ...prev,
      cardEditRequested: false
    }))
    setController(false);
  };


}, [controller]); // we are constantly on NewCardPanel component when we are modifying a card, or hit on Add new in the side bar. controller will now give the system a clue that the purpose has changed on the still same component, and the return parts getsw run, which makes the text in each input box go away

 async function newAccount(event) {


  
  event.preventDefault(); // prevent form from refreshing the page


  if (prop.modifyCardData.cardEditRequested === false && controller ===true) {   // this is a new account then

  console.log("New account from front:", accountInfo);

  const res = await fetch ('http://localhost:5001/api/newAccountInfo', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ info: accountInfo, owner_id: userID })
  })
  const data = await res.json();
  console.log(data);
 }
 else{
  // onSubmit tu halate edit update kon. jayi ke modifyCard tu db hast ro ba accountInfo update kon
  // cardArr.find(item => item.id === prop.accNumber)?.name
  const res = await fetch ('http://localhost:5001/api/updateAccountInfo', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ info: accountInfo, owner_id: userID, accountID: prop.accNumber })
  })
  const data = await res.json();
  console.log(data);
 }


  

  

  }





  return (
    <div className="newCardInput">
      <form className="form-width" onSubmit={newAccount}>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label" >
         { prop.modifyCardData.cardEditRequested  ? "Edit Account Name" : "Account Name"}
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Example: Saving"
            name="name"
            value={accountInfo.name}
            onChange={eventHandler}
            required
          />

          <label for="exampleFormControlInput1" className="form-label">
          { prop.modifyCardData.cardEditRequested  ? "Edit Bank Name" : "Bank Name"}
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Example: TD"
            name="bank"
            value={accountInfo.bank}
            onChange={eventHandler}
          />

          <label for="exampleFormControlInput1" className="form-label">
          { prop.modifyCardData.cardEditRequested  ? "New Account Balance" : "Balance"}
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Example: 1000.00"
            name="balance"
            value={accountInfo.balance}
            onChange={eventHandler}
            required
          />
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary mb-3">
          { prop.modifyCardData.cardEditRequested  ? "Edit Account" : "Add Account"}
          </button>

          { prop.modifyCardData.cardEditRequested  ? <button onClick={deleteAccount} className="btn btn-danger mb-3">
            Delete Account
          </button> : null}
          
        </div>
      </form>
    </div>
  );
}

export default NewCardPanel;
