import React from "react";

function LoginUser() {
  return (
    <form className="sign-in-htm">
      <div className="group">
        <label htmlFor="user" className="label">
          Email
        </label>
        <input id="user" type="email" className="input" />
      </div>
      <div className="group">
        <label htmlFor="password2" className="label">
          Password
        </label>
        <input
          id="password2"
          type="password"
          className="input"
          data-type="password"
        />
      </div>

      <div className="group">
        <input type="submit" className="button" value="Login" />
      </div>
      <div className="hr"></div>
    </form>
  );
}

export default LoginUser;
