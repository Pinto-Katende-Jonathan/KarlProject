import React from "react";
import './Navbar.css';
import {NavLink} from 'react-router-dom'

function Navbar() {
  return (
    <>
    <nav>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fas fa-bars"></i>
      </label>
      <label className="logox">Karl</label>
      <ul>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='enseignant'>Enseignant</NavLink></li>
        <li><NavLink to='cours'>Cours</NavLink></li>
        <li><NavLink to='prestation'>Prestation</NavLink></li>
        <li><NavLink to='paiement'>Paiement</NavLink></li>
        <li><NavLink to='login'>Login</NavLink></li>
      </ul>
    </nav>
    </>
  );
}

export default Navbar;
