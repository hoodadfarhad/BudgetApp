import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";

import { Link } from "react-router-dom";

function StartingPage(prop) {
  return (
    <div className="App">
      <Header />

      <div className="mainPage">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  );
}

export default StartingPage;
