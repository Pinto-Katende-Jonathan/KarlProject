import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Compte from "./components/User/Compte";
import Cours from "./components/Cours/Cours";
import Enseignant from "./components/Enseignant/Enseignant";
import Home from "./components/Home";
import Login from "./components/User/Login";
import Navbar from "./components/Navbar/Navbar";
import Notfound from "./components/NotFound/Notfound";
import Paiement from "./components/Paiement/Paiement";
import Prestation from "./components/Prestation/Prestation";
import Layout from "./components/Layout";
import RequireAuth from "./components/User/RequireAuth";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route path="login" element={<Login />}></Route>
          <Route path="create-account" element={<Compte />}></Route>

          {/* Route after login */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="enseignant" element={<Enseignant />}></Route>
            <Route path="cours" element={<Cours />}></Route>
            <Route path="prestation" element={<Prestation />}></Route>
            <Route path="paiement" element={<Paiement />}></Route>
          </Route>

          {/* Pour le login, si une pers se connecte avec des bonnes information, on attribut à {user} une valeur égale
          à son email. Au niveau de RequireAuth, on vérifie si le user est là, si oui : on retourne Outlet(Contenu de 
          notre app, il provient du Layout component), si non on reste sur le login */}

          {/* Page not found */}
          <Route path="*" element={<Notfound />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
