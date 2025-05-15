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
  lname: "",
  email: ""
})

const [showSidebar, setShowSidebar] = useState(true);
const [isSmallScreen, setIsSmallScreen] = useState(false);


// Detect screen size



useEffect(() => {
  async function authChecker() {
    const res = await fetch("http://localhost:5001/auth/infoGetter", {
      credentials: "include",
    });

    const userInfo = await res.json();
    setFetchedGoogleInfo({
      fname: userInfo.firstName,
      lname: userInfo.lastName,
      email: userInfo.email
    }) 


    console.log("Fetched user info at APP for email:", userInfo.email); 




    if (userInfo.userID) {
      const idRes = await fetch("http://localhost:5001/api/setID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ OAuthID: userInfo.userID, fname: userInfo.firstName, lname: userInfo.lastName, email:userInfo.email }), 
      });

      const { appID } = await idRes.json();
      console.log("Returned appID from DB:", appID);

      setUserID(appID); 
    }

    setIsAuthenticated(userInfo.isAuthenticated);
  }

  authChecker();
  const mediaQuery = window.matchMedia("(max-width: 1000px)");

  const handleResize = () => {
    setIsSmallScreen(mediaQuery.matches);
    setShowSidebar(!mediaQuery.matches);

  };

  mediaQuery.addEventListener("change", handleResize);
  handleResize(); // Run on initial load

  return () => mediaQuery.removeEventListener("change", handleResize);
  
}, []);






  return (
    <div className="App">
      <Routes>
      <Route path="/contact" element={<Contact googleInfo={fetchedGoogleInfo} setIsAuth = {setIsAuthenticated} isAuth ={isAuthenticated} showSidebar={showSidebar} setShowSidebar={setShowSidebar} isSmallScreen={isSmallScreen} setIsSmallScreen={setIsSmallScreen}/>} />
        <Route path="/about" element={<About googleInfo={fetchedGoogleInfo} setIsAuth = {setIsAuthenticated} isAuth ={isAuthenticated} showSidebar={showSidebar} setShowSidebar={setShowSidebar} isSmallScreen={isSmallScreen} setIsSmallScreen={setIsSmallScreen}/>} />
        <Route path="/" element={isAuthenticated? <StartingPage googleInfo={fetchedGoogleInfo} setIsAuth = {setIsAuthenticated} isAuth ={isAuthenticated} showSidebar={showSidebar} setShowSidebar={setShowSidebar} isSmallScreen={isSmallScreen} setIsSmallScreen={setIsSmallScreen}  /> : <About googleInfo={fetchedGoogleInfo} setIsAuth = {setIsAuthenticated} isAuth ={isAuthenticated} showSidebar={showSidebar} setShowSidebar={setShowSidebar} isSmallScreen={isSmallScreen} setIsSmallScreen={setIsSmallScreen}/>} />
        <Route path="/login" element={<Login setIsAuth = {setIsAuthenticated} />} />
      </Routes>
    </div>
  );
}
