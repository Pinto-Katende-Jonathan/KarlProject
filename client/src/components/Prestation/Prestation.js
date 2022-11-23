import React, { useState } from "react";
import Boutton from "../UI/Boutton";
import HeaderTitle from "../UI/HeaderTitle";
import FormPrestation from "./FormPrestation";
import styles from "./Prestation.module.css";
import DataTable from "./TablePrestation";

function Prestation() {
  const [open, setOpen] = useState(false);

  // console.log({ open });

  return (
    <>
      {/* ------------Header------------------- */}
      <HeaderTitle title="Prestation" />
      <Boutton
        className={styles.buttonPrestation}
        title="Ajouter une prestation"
        color="primary"
        onClick={() => setOpen(true)}
      />

      {/* ---------Dialog de soummission d'une Prestation---------*/}
      <FormPrestation open={open} setOpen={setOpen} />

      {/* ================Table of datas ================================ */}
      <DataTable />
    </>
  );
}

export default Prestation;
