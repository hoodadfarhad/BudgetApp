import React, { useEffect } from "react";
import CurrentMonth from "./AllAccountsOverview/CurrentMonth";
import CompareMonths from "./AllAccountsOverview/CompareMonths";
import RecentTransactions from "./AllAccountsOverview/RecentTransactions";
import useUserStore from './useUserStore'; 

function AllAccounts(prop) {
  const { userID } = useUserStore();

  return (
    <div className="allAcc">
      <CurrentMonth id={userID} />
      <CompareMonths id={userID}/>
  
      <div className="fullRow">
        <RecentTransactions id={userID}/>
      </div>
    </div>
  );


}

export default AllAccounts;
