import React from "react";
import { Link } from "react-router-dom";

function Header(prop) {

function logOutHandle(params) {
  prop.setIsAuth(false);
}


  return (
    <div>
      <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap header">
            <nav className="navbar navbar-expand-lg navbar-dark">
              <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                  Dashboard
                </Link>
                <div className="navbar-nav">
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                  <Link to="/about" className="nav-link">
                    Contact
                  </Link>
                </div>
              </div>
            </nav>

            <div className="text-end">
             
                {prop.googleInfo ? <div><h4>Welcome  {prop.googleInfo.fname}!</h4> <button type="button" onClick={logOutHandle} className="btn btn-warning"><Link to="/" className="nav-link">
                LogOut
                </Link>
              </button> </div>: <button type="button" className="btn btn-warning"><Link to="/login" className="nav-link">
                Login
                </Link>
              </button>}
              
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
