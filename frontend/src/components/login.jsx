import React from "react";

function Login() {
  const handleLogin = () => {
  
    window.location.href = "http://localhost:5001/auth/google";
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      <div className="p-5 shadow-lg rounded-4 bg-white text-center" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="mb-4">Welcome Back</h2>
        <p className="text-muted mb-4">Sign in to continue</p>
        <button onClick={handleLogin} className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2">
          <i className="bi bi-google"></i> Login with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
