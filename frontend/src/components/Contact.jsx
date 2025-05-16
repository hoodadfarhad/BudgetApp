import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Contact(prop) {
  console.log("contact: " + prop.isAuth);

  const handleProjectClick = () => {
    alert("Taking you to my GitHub; see you there!");
  };

    const navigate = useNavigate();

    return (
      <div className="position-relative bg-light min-vh-100">
        <Header
          googleInfo={prop.googleInfo}
          isAuth={prop.isAuth}
          setIsAuth={prop.setIsAuth}
          showSidebar={prop.showSidebar}
          setShowSidebar={prop.setShowSidebar}
          isSmallScreen={prop.isSmallScreen}
        />
    
        {/* Floating Menu Button */}
        {!prop.showSidebar && (
          <button
            onClick={() => prop.setShowSidebar(true)}
            className="btn btn-primary shadow"
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
    
        {/* Sidebar for Small Screens */}
        {prop.isSmallScreen && (
  <>
    {prop.showSidebar && (
      <div className="d-flex flex-column flex-shrink-0 p-3 sidebar" style={{ width: "280px" }}>
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

        <span className="fs-4" style={{ color: "white" }}>Menu</span>
        <hr />

        <ul className="nav nav-pills flex-column mb-auto">
          <li className="mb-1">
            <button
                        className="btn btn-outline-light w-100 text-start mb-2"
              onClick={() => {
                prop.setShowSidebar(false);
                navigate("/");
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
                navigate("/about");
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
                navigate("/contact");
              }}
            >
              Contact
            </button>
          </li>
          <hr />
        </ul>
      </div>
    )}
  </>
)}

    
        {/* Contact Form */}
        <div className="container py-5" id="contact">
          <h1 className="mb-3">Contact Us</h1>
          <p className="text-muted mb-4">For any inquiries, please contact me!</p>
          <form action="https://formspree.io/f/meoekdnd" method="POST" className="bg-white shadow rounded p-4">
            <div className="mb-3">
              <input type="email" name="email" className="form-control" placeholder="Your email" required />
            </div>
            <div className="mb-3">
              <textarea name="message" className="form-control" placeholder="Your message" rows="5" required />
            </div>
            <button type="submit" className="btn btn-secondary w-100">Send</button>
          </form>
        </div>
    
        {/* Footer */}
       <Footer/>
      </div>
    );
    
}

export default Contact;
