import React, { useEffect } from "react";
import CurrentMonth from "./AllAccountsOverview/CurrentMonth";
import CompareMonths from "./AllAccountsOverview/CompareMonths";
import RecentTransactions from "./AllAccountsOverview/RecentTransactions";
import PieBreakDown from "./AllAccountsOverview/PieBreakDown";
import useUserStore from './useUserStore'; 

function AllAccounts(prop) {
  const { userID } = useUserStore();

  return (
    <div className="allAcc">
      <CurrentMonth id={userID} />
      <CompareMonths id={userID}/>
  
      
        <RecentTransactions id={userID}/>
        <PieBreakDown id={userID}/>
      
    </div>
  );


}

export default AllAccounts;
