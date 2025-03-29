import "./styles.css";
import React from "react";
import Route2 from "./components/RouterTest";
import { Routes, Route } from "react-router-dom";

import StartingPage from "./components/StartingPage";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/about" element={<Route2 />} />
        <Route path="/" element={<StartingPage />} />
      </Routes>
    </div>
  );
}
