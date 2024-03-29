import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import ButtonsEditDel from "../UI/ButtonEditDel";
import HeaderTitle from "../UI/HeaderTitle";
import FormDialog from "./FormDialogEnseignant";
import MessageFlash from "../UI/MessageFlash";

const initialValue = { noms: "", grade: "", telephone: "" };
function Enseignant() {
  const [gridApi, setGridApi] = useState(null); // eslint-disable-line no-unused-vars
  // let setGridApi = useRef();
  const [tableData, setTableData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue);

  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);

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

  // calling getEns function for first time
  useEffect(() => {
    getEnseignants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // console.log(e);
    setFormData({ ...formData, [id]: value });
  };

  const onGridReady = (params) => {
    // console.log(params.api);
    // setGridApi.current.value = params;
    setGridApi(params);
  };

  const handleUpdate = (oldData) => {
    setFormData(oldData);
    handleClickOpen();
  };

  //deleting an enseignant
  const handleDelete = (id) => {
    const confirm = window.confirm("Etes-vous sûr de supprimer?", id);
    if (confirm) {
      fetch(url + `/${id}`, { method: "DELETE" })
        .then((resp) => resp.json())
        .then((resp) => {
          getEnseignants();
        });
    }
  };

  const handleFormSubmit = () => {
    if (formData.id) {
      //updating an enseignant
      if (formData.noms.trim() && formData.telephone.trim()) {
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
      }
    } else {
      // adding new enseignant
      if (
        formData.noms.trim() &&
        formData.telephone.trim() &&
        formData.telephone.length === 10
      ) {
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
            // L'alert disparait après 3s
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setMessage(resp.message);
            setType("success");
            // alert("Enseignant ajouté avec succès");
            getEnseignants();
          });
      } else {
        alert(
          "La taille du numéro doit être égale à 10 ou soit le numéro doit être unique"
        );
      }
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
      <HeaderTitle title="Enseignant" />
      {message ? (
        <div
          className="alert-ens"
          style={{ width: 300, margin: "10px auto", textAlign: "center" }}
        >
          <MessageFlash message={message} setMessage={setMessage} type={type} />
        </div>
      ) : (
        ""
      )}
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
