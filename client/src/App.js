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

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="/create-account" element={<Compte />}></Route>
        <Route path="enseignant" element={<Enseignant />}></Route>
        <Route path="cours" element={<Cours />}></Route>
        <Route path="prestation" element={<Prestation />}></Route>
        <Route path="paiement" element={<Paiement />}></Route>
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
