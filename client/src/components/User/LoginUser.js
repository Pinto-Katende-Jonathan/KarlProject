import React from "react";

function LoginUser() {
  return (
    <form class="sign-in-htm">
      <div class="group">
        <label for="user" class="label">
          Email
        </label>
        <input id="user" type="email" class="input" />
      </div>
      <div class="group">
        <label for="pass" class="label">
          Password
        </label>
        <input id="pass" type="password" class="input" data-type="password" />
      </div>

      <div class="group">
        <input type="submit" class="button" value="Login" />
      </div>
      <div class="hr"></div>
    </form>
  );
}

export default LoginUser;
