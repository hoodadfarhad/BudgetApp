import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AddExpenses from "./AddExp";
import Overview from "./AllAccounts";
import NewCardPanel from "./NewCardPanel";
import OverviewEach from "./OverviewEach";

import { Link } from "react-router-dom";

function StartingPage(prop) {
  const [clickedOption, setClickedOption] = useState(0);
  const t = new Date();


  const [date, setDate] = useState({
        month: t.getMonth() + 1,
        year: t.getFullYear()
      })
  const [accNumber, setAccNumber] = useState(null);
  const [modifyExpData,setModifyExpData] = useState({
    category: "TBD",
    account: "TBD",
    date: '2025-01-01',
    isIncome: true,
    description: "TBD",
    amount: 0,
    modifiedRow: -1,
    transEditRequested: false
  })
  const [modifyCardData, setModifyCardData] = useState({

accountName: "",
bankName: "",
balance: "",
    cardEditRequested: false
  })
 



  
  // console.log(prop.googleInfo);
  
  

  function SideBarResult(id) {    // it turned out that in switch case, states cannot be used since they are not constant
    // console.log("Selected ID:", id);
  
    if (id === 0 || id === 1 || id === 3) {
      setClickedOption(id);
    }  else {
      setAccNumber(id);
      setClickedOption(id);
    }
  }


  

  function WhatToRender(op) {
    switch (op) {
      case 0:
        return <Overview setClickedOption={setClickedOption} setModifyExpData={setModifyExpData} date={date} setDate={setDate} />;
        break;

      case 1:
        return <AddExpenses modifyExpData={modifyExpData} setModifyExpData={setModifyExpData} />;
        break;
    
      case 3:
        return <NewCardPanel modifyCardData={modifyCardData} setModifyCardData={setModifyCardData} accNumber={accNumber} />;
        break;

      // card component goes here:
        default:
           {
            // console.log("AccNum by Clicking: " + accNumber);
            
            return <OverviewEach accNumber={accNumber} setModifyExpData={setModifyExpData} setClickedOption={setClickedOption} setModifyCardData={setModifyCardData} showSidebar={prop.showSidebar} isSmallScreen={prop.isSmallScreen} date={date} setDate={setDate}/>;
          }
        
        break;
    }
  }

  
  // useEffect(() => {
  //   console.log(accNumber);
  // }, [accNumber]);

  return (
    <div className="App">
      <Header googleInfo={prop.googleInfo} isAuth={prop.isAuth} setIsAuth={prop.setIsAuth} isSmallScreen={prop.isSmallScreen}/>

      <div className="mainPage">
        <Sidebar optionSelector={SideBarResult} accNumber={accNumber} setAccNumber={setAccNumber} modifyCardData={modifyCardData} setModifyCardData={setModifyCardData} setDate={setDate} showSidebar={prop.showSidebar} setShowSidebar={prop.setShowSidebar} isSmallScreen={prop.isSmallScreen}/>
        {WhatToRender(clickedOption)}
      </div>
    </div>
  );
}

export default StartingPage;
