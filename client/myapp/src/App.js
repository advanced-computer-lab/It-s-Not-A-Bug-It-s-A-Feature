import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import axios from 'axios';
import {useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
// import allFlights from '../components/viewAllFlights';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import tableCellClasses from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/core/styles';
// import DeleteIcon from '@material-ui/core/Button'
import DeleleIcon from '@material-ui/icons/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(DepartureDate, ArrivalDate, EconomySeats, BusinessSeats, ArrivalAirport , DepartureTerminal, ArrivalTerminal, Icon) {
  return { DepartureDate, ArrivalDate, EconomySeats, BusinessSeats, ArrivalAirport , DepartureTerminal, ArrivalTerminal, Icon };
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function CustomizedTables() {
  const[rows, setRows]= useState([]); 

  useEffect(()=>{
     axios.get('http://localhost:8000/Admin/allFlights')
   .then(res=> {setRows(res.data);console.log(res)}).catch(err=>console.log(err))
  },[]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="right">Flight Number</StyledTableCell>
            <StyledTableCell align="right">Departure Date</StyledTableCell>
            <StyledTableCell align="right">Arrival Date</StyledTableCell>
            <StyledTableCell align="right">Economy Seats</StyledTableCell>
            <StyledTableCell align="right">Business Seats</StyledTableCell>
            <StyledTableCell align="right">Arrival Airport</StyledTableCell>
            <StyledTableCell align="right">Departure Airport</StyledTableCell>
            <StyledTableCell align="right">Arrival Terminal</StyledTableCell>
            <StyledTableCell align="right">Departure Terminal</StyledTableCell>
            <StyledTableCell align="right">  </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.flightNo}>
              <StyledTableCell scope="row">
                {row.flightNo}
              </StyledTableCell>
              <StyledTableCell align="right">{row.departureDate}</StyledTableCell>
              <StyledTableCell align="right">{row.arrivalDate}</StyledTableCell>
              <StyledTableCell align="right">{row.economySeats}</StyledTableCell>
              <StyledTableCell align="right">{row.businessSeats}</StyledTableCell>
              <StyledTableCell align="right">{row.arrivalAirport}</StyledTableCell>
              <StyledTableCell align="right">{row.departureAirport}</StyledTableCell>
              <StyledTableCell align="right">{row.arrivalTerminal}</StyledTableCell>
              <StyledTableCell align="right">{row.departureTerminal}</StyledTableCell>
              <StyledTableCell align="right">{
            <svg data-testid="DeleteIcon"></svg>
              }</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function App() {

    const[list, setList]= useState([]); 

 useEffect(()=>{
    axios.get('http://localhost:8000/Admin/allFlights')
  .then(res=> {setList(res.data);console.log(res)}).catch(err=>console.log(err))
 },[]);

   return (
    list.map(a=>{return (<div><label>{a.flightNo}</label><br/></div>)})
     );
   }
//  export default App;

