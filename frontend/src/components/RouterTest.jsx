import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function About(prop) {

 console.log("About: "+prop.isAuth);
 
  return (
    <div>
      <Header googleInfo={prop.googleInfo} isAuth={prop.isAuth} setIsAuth={prop.setIsAuth} />
      <h1>Hello World</h1>
      {prop.isAuth? <h2>Good Job!</h2>:  <h2>This app helps you track your money like a boss — expenses, income, and all that good stuff 💸. Start logging in to start!</h2>
      }
    
    </div>
  );
}

export default About;


