import "./styles.css";
import React, { useState, useEffect } from "react";
import Route2 from "./components/RouterTest";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import useUserStore from "./components/useUserStore";

import StartingPage from "./components/StartingPage";

export default function App() {

const [isAuthenticated, setIsAuthenticated] = useState(false);
const {userID, setUserID } = useUserStore();

useEffect(() => {
  async function authChecker() {
    const res = await fetch("http://localhost:5001/auth/infoGetter", {
      credentials: "include",
    });

    const userInfo = await res.json();
    console.log("Fetched user info:", userInfo); // Debug

    if (userInfo.userID) {
      const idRes = await fetch("http://localhost:5001/api/setID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ OAuthID: userInfo.userID }), // ✅ match backend
      });

      const { appID } = await idRes.json();
      console.log("Returned appID from DB:", appID);

      setUserID(appID); // ✅ set the actual number
    }

    setIsAuthenticated(userInfo.isAuthenticated);
  }

  authChecker();
}, []);


  return (
    <div>
      <Routes>
        <Route path="/about" element={<Route2 />} />
        <Route path="/" element={isAuthenticated? <StartingPage /> : <Route2/>} />
        <Route path="/login" element={<Login setIsAuth = {setIsAuthenticated} />} />
      </Routes>
    </div>
  );
}
