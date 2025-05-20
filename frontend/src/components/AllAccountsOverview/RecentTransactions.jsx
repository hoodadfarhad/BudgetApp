import React from "react";
import TableRecent from "../TableRecent";

function RecentTransactions(prop) {
  return (
    <div>
    <h2>Recent Transactions</h2>
    <div className="recentTrans">
      
      <TableRecent id={prop.id} date={prop.date} setClickedOption={prop.setClickedOption} setModifyExpData={prop.setModifyExpData} accountID={prop.accountID} />
    </div>
    </div>
  );
}

export default RecentTransactions;
