import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Button from "@mui/material/Button";
import ButtonsEditDel from "../UI/ButtonEditDel";
import Grid from "@mui/material/Grid";
import FormDialog from "../UI/FormDialogEnseignant";

const initialValue = { noms: "", grade: "", telephone: "" };
function Enseignant() {
  const [gridApi, setGridApi] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };

  const url = `http://localhost:5000/enseignant`;

  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Nom", field: "noms" },
    { headerName: "Grade", field: "grade" },
    { headerName: "telephone", field: "telephone" },
    {
      headerName: "Actions",
      field: "id",
      cellRendererFramework: (params) => (
        <ButtonsEditDel
          params={params}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      ),
    },
  ];

  // calling getUsers function for first time
  useEffect(() => {
    getEnseignants();
  }, []);

  //Get Enseignant data from server
  const getEnseignants = () => {
    fetch(url + "s")
      .then((resp) => resp.json())
      .then((resp) => {
        // console.log(resp);
        setTableData(resp);
      });
  };

  const onChange = (e) => {
    const { value, id } = e.target;
    console.log(value);
    setFormData({ ...formData, [id]: value });
  };

  const onGridReady = (params) => {
    setGridApi(params);
  };

  const handleUpdate = (oldData) => {
    setFormData(oldData);
    handleClickOpen();
  };

  //deleting a enseignant
  const handleDelete = (id) => {
    const confirm = window.confirm("Etes-vous sûr de supprimer?", id);
    if (confirm) {
      fetch(url + `/${id}`, { method: "DELETE" })
        .then((resp) => resp.json())
        .then((resp) => getEnseignants());
    }
  };

  const handleFormSubmit = () => {
    if (formData.id) {
      //updating a enseignant

      fetch(url + `/${formData.id}`, {
        method: "PUT",
        body: JSON.stringify({
          noms: formData.noms,
          telephone: formData.telephone,
          grade: formData.grade,
        }),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          handleClose();
          getEnseignants();
        });
    } else {
      // adding new user
      fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          handleClose();
          getEnseignants();
        });
    }
  };

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
  };

  return (
    <div className="ensignant">
      <h1 className="titre1" align="center">
        Enseignants
      </h1>
      <Grid align="right">
        <Button
          style={{ margin: 20, width: "40%" }}
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          Ajouter un enseignant
        </Button>
      </Grid>
      <div className="ag-theme-alpine" style={{ height: "400px", padding: 20 }}>
        <AgGridReact
          rowData={tableData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />
      </div>
      <FormDialog
        open={open}
        handleClose={handleClose}
        data={formData}
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default Enseignant;