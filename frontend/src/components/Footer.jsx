import React from "react";

function Footer() {
  const handleLogin = () => {
  
    window.location.href = "http://localhost:5001/auth/google";
  };

  return (
    <footer className="container-xl py-4 border-top text-center">
<p className="mb-2">© 2025 All rights reserved.</p>
<div className="d-flex justify-content-center gap-4">
  <a className="text-dark" href="https://github.com/hoodadfarhad" target="_blank" rel="noreferrer">
    <i className="fa fa-github" style={{ fontSize: "2.5rem" }}></i>
  </a>
  <a className="text-dark" href="https://www.linkedin.com/in/hoodad-farhad/" target="_blank" rel="noreferrer">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40" height="40">
      <path fill="currentColor" d="M48,8H16c-4.418,0-8,3.582-8,8v32c0,4.418,3.582,8,8,8h32c4.418,0,8-3.582,8-8V16C56,11.582,52.418,8,48,8z M24,47h-5V27h5V47z M24.029,23.009C23.382,23.669,22.538,24,21.5,24c-1.026,0-1.865-0.341-2.519-1.023S18,21.458,18,20.468c0-1.02,0.327-1.852,0.981-2.498C19.635,17.323,20.474,17,21.5,17c1.038,0,1.882,0.323,2.529,0.969C24.676,18.615,25,19.448,25,20.468C25,21.502,24.676,22.349,24.029,23.009z M47,47h-5V35.887C42,32.788,40.214,31,38,31c-1.067,0-2.274,0.648-2.965,1.469S34,34.331,34,35.594V47h-5V27h5v3.164h0.078c1.472-2.435,3.613-3.644,6.426-3.652C44.5,26.5,47,29.5,47,34.754V47z" />
    </svg>
  </a>
</div>
</footer>
  );
}

export default Footer;









