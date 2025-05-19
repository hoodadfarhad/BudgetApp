import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Header(prop) {

  const navigate = useNavigate();

   function logOutHandle() {
  
    prop.setIsAuth(false);   // proper session killing in next few updates hopefully )
  }
  
  




  return (
    <div>
      <header className="p-3">
  <div className="header d-flex justify-content-between align-items-center px-3">

    {prop.isSmallScreen ? (

      <div className="d-flex justify-content-between align-items-center w-100">
        {prop.isAuth ? (
          <>
            <h4 className="welcome m-0">Welcome {prop.googleInfo.fname}!</h4>
            <button type="button" onClick={logOutHandle} className="btn btn-warning">
              <Link to="/" className="nav-link p-0 m-0">LogOut</Link>
            </button>
          </>
        ) : (
          <button type="button" className="btn btn-warning ms-auto">
            <Link to="/login" className="nav-link p-0 m-0">Login</Link>
          </button>
        )}
      </div>
    ) : (

      <div className="d-flex justify-content-between align-items-center w-100">


<nav className="navbar navbar-expand-lg">
          <div className="navbar-nav d-flex flex-row gap-4">
            <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
            <Link to="/" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>
        </nav>

        <div className="d-flex align-items-center gap-3">
          {prop.isAuth ? (
            <>
              <h4 className="welcome m-0">Welcome {prop.googleInfo.fname}!</h4>
              <button type="button" onClick={logOutHandle} className="btn btn-warning">
                <Link to="/" className="nav-link p-0 m-0">LogOut</Link>
              </button>
            </>
          ) : (
            <button type="button" className="btn btn-warning">
              <Link to="/login" className="nav-link p-0 m-0">Login</Link>
            </button>
          )}
        </div>

        
      </div>
    )}
  </div>
  <hr/>
</header>


    </div>
  );
}

export default Header;
