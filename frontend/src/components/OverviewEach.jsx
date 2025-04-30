import React from "react";
import Cards from "./Cards";


function OverviewEach(prop) {
  return (
    <div>
      <h1>{prop.accNumber}</h1>     //use the Zustand global state cardArr .balance and .id to pull relevant data from db
    </div>
  );
}

export default OverviewEach;
