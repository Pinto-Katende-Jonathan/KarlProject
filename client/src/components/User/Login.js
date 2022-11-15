import React from "react";
import Compte from "./Compte";
import HeaderLogin from "./HeaderLogin";
import "./Login.css";
import LoginUser from "./LoginUser";

function Login() {
  return (
    <>
      <div class="login-wrap">
        <div class="login-html">
          <HeaderLogin />
          <div class="login-form">
            <LoginUser />
            <Compte />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
