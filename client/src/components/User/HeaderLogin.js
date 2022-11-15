import React from "react";

function HeaderLogin() {
  return (
    <>
      <input id="tab-1" type="radio" name="tab" class="sign-in" checked />
      <label for="tab-1" class="tab">
        Login
      </label>
      <input id="tab-2" type="radio" name="tab" class="sign-up" />
      <label for="tab-2" class="tab">
        Enregistrement
      </label>
    </>
  );
}

export default HeaderLogin;
