import axios from 'axios';
import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import {useState,useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import tableCellClasses from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { FormHelperText } from '@material-ui/core';



function SearchFlights() {
  const[rows, setRows]= useState([]); 
  useEffect(()=>{
      axios.get('http://localhost:8000/Admin/searchFlights',{ params:
          {
            flightNo:'2',
            arrivalDate:'',
            arrivalAirport:'',
            arrivalTerminal:'',
            arrivalTime:'',
            departureDate:'',
            departutreAirport:'',
            departureTerminal:'',
            departureTime:'' 

          }     
    })
    .then(res=> {setRows(res.data);console.log(res)}).catch(err=>console.log(err))
    
   },[]);

  return helper(rows)
    
}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableHead = styled(TableCell)(({ theme }) => ({
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
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
  
  function createData(DepartureDate, ArrivalDate, EconomySeats, BusinessSeats, ArrivalAirport , DepartureTerminal, ArrivalTerminal, DeleteIcon, UpdateIcon) {
    return { DepartureDate, ArrivalDate, EconomySeats, BusinessSeats, ArrivalAirport , DepartureTerminal, ArrivalTerminal, DeleteIcon, UpdateIcon };
  }
  
  // Not working as i want 
  // function deleteButton(){
  //   const noPointer = {cursor: 'default'};
  //   return(<DeleteRoundedIcon style={noPointer} ></DeleteRoundedIcon>);
  //   }
  
  function helper(rows){
    return(<TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableHead>Flight Number</StyledTableHead>
            <StyledTableHead align="right">Departure Date</StyledTableHead>
            <StyledTableHead align="right">Arrival Date</StyledTableHead>
            <StyledTableHead align="right">Economy Seats</StyledTableHead>
            <StyledTableHead align="right">Business Seats</StyledTableHead>
            <StyledTableHead align="right">Arrival Airport</StyledTableHead>
            <StyledTableHead align="right">Departure Airport</StyledTableHead>
            <StyledTableHead align="right">Arrival Terminal</StyledTableHead>
            <StyledTableHead align="right">Departure Terminal</StyledTableHead>
            <StyledTableHead align="right">  </StyledTableHead>
            <StyledTableHead align="right">  </StyledTableHead>
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
              <Button variant="outlined" startIcon={<DeleteIcon />}>
                  Delete
              </Button>
              }</StyledTableCell>
  
              <StyledTableCell align="right">{
                <Button variant="outlined" >
                       Update
              </Button>
              }</StyledTableCell>
  
              </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>);
  }
  export default SearchFlights;

