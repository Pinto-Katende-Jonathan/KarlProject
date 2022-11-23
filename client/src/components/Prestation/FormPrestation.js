import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Boutton from "../UI/Boutton";

function FormPrestation({ open, setOpen, dataEns, dataCours }) {
  const initialValues = {
    heureDebut: "",
    heureFin: "",
    enseignant_id: 0,
    cours_id: 0,
  };

  const [inputs, setInputs] = useState(initialValues);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    if (
      !inputs.heureDebut ||
      !inputs.heureFin ||
      !inputs.cours_id ||
      !inputs.enseignant_id
    ) {
      return;
    }

    fetch("http://localhost:5000/prestation", {
      method: "POST",
      body: JSON.stringify(inputs),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        handleClose();
        window.location.reload();
      });

    console.log("submitted");
    handleClose();
    setInputs(initialValues);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {/* {id
            ? "Mise à jour des infos de l'enseignant"
            : "Ajouter un enseinant"} */}
          Ajouter une Prestation
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Début"
              id="heureDebut"
              name="heureDebut"
              type="time"
              value={inputs.heureDebut}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              margin="dense"
              fullWidth
            />

            <TextField
              label="Fin"
              id="heureFin"
              name="heureFin"
              type="time"
              value={inputs.heureFin}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              margin="dense"
              fullWidth
            />

            <FormControl fullWidth margin="dense">
              <InputLabel>Enseignant</InputLabel>
              <Select
                name="enseignant_id"
                label="Enseignant"
                value={inputs.enseignant_id}
                onChange={(e) => handleChange(e)}
              >
                {dataEns.map((el) => {
                  return (
                    <MenuItem key={el.id} value={el.id}>
                      {el.noms}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="dense">
              <InputLabel>Cours</InputLabel>
              <Select
                name="cours_id"
                label="Cours"
                value={inputs.cours_id}
                onChange={(e) => handleChange(e)}
              >
                {dataCours.map((el) => {
                  return (
                    <MenuItem key={el.id} value={el.id}>
                      {el.int_cours}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Boutton onClick={handleClose} color="secondary" title="Cancel" />
          <Boutton
            color="primary"
            title="submit"
            onClick={() => handleFormSubmit()}
          />
          {/* {id ? "Update" : "Submit"} */}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormPrestation;
