import React from "react";

function HeaderLogin() {
  return (
    <>
      <input id="tab-1" type="radio" name="tab" className="sign-in" checked />
      <label htmlFor="tab-1" className="tab">
        Login
      </label>
      <input id="tab-2" type="radio" name="tab" className="sign-up" />
      <label htmlFor="tab-2" className="tab">
        Enregistrement
      </label>
    </>
  );
}

export default HeaderLogin;
