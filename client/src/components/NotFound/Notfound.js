import React from "react";
import { Link } from "react-router-dom";
import "./Notfound.css";

function Notfound() {
  return (
    <div className="notfound">
      <div class="number">404</div>
      <div class="text">
        <span>Ooops...</span>
        <br />
        page not found
      </div>
      <Link className="accueil" to="/">
      &#8592; Revenir à la page d'accueil
      </Link>
    </div>
  );
}

export default Notfound;
