import { TextField } from "@mui/material";
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
  const { id, int_cours, volume } = data;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {id ? "Mise à jour des infos du cours" : "Ajouter un cours"}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              id="int_cours"
              value={int_cours}
              onChange={(e) => onChange(e)}
              placeholder="Entrez l'intitulé du cours"
              label="cours"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              type="number"
              id="volume"
              value={volume}
              onChange={(e) => onChange(e)}
              placeholder="Entrez le volume du cours"
              label="Volume"
              variant="outlined"
              margin="dense"
              fullWidth
            />
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
