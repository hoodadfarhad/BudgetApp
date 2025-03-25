import React from "react";
import { Link } from "react-router-dom";

function Header(prop) {
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
                  <Link to="/" className="nav-link">
                    About
                  </Link>
                  <Link to="/about" className="nav-link">
                    Contact
                  </Link>
                </div>
              </div>
            </nav>

            <div className="text-end">
              <button type="button" className="btn btn-outline-light me-2">
                Login
              </button>
              <button type="button" className="btn btn-warning">
                Sign-up
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
