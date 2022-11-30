import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import useAuth from "../User/hooks/useAuth";

function Navbar() {
  const { auth, setAuth } = useAuth();
  const logout = () => setAuth("");
  return (
    <>
      <nav>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className="fas fa-bars"></i>
        </label>
        <label className="logox">Karl</label>
        <ul>
          {auth?.user ? (
            <>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="enseignant">Enseignant</NavLink>
              </li>
              <li>
                <NavLink to="cours">Cours</NavLink>
              </li>
              <li>
                <NavLink to="prestation">Prestation</NavLink>
              </li>
              <li>
                <NavLink to="paiement">Paiement</NavLink>
              </li>
              <li>
                <NavLink to="login" onClick={() => logout()}>
                  Se déconnecter
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="login">Login</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
