import { FormControl, NativeSelect, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

export default function FormDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const { id, noms, telephone, grade } = data;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {id
            ? "Mise à jour des infos de l'enseignant"
            : "Ajouter un enseinant"}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              id="noms"
              value={noms}
              onChange={(e) => onChange(e)}
              placeholder="Entrez votre nom complet"
              label="Nom"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="telephone"
              value={telephone}
              onChange={(e) => onChange(e)}
              placeholder="Entrez votre numéro de téléphone"
              label="Téléphone"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            {/* <TextField
              id="grade"
              value={grade}
              onChange={(e) => onChange(e)}
              placeholder="Grade"
              label="Grade"
              variant="outlined"
              margin="dense"
              fullWidth
            /> */}

            <FormControl fullWidth>
              <NativeSelect
                onChange={(e) => onChange(e)}
                value={grade}
                inputProps={{
                  name: "grade",
                  id: "grade",
                }}
              >
                <option value="None">None</option>
                <option value="Ct">Ct</option>
                <option value="Ass">Ass</option>
                <option value="cc">cc</option>
              </NativeSelect>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => handleFormSubmit()}
            variant="contained"
          >
            {id ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
