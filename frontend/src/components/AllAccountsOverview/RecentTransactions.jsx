import React from "react";
import TableRecent from "../TableRecent";

function RecentTransactions(prop) {
  return (
    <div className="recentTrans">
      <h1>Recent Transactions</h1>
      <TableRecent id={prop.id} date={prop.date} />
    </div>
  );
}

export default RecentTransactions;
