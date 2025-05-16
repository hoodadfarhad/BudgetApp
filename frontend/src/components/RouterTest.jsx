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
  <div style={{ fontSize: "4rem" }}>💼</div> {/* Emoji logo */}
      <h1>Track it. Stack it.</h1>
      {prop.isAuth ? (
         <>
         <h2 className="text-success">You're logged in 🎉</h2>
         <p className="lead mt-3">
           Ready to take control of your finances? Here's what you can do:
         </p>
         <div className="row justify-content-center mt-4 text-start">
           <div className="col-md-8">
             <ul className="list-group list-group-flush">
               <li className="list-group-item">➕ Add and edit your <strong>expenses</strong> and <strong>income</strong></li>
               <li className="list-group-item">📊 View your financial data in <strong>interactive charts</strong></li>
               <li className="list-group-item">🏦 Track spending and income per <strong>bank account</strong></li>
               <li className="list-group-item">📅 Compare <strong>monthly trends</strong> to improve budgeting</li>
               <li className="list-group-item">🧾 Get a clear summary of <strong>recent transactions</strong></li>
             </ul>
             <div className="text-center mb-3">
             <button className="btn btn-outline-success mt-4 " onClick={() => navigate("/")}>
               Go to Dashboard
             </button>
             </div>
           </div>
         </div>
       </>
      ) : (
        <>
        <p className="lead text-muted px-3">
          This app helps you track your money like a boss — expenses, income, and all that good stuff 
        </p>
        <div className="row justify-content-center mt-4 text-start text-muted">
          <div className="col-md-8">
            <h4 className="fw-semibold mb-3">What you can do:</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">➕ Add your income and spending, and watch the numbers work for you</li>
              <li className="list-group-item">📊 Visualize your data through simple, powerful charts</li>
              <li className="list-group-item">🏦 Keep tabs on each <strong>bank account</strong> separately</li>
              <li className="list-group-item">📅 Track your progress over time and compare months</li>
              <li className="list-group-item">💼 Always know where your money goes</li>
            </ul>
            <p className="fw-semibold mt-4 text-center">Start logging in to start!</p>
          
          </div>
        </div>
      </>
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


