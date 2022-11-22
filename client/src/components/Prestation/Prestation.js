import React, { useEffect, useState } from "react";
import Boutton from "../UI/Boutton";
import HeaderTitle from "../UI/HeaderTitle";
import FormPrestation from "./FormPrestation";
import styles from "./Prestation.module.css";

function Prestation() {
  const [open, setOpen] = useState(false);
  const [dataEns, setdataEns] = useState([]);
  const [dataCours, setdataCours] = useState([]);
  // console.log({ open });

  const allEnseignants = async () => {
    await fetch(`http://localhost:5000/enseignants`)
      .then((resp) => resp.json())
      .then((resp) => setdataEns(resp))
      .catch((e) => console.log("Erreur de connexion à l'api Enseignant", e));
  };

  const allCours = async () => {
    await fetch(`http://localhost:5000/cours`)
      .then((resp) => resp.json())
      .then((resp) => setdataCours(resp))
      .catch((e) => console.log("Erreur de connexion à l'api Cours", e));
  };

  useEffect(() => {
    allEnseignants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    allCours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HeaderTitle title="Prestation" />
      <Boutton
        className={styles.buttonPrestation}
        title="Ajouter une prestation"
        color="primary"
        onClick={() => setOpen(true)}
      />
      <FormPrestation
        open={open}
        setOpen={setOpen}
        dataEns={dataEns}
        dataCours={dataCours}
      />
    </>
  );
}

export default Prestation;
