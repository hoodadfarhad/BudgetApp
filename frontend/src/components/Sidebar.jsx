import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import DatePickerFunc from "./DatePicker";
import { useNavigate } from "react-router-dom";


function Sidebar(prop) {



  const navigate = useNavigate();



  
  
  return (

<>
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

{prop.showSidebar && (<div
      className="d-flex flex-column flex-shrink-0  p-3 sidebar"
      style={{ width: "280px"}}
    >
       {prop.isSmallScreen && (
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
            
          )}
          


          <span className="fs-4" style={{color:"white"}}>Menu</span>
          <hr/>

          {!prop.isSmallScreen && (
            <div className="firstRow">
                 
            <h3 className="fs-4 mb-2" >In the month of: </h3>
            <DatePickerFunc  dateAtAllAcc={prop.setDate} />
        
      
            </div>
          )}

 
      <ul className="nav nav-pills flex-column mb-auto">


        <li className="mb-1 mt-3">
          
          <button
            className="btn btn-outline-light w-100 text-start mb-2"
            onClick={() => {
              {prop.isSmallScreen? prop.setShowSidebar(false) : null}
             prop.optionSelector(0) 
            }}
          >
            Overview
          </button>

        </li>

        <li>
          <button
            className="btn btn-outline-light w-100 text-start mb-2"
            onClick={() => {
              {prop.isSmallScreen? prop.setShowSidebar(false) : null}
              prop.optionSelector(1);
            }}
          >
            Add Expenses
          </button>
        </li>

        <li class="mb-1">
          <button
            className="btn btn-outline-light w-100 text-start mb-2"
            data-bs-toggle="collapse"
            data-bs-target="#home-collapse"
            aria-expanded="false"
            // onClick={() => {
            //   prop.optionSelector(2);
            // }}
          >
            Accounts
          </button>
          <div class="collapse" id="home-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 ps-3 small">
              <Cards cardSelector={prop.optionSelector} accNumber={prop.accNumber} setAccNumber={prop.setAccNumber} isSmallScreen={prop.isSmallScreen} modifyCardData={prop.modifyCardData} setModifyCardData={prop.setModifyCardData} setShowSidebar={prop.setShowSidebar} />
            </ul>
          </div>
        </li>

        {prop.isSmallScreen && (
        <>
            <li className="mb-1">
            <button
            className="btn btn-outline-light w-100 text-start mb-2"
            onClick={() => {
                // console.log(prop.showSidebar);
                prop.setShowSidebar(false);
               navigate("/")
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

          
          </>
          )}


      </ul>
      <hr />
    </div>)}



    
    </>
  );
}

export default Sidebar;
