import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './Prestation.module.css'
import Boutton from '../UI/Boutton';
import { useEffect } from 'react';

export default function BasicTable() {
  const [data, setData] = React.useState([])

  const handleDelete = (id) => {
    // console.log( `Id : ${id} Cliqued`);
    const confirm = window.confirm("Etes-vous sûr de supprimer cette Prestaion?", id);
    if (confirm) {
      fetch(`http://localhost:5000/prestation/${id}`, { method: "DELETE" })
        .then((resp) => resp.json())
        .then((resp) => getPrestations());
    }
  }

  useEffect(() => {
    getPrestations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPrestations = async () => {
    await fetch('http://localhost:5000/prestations')
      .then((resp) => resp.json())
      .then((resp) => {
        setData(resp);
      });
  };
 
  // console.log(data);
  return (
    <div className={styles.tablePrestation}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, height: 400}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Enseignant</TableCell>
            <TableCell align="center">Cours</TableCell>
            <TableCell align="right">Date Prestation</TableCell>
            <TableCell align="right">Début</TableCell>
            <TableCell align="right">Fin</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((el) => (
            <TableRow
              key={el.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell component="th" scope="row">
              {el.id}
              </TableCell>
              <TableCell align="center">{el.enseignant_id}</TableCell>
              <TableCell align="center">{el.cours_id}</TableCell>
              <TableCell align="right">{el.datePrestation}</TableCell>
              <TableCell align="right">{el.heureDebut}</TableCell>
              <TableCell align="right">{el.heureFin}</TableCell>
              <TableCell align="center"><Boutton title="Delete" color="error" onClick={() => handleDelete(el.id)}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}