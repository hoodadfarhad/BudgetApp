import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import AddExpenses from "./AddExp";
import Overview from "./AllAccounts";
import NewCardPanel from "./NewCardPanel";

import { Link } from "react-router-dom";

function StartingPage(prop) {
  const [clickedOption, setClickedOption] = useState(0);

  function SideBarResult(id) {
    switch (id) {
      case 0:
        setClickedOption(0);
        break;

      case 1:
        setClickedOption(1);
        break;

      case 2:
        setClickedOption(2);
        break;

      case 3:
        setClickedOption(3);
        break;

      case 4:
        setClickedOption(4);
        break;

      default:
        console.log("Wrong Click Handling");
        break;
    }
  }

  function WhatToRender(op) {
    switch (op) {
      case 0:
        return <Overview />;
        break;

      case 1:
        return <AddExpenses />;
        break;
      case 2:
        return <Dashboard />;
        // return <Dashboard />; modify/add accounts
        break;

      // add-new component goes here:
      case 3:
        return <NewCardPanel />;
        break;

      // card component goes here:
      case 4:
        return <Overview />;
        break;

      default:
        return <Overview />;
        break;
    }
  }

  return (
    <div className="App">
      <Header />

      <div className="mainPage">
        <Sidebar optionSelector={SideBarResult} />
        {WhatToRender(clickedOption)}
      </div>
    </div>
  );
}

export default StartingPage;
