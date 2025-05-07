import "./styles.css";
import React, { useState, useEffect } from "react";
import About from "./components/RouterTest";
import Contact from "./components/Contact";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import useUserStore from "./components/useUserStore";

import StartingPage from "./components/StartingPage";

export default function App() {

const [isAuthenticated, setIsAuthenticated] = useState(false);
const {userID, setUserID } = useUserStore();
const [fetchedGoogleInfo, setFetchedGoogleInfo] = useState({
  fname: "",
  email: ""
})

useEffect(() => {
  async function authChecker() {
    const res = await fetch("http://localhost:5001/auth/infoGetter", {
      credentials: "include",
    });

    const userInfo = await res.json();
    setFetchedGoogleInfo({
      fname: userInfo.firstName,
      email: userInfo.email
    })


    console.log("Fetched user info:", userInfo); 




    if (userInfo.userID) {
      const idRes = await fetch("http://localhost:5001/api/setID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ OAuthID: userInfo.userID }), 
      });

      const { appID } = await idRes.json();
      console.log("Returned appID from DB:", appID);

      setUserID(appID); 
    }

    setIsAuthenticated(userInfo.isAuthenticated);
  }

  authChecker();
}, []);


  return (
    <div>
      <Routes>
      <Route path="/contact" element={<Contact googleInfo={fetchedGoogleInfo} setIsAuth = {setIsAuthenticated} isAuth ={isAuthenticated}/>} />
        <Route path="/about" element={<About googleInfo={fetchedGoogleInfo} setIsAuth = {setIsAuthenticated} isAuth ={isAuthenticated}/>} />
        <Route path="/" element={isAuthenticated? <StartingPage googleInfo={fetchedGoogleInfo} setIsAuth = {setIsAuthenticated} isAuth ={isAuthenticated} /> : <About/>} />
        <Route path="/login" element={<Login setIsAuth = {setIsAuthenticated} />} />
      </Routes>
    </div>
  );
}
