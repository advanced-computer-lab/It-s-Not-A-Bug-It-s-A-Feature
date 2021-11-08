import * as React from 'react';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Location from '@material-ui/icons/LocationOnSharp';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import tableCellClasses from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
// import DateIcon from '';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import react, { useEffect, useState } from "react";
import Paper from '@material-ui/core/Container';
import Stack from '@mui/material/Stack';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';

 
export default function Main() { 
    const [d, setData] =useState({
        flightNo:"",departureAirport:"",arrivalAirport:"",departureTerminal:"",arrivalTerminal:"",
        departureDate:"",arrivalDate:"",departureTime:"",arrivalTime:""
      });

      const[rows, setRows]= useState([]); 
     const onSubmit=()=>{
      axios.get('http://localhost:8000/Admin/searchFlights',{ params:
          {
            flightNo:d.flightNo,
            arrivalDate:d.arrivalDate,
            arrivalAirport:d.arrivalAirport,
            arrivalTerminal:d.arrivalTerminal,
            arrivalTime:d.arrivalTime,
            departureDate:d.departureDate,
            departureAirport:d.departureAirport,
            departureTerminal:d.departureTerminal,
            departureTime:d.departureTime 
          
          }     
    })
    .then(res=> {
      console.log(d)
      setRows(res.data);
      console.log(res.data)
    }).catch(err=>console.log(err))
    
   };

  return (
   
    <div>
          <div>

    
    <Stack direction="row" spacing={1}>
        <div>

        <Box  sx={{ display: 'flex', alignItems: 'flex-end' }}>
       <Location sx={{ color: 'action.active', mr: 1, my: 2.8 }} />
       <TextField 
        id="input-with-sx" 
        name="departureAirport"
        label="City or Airport" 
        variant="standard" 
        helperText="Leaving from"
        value={d.departureAirport}
        onChange={(event) =>  {
          const {name, value} = event.target;
          setData((prevState => {
              return {
                  ...prevState,
                  [name]: value
              };
          }));
      }}    
          />
        </Box>
  
    
    <Box  sx={{ display: 'flex', alignItems: 'flex-end' }}>
     <Location sx={{ color: 'action.active', mr: 1, my: 2.8 }} />
     <TextField id="input-with-sx" 
        label="City or Airport" 
        variant="standard" 
        name = "arrivalAirport"
        helperText="Going to" 
        value={d.arrivalAirport}
            onChange={(event) =>  {
              const {name, value} = event.target;
              setData((prevState => {
                  return {
                      ...prevState,
                      [name]: value
                  };
              }));
          }}

        />
      </Box> 
    </div>
      
           
        
    <Stack component="form" noValidate spacing={3}>
      <TextField
        id="departureDate"
        label="Departure Date"
        type="date"
        value={d.departureDate}
        name="departureDate"
        defaultValue="2017-05-24"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event) =>  {
          const {name, value} = event.target;
          setData((prevState => {
              return {
                  ...prevState,
                  [name]: value
              };
          }));
      }
    }
      />
      <TextField
        id="departureTime"
        label="Departure Time "
        type="time"
        name="departureTime"
        value={d.departureTime}
        // defaultValue="07:30"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
        onChange={(event) =>  {
          const {name, value} = event.target;
          setData((prevState => {
              return {
                  ...prevState,
                  [name]: value
              };
          }));
      }
    }
      />
        <TextField
        id="arrivalTime"
        label="Arrival Time "
        type="time"
        value={d.arrivalTime}
        name="arrivalTime"
        onChange={(event) =>  {
          const {name, value} = event.target;
          setData((prevState => {
              return {
                  ...prevState,
                  [name]: value
              };
          }));
      }
    }
        // value="arrivalTime"
        // defaultValue="08:30"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        sx={{ width: 150 }}
      />
      <TextField
        id="date"
        label="arrrivalDate"
        name="arrivalDate"
        type="date"
        value={d.arrivalDate}
        defaultValue="2017-05-24"
        sx={{ width: 220 }}
        
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event) =>  {
          const {name, value} = event.target;
          setData((prevState => {
              return {
                  ...prevState,
                  [name]: value
              };
          }));
      }
    }
      />
    </Stack>

    </Stack>

    <Stack direction="row" spacing={1} sx={{ml:3.8,mt:1.5}}>

    

     <Box  sx={{ display: 'flex', alignItems: 'right',mr:1.5 }}>

     <TextField 
        id="input-with-sx" 
        label="Terminal No" 
        variant="standard" 
        helperText="Departing"
        name="departureTerminal"
         value={d.departureTerminal}
            onChange={(event) =>  {
              const {name, value} = event.target;
              setData((prevState => {
                  return {
                      ...prevState,
                      [name]: value
                  };
              }));
          }}/>
        </Box>
  
    
      <Box  sx={{ display: 'flex', alignItems: 'right' ,mr:1.5}}>
      <TextField 
        id="input-with-sx" 
        label="Terminal No" 
        variant="standard" 
        helperText="Arrial" 
        name="arrivalTerminal"
        value={d.arrivalTerminal}
            onChange={(event) =>  {
              const {name, value} = event.target;
              setData((prevState => {
                  return {
                      ...prevState,
                      [name]: value
                  };
              }));
          }}       
         />
      </Box> 
      <Box  sx={{ display: 'flex', alignItems: 'right',mr:1.5}}>
      <TextField 
        id="input-with-sx" 
        label="Flight No" 
        variant="standard" 
        name="flightNo"
        value={d.flightNo}
        onChange={(event) =>  {
          const {name, value} = event.target;
          setData((prevState => {
             
              return {
                  ...prevState,
                  [name]: value
              };
          }));
      }}
        />
      </Box> 
    </Stack>
     <Button variant="contained"  size='small' sx={{ alignItems: 'right',ml:100 , mb:10}} id="search"onClick={(e) => {onSubmit(e);
                      }}>
             Search
        </Button>
        </div>

        <div>{helper(rows)}</div>  
    </div>


  );
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

export function helper(rows){
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