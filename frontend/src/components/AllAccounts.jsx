import React, { useEffect, useState } from "react";
import CurrentMonth from "./AllAccountsOverview/CurrentMonth";
import CompareMonths from "./AllAccountsOverview/CompareMonths";
import RecentTransactions from "./AllAccountsOverview/RecentTransactions";
import PieBreakDown from "./AllAccountsOverview/PieBreakDown";
import DatePickerFunc from "./DatePicker";
import useUserStore from './useUserStore'; 

function AllAccounts(prop) {
  const { userID } = useUserStore();


  const t = new Date();

  const [date, setDate] = useState({
        month: t.getMonth() + 1,
        year: t.getFullYear()
      })
    
// useEffect(()=>{
//   console.log(date);
  
// },[date] )
   

  return (
<div className="overview">
    <div className="firstRow">
      <h1 >In the month of <DatePickerFunc dateAtAllAcc={setDate}/>
:  </h1>

      </div>
    <div className="allAcc">
      
      
      <CurrentMonth id={userID} date={date}/>
      <CompareMonths id={userID} date={date}/>    
        <RecentTransactions id={userID} date={date} setClickedOption={prop.setClickedOption} setModifyExpData={prop.setModifyExpData}/>
        <PieBreakDown id={userID} date={date}/>
      
    </div>
    </div>
  );


}

export default AllAccounts;
