import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import { Link } from "react-router-dom";

function Sidebar(prop) {



  const [showSidebar, setShowSidebar] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);


  // Detect screen size

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1000px)");

    const handleResize = () => {
      setIsSmallScreen(mediaQuery.matches);
      setShowSidebar(!mediaQuery.matches); // // if it matched, then switch the state to false to hide the side bar
    };

    mediaQuery.addEventListener("change", handleResize);
    handleResize(); // run once on load

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);



  
  
  return (

<>
{!showSidebar && (
        <button
          onClick={() => setShowSidebar(true)}
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

{showSidebar && (<div
      className="d-flex flex-column flex-shrink-0  p-3 text-bg-dark sidebar"
      style={{ width: "280px"}}
    >
       {isSmallScreen && (
            <button
              onClick={() => setShowSidebar(false)}
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

      <Link
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">MENU</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="mb-1">
          <button
            class="nav-link text-white btn-toggle rounded border-0 collapsed"
            onClick={() => {
              prop.optionSelector(0);
            }}
          >
            Overview
          </button>
        </li>

        <li>
          <button
            className="nav-link text-white"
            onClick={() => {
              prop.optionSelector(1);
            }}
          >
            Add Expenses
          </button>
        </li>

        <li class="mb-1">
          <button
            class="nav-link text-white btn-toggle rounded border-0 collapsed"
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
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <Cards cardSelector={prop.optionSelector} accNumber={prop.accNumber} setAccNumber={prop.setAccNumber} modifyCardData={prop.modifyCardData} setModifyCardData={prop.setModifyCardData} />
            </ul>
          </div>
        </li>
      </ul>
      <hr />
    </div>)}



    
    </>
  );
}

export default Sidebar;
