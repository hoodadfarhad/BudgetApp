import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Expenses from "./AddExp";

import { Link } from "react-router-dom";

function StartingPage(prop) {
  const [clickedOption, setClickedOption] = useState(1);

  function SideBarResult(id) {
    switch (id) {
      case 1:
        setClickedOption(1);
        break;

      case 2:
        setClickedOption(2);
        break;

      default:
        console.log("Wrong Click Handling");
        break;
    }
  }

  function WhatToRender(op) {
    switch (op) {
      case 1:
        return <Dashboard />;
        break;
      case 2:
        return <Expenses />;
        break;

      default:
        return <Dashboard />;
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
