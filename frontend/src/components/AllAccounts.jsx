import React, { useEffect, useState } from "react";
import CurrentMonth from "./AllAccountsOverview/CurrentMonth";
import CompareMonths from "./AllAccountsOverview/CompareMonths";
import RecentTransactions from "./AllAccountsOverview/RecentTransactions";
import PieBreakDown from "./AllAccountsOverview/PieBreakDown";
import DatePickerFunc from "./DatePicker";
import useUserStore from './useUserStore'; 

function AllAccounts(prop) {
  const { userID } = useUserStore();



    
  
  const [isBigScreen, setIsBigScreen] = useState(false);


  // Detect screen size

  useEffect(() => {
    const mediaQueryForAll = window.matchMedia("(max-width: 1000px)");

    const handleResizeForBig = () => {
      setIsBigScreen(!mediaQueryForAll.matches); // // if it matched, then switch the state to false to hide the side bar
    };

    mediaQueryForAll.addEventListener("change", handleResizeForBig);
    handleResizeForBig(); // run once on load

    return () => mediaQueryForAll.removeEventListener("change", handleResizeForBig);
  }, []);
   

  return (
<div className="overview">
    

    { isBigScreen? null:
<div className="firstRow">
      <h1 className="mb-5">In the month of <DatePickerFunc dateAtAllAcc={prop.setDate}/>
:  </h1>

      </div>
}
    <div className="allAcc">
      
   

      <CurrentMonth id={userID} date={prop.date} />
      <CompareMonths id={userID} date={prop.date} />   
      <PieBreakDown id={userID} date={prop.date} /> 

        <RecentTransactions id={userID} date={prop.date} setClickedOption={prop.setClickedOption} setModifyExpData={prop.setModifyExpData} />
       
      
    </div>
    </div>
  );


}

export default AllAccounts;
