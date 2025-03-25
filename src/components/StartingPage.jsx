import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Expenses from "./AddExp";

import { Link } from "react-router-dom";

function StartingPage(prop) {
  const [clickedOption, setClickedOption] = useState(0);

  function SideBarResult(id) {
    switch (id) {
      case 2:
        setClickedOption(2);
        break;

      default:
        console.log("Wrong Click Handling");
        break;
    }
  }

  return (
    <div className="App">
      <Header />

      <div className="mainPage">
        <Sidebar optionSelector={SideBarResult} />
        {clickedOption === 2 ? <Expenses /> : <Dashboard />}
      </div>
    </div>
  );
}

export default StartingPage;
