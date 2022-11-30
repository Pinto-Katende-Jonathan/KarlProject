import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import ButtonsEditDel from "../UI/ButtonEditDel";
import HeaderTitle from "../UI/HeaderTitle";
import FormDialog from "./FormDialogCours";
import useAuth from "../User/hooks/useAuth";

const initialValue = { int_cours: "", volume: "" };
function Cours() {
  const [gridApi, setGridApi] = useState(null); // eslint-disable-line no-unused-vars
  // let setGridApi = useRef();
  const [tableData, setTableData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue);
  const { accessToken } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };

  const url = `http://localhost:5000/cours`;

  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Cours", field: "int_cours" },
    { headerName: "Volume", field: "volume" },
    {
      headerName: "Actions",
      field: "id",
      cellRendererFramework: (params) => (
        <ButtonsEditDel
          params={params}
          handleUpdate={coursUpdate}
          handleDelete={coursDelete}
        />
      ),
    },
  ];

  // calling getUsers function for first time
  useEffect(() => {
    getCours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Get Enseignant data from server
  console.log(accessToken);
  const getCours = () => {
    fetch(url)
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
    // setGridApi.current.value = params;
    setGridApi(params);
  };

  const coursUpdate = (oldData) => {
    setFormData(oldData);
    handleClickOpen();
  };

  //deleting a enseignant
  const coursDelete = (id) => {
    const confirm = window.confirm("Etes-vous sûr de supprimer ce cours?", id);
    if (confirm) {
      fetch(url + `/${id}`, { method: "DELETE" })
        .then((resp) => resp.json())
        .then((resp) => getCours());
    }
  };

  const handleFormSubmit = () => {
    if (formData.id && Number(formData.volume)) {
      //updating a cours
      fetch(url + `/${formData.id}`, {
        method: "PUT",
        body: JSON.stringify({
          int_cours: formData.int_cours,
          volume: Number(formData.volume),
        }),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          handleClose();
          getCours();
        });
    } else {
      // adding new user
      if (!formData.int_cours || !formData.volume) {
        return;
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          int_cours: formData.int_cours,
          volume: Number(formData.volume),
        }),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          handleClose();
          getCours();
        });
      console.log(formData);
    }
  };

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
  };

  return (
    <div className="cours">
      <HeaderTitle title="Cours" />
      <Grid align="right">
        <Button
          style={{ margin: 20, width: "40%" }}
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          Ajouter un cours
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

export default Cours;
