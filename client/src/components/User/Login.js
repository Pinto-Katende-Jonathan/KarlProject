import React from "react";
import Compte from "./Compte";
import HeaderLogin from "./HeaderLogin";
import "./Login.css";
import LoginUser from "./LoginUser";

function Login() {
  return (
    <>
      <div className="login-wrap">
        <div className="login-html">
          <HeaderLogin />
          <div className="login-form">
            <LoginUser />
            <Compte />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
