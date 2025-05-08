import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Contact(prop) {
  console.log("contact: " + prop.isAuth);

  const handleProjectClick = () => {
    alert("Taking you to my GitHub; see you there!");
  };

    const navigate = useNavigate();

  return (
    <div>
      <Header
        googleInfo={prop.googleInfo}
        isAuth={prop.isAuth}
        setIsAuth={prop.setIsAuth}
        showSidebar={prop.showSidebar} 
        setShowSidebar={prop.setShowSidebar} 
        isSmallScreen={prop.isSmallScreen}
      /> 
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

      <div className="secondary container" id="contact">
        <h1>Contact us</h1>
        <p id="contactP">For any inquiries, please contact me!</p>

        <form
          action="https://formspree.io/f/meoekdnd"
          method="POST"
        >
          <div id="form">
            <input type="email" name="email" placeholder="Your email" />
            <textarea name="message" placeholder="Your message" cols="40" rows="5" />
            <button type="submit" className="btn btn-secondary">Send</button>
          </div>
        </form>
      </div>

    
      <div className="container-xl py-2 border-top atkinson-hyperlegible-regular">
        <div className="box-footer">
          <p>© 2025 All rights reserved.</p>
          <ul className="list-unstyled d-flex">
            <li className="ms-0" id="target">
              <a className="link-dark" href="https://github.com/hoodadfarhad">
                <i className="fa fa-github" style={{ fontSize: "58px" }}></i>
              </a>
            </li>
            <li className="ms-0">
              <a className="link-dark" href="https://www.linkedin.com/in/hoodad-farhad/">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64px" height="64px">
                  <path d="M48,8H16c-4.418,0-8,3.582-8,8v32c0,4.418,3.582,8,8,8h32c4.418,0,8-3.582,8-8V16C56,11.582,52.418,8,48,8z M24,47h-5V27h5V47z M24.029,23.009C23.382,23.669,22.538,24,21.5,24c-1.026,0-1.865-0.341-2.519-1.023S18,21.458,18,20.468c0-1.02,0.327-1.852,0.981-2.498C19.635,17.323,20.474,17,21.5,17c1.038,0,1.882,0.323,2.529,0.969C24.676,18.615,25,19.448,25,20.468C25,21.502,24.676,22.349,24.029,23.009z M47,47h-5V35.887C42,32.788,40.214,31,38,31c-1.067,0-2.274,0.648-2.965,1.469S34,34.331,34,35.594V47h-5V27h5v3.164h0.078c1.472-2.435,3.613-3.644,6.426-3.652C44.5,26.5,47,29.5,47,34.754V47z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      
    </div>
  );
}

export default Contact;
