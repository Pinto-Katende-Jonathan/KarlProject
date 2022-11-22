import { DialogTitle } from "@mui/material";
import React from "react";

function DialogTitre(props) {
  return (
    <>
      <DialogTitle id="alert-dialog-title">
        {props.id ? `Mise à jour ${props.title}` : `Ajout ${props.title}`}
      </DialogTitle>
    </>
  );
}

export default DialogTitre;
