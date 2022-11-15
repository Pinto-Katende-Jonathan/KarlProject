import React from "react";

function Compte() {
  return (
    <form class="sign-up-htm">
      <div class="group">
        <label for="pass" class="label">
          Password
        </label>
        <input id="pass" type="password" class="input" data-type="password" />
      </div>
      <div class="group">
        <label for="pass" class="label">
          Repeat Password
        </label>
        <input id="pass" type="password" class="input" data-type="password" />
      </div>
      <div class="group">
        <label for="pass" class="label">
          Email Address
        </label>
        <input id="pass" type="text" class="input" />
      </div>
      <div class="group">
        <input type="submit" class="button" value="S'enregistrer" />
      </div>
      <div class="hr"></div>
    </form>
  );
}

export default Compte;
