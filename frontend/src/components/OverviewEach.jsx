import React, { useEffect, useState } from "react";

import CurrentMonth from "./AllAccountsOverview/CurrentMonth";
import CompareMonths from "./AllAccountsOverview/CompareMonths";
import RecentTransactions from "./AllAccountsOverview/RecentTransactions";
import PieBreakDown from "./AllAccountsOverview/PieBreakDown";
import Cards from "./Cards";
import { Button } from "@mui/material";
import DatePickerFunc from "./DatePicker";
import useUserStore from './useUserStore'; 
import useAccountStore from './useAccountsStore';

function OverviewEach(prop) {

  const { userID } = useUserStore();
  const { cardArr, setCardArr } = useAccountStore();
// console.log(cardArr);

  // const t = new Date();
// const [date, setDate] = useState({
//         month: t.getMonth() + 1,
//         year: t.getFullYear()
//       })
      const [newBalance, setNewBalance] = useState(0)

  function handleModify() {
    prop.setModifyCardData({

      accountName: cardArr.find(item => item.id === prop.accNumber)?.name.split(" ")[1],
      bankName: cardArr.find(item => item.id === prop.accNumber)?.name.split(" ")[0],
      balance: cardArr.find(item => item.id === prop.accNumber)?.balance,
          cardEditRequested: true
        })
    prop.setClickedOption(3);
  }    


useEffect(() => {
  // console.log(history);
  async function balanceCalc() {
    const res = await fetch("http://localhost:5001/api/cardTransactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userID, accountID: prop.accNumber }),
    });
    const finalBalance = await res.json();

    
    setNewBalance(finalBalance.new_balance);
  
  }

  balanceCalc();
}, [userID, prop.accNumber]);



  return (
    <div className="overview">
    <div className="account-header">
  <div className="account-info">
    <h2 className="account-name">{cardArr.find(item => item.id === prop.accNumber)?.name}</h2>
    <p className="account-balance">Balance: ${newBalance}</p>
  </div>
  <Button variant="contained" color="primary" onClick={handleModify}>
    ✏️ Modify
  </Button>
</div>
    { !prop.isSmallScreen? null:
<div className="firstRow">
      <h1 >In the month of <DatePickerFunc dateAtAllAcc={prop.setDate}/>
:  </h1>

      </div>
}
    <div className="allAcc">
      
      
      <CurrentMonth id={userID} date={prop.date} accountID={prop.accNumber}/>  
      {/* {console.log("hey")  } */}
      <CompareMonths id={userID} date={prop.date} accountID={prop.accNumber}/>    
        <RecentTransactions id={userID} date={prop.date} setClickedOption={prop.setClickedOption} setModifyExpData={prop.setModifyExpData} accountID={prop.accNumber}/>
        <PieBreakDown id={userID} date={prop.date} accountID={prop.accNumber}/>
      
    </div>
    
    </div>
  );
}

export default OverviewEach;
