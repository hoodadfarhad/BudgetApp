import React from "react";
import CurrentMonth from "./AllAccountsOverview/CurrentMonth";
import CompareMonths from "./AllAccountsOverview/CompareMonths";
import RecentTransactions from "./AllAccountsOverview/RecentTransactions";

function AllAccounts(prop) {
  return (
    <div className="allAcc">
      <CurrentMonth />
      <CompareMonths />

      <div className="fullRow">
        <RecentTransactions />
      </div>
    </div>
  );
}

export default AllAccounts;
