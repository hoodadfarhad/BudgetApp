import React from "react";
import Header from "./Header";

function Login(prop) {

  const API_BASE = process.env.REACT_APP_API_BASE;

  const handleLogin = () => {
  
    window.location.href = `${API_BASE}/auth/google`;
  };

  return (
    <>

    {!prop.isSmallScreen? <div style={{ background: "#f5f7fa" }}>
        <Header />
      </div> : null }
     
      
    <div className="d-flex justify-content-center"
        style={{
          height: "100vh",
          background: "#f5f7fa",
          paddingTop: "25vh",
        }}>
      <div className="p-5 shadow-lg rounded-4 bg-white text-center" style={{ maxWidth: "400px", width: "100%", height: "270px" }}>
        <h2 className="mb-4">Welcome!</h2>
        <p className="text-muted mb-4">Sign in to continue</p>
        <button onClick={handleLogin} className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2">
          <i className="bi bi-google"></i> Login with Google
        </button>
      </div>
    </div>

    </>
    
  );
}

export default Login;
