import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function About(prop) {

 console.log("About: "+prop.isAuth);
   const navigate = useNavigate();
 
  return (
    <div className="position-relative">
      <Header googleInfo={prop.googleInfo} isAuth={prop.isAuth} setIsAuth={prop.setIsAuth}  showSidebar={prop.showSidebar} 
        setShowSidebar={prop.setShowSidebar} 
        isSmallScreen={prop.isSmallScreen} />
  <div className="text-center mt-5">
      <h1>Hello World</h1>
      {prop.isAuth ? (
        <h2 className="text-success">Good Job!</h2>
      ) : (
        <h2 className="text-muted px-3">
          This app helps you track your money like a boss — expenses, income, and all that good stuff 💸. <br />
          <span className="fw-semibold">Start logging in to start!</span>
        </h2>
      )}
    </div>
      
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
            className="btn btn-outline-light w-100 text-start mb-2"
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
                         className="btn btn-outline-light w-100 text-start mb-2"

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
            className="btn btn-outline-light w-100 text-start mb-2"
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

      <Footer/>
    </div>
  );
}

export default About;


