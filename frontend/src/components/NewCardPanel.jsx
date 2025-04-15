import React, { useState } from "react";
import useUserStore from './useUserStore'; // using Zustand here - global state access




function NewCardPanel(prop) {
  const [accountInfo, setAccountInfo] = useState({
    name: "",
    bank: "",
    balance:""
  })

  const { userID, setUserID } = useUserStore();

  function eventHandler(e) {
    
    setAccountInfo( (prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    })  )

  }

 async function newAccount(event) {


  
  event.preventDefault(); // prevent form from refreshing the page

  console.log("New account from front:", accountInfo);

  const res = await fetch ('http://localhost:5001/api/newAccountInfo', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ info: accountInfo, owner_id: userID })
  })

  const data = await res.json();
  console.log(data);
  

  }





  return (
    <div className="newCardInput">
      <form className="form-width" onSubmit={newAccount}>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Account Name:
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
            Bank Name:
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
            Balance:
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
            Add Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewCardPanel;
