import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function About(prop) {

 console.log("About: "+prop.isAuth);
   const navigate = useNavigate();
 
  return (
    <div>
      <Header googleInfo={prop.googleInfo} isAuth={prop.isAuth} setIsAuth={prop.setIsAuth}  showSidebar={prop.showSidebar} 
        setShowSidebar={prop.setShowSidebar} 
        isSmallScreen={prop.isSmallScreen} />
      <h1>Hello World</h1>
      {prop.isAuth? <h2>Good Job!</h2>:  <h2>This app helps you track your money like a boss — expenses, income, and all that good stuff 💸. Start logging in to start!</h2>
      }
{!prop.showSidebar && (
        <button
          onClick={() => prop.setShowSidebar(true)}
          className="btn btn-primary"
          style={{
            position: "fixed",
            bottom: "40px",
            left: "40px",
            zIndex: 10,
          }}
        >
          ☰ Menu
        </button>
      )}

{prop.isSmallScreen && (
     <> 
    {prop.showSidebar &&  (<div
      className="d-flex flex-column flex-shrink-0  p-3 sidebar"
      style={{ width: "280px"}}
    >
      
        
            <button
              onClick={() => prop.setShowSidebar(false)}
              className="btn btn-sm btn-light"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 25,
              }}
            >
              ✕
            </button>
              <span className="fs-4" style={{color:"white"}}>Menu</span>
              <hr/>



              <ul className="nav nav-pills flex-column mb-auto">


        

<li className="mb-1">
            <button
              class="nav-link text-white btn-toggle rounded border-0 collapsed"
              onClick={() => {
                prop.setShowSidebar(false);
                navigate("/")
              }}
            >
              Dashboard
            </button>
  
          </li>




            <li className="mb-1">
            <button
              class="nav-link text-white btn-toggle rounded border-0 collapsed"
              onClick={() => {
                console.log(prop.showSidebar);
                prop.setShowSidebar(false);
               navigate("/about")
              }}
            >
              About
            </button>
  
          </li>

          <li className="mb-1">
            <button
              class="nav-link text-white btn-toggle rounded border-0 collapsed"
              onClick={() => {
                prop.setShowSidebar(false);
                navigate("/contact")
              }}
            >
              Contact
            </button>
  
          </li>
          <hr />
    
      </ul>





             

        
          


        


     



    </div>)}
    </>
      )}
    </div>
  );
}

export default About;


