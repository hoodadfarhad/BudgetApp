import React from "react";
import TableRecent from "../TableRecent";

function RecentTransactions(prop) {
  return (
    <div className="">
      <h1>Recent Transactions</h1>
      <TableRecent id={prop.id} />
    </div>
  );
}

export default RecentTransactions;
