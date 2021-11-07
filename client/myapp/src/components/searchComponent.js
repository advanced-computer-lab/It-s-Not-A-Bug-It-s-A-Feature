import * as React from 'react';

import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
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
import DateRangePicker from '@material-ui/lab/DateRangePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import Paper from '@material-ui/core/Container';
import Stack from '@material-ui/core/Stack';
import { styled } from '@material-ui/core/styles';
import DateRangeTwoToneIcon from '@material-ui/icons/DateRangeTwoTone';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
// import {helper} from './SearchFlights.js';

// function SearchFlights() {
  
//   const[rows, setRows]= useState([]); 
//   useEffect(()=>{
//       axios.get('http://localhost:8000/Admin/searchFlights',{ params:
//           {
//             flightNo:flightData.flightNo,
//             arrivalDate:flightData.arrivalDate,
//             arrivalAirport:flightData.arrivalAirport,
//             arrivalTerminal:flightData.arrivalTerminal,
//             arrivalTime:flightData.arrivalTime,
//             departureDate:flightData.departureDate,
//             departureAirport:flightData.departureTime,
//             departureTerminal:flightData.departureTerminal,
//             departureTime:flightData.departureTime 
//           }     
//     })
//     .then(res=> {setRows(res.data);console.log(res)}).catch(err=>console.log(err))
    
//    },[]);
//    return rows;
//   // return helper(rows)
// }
 
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
            departureAirport:d.departureTime,
            departureTerminal:d.departureTerminal,
            departureTime:d.departureTime 
          }     
    })
    .then(res=> {
      setRows(res.data);
      // setData(res.Data);
      console.log(res.data);
      console.log(d)
      res.redirect('/searchFlights');
    }).catch(err=>console.log(err))
    
   };

  return (
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
  
    <div><SwapHorizIcon sx={{color: 'action.active' , mt:2.5}} /></div>
    
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
      <br></br>
      <div>{helper(rows)}</div>        
        
    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
       <DateRangePicker
       sx={{ color: 'action.active'}}
        startText=""
        endText=""
        value={d.departureDate}
        onChange={(event) =>  {
          setData((prevState => {
              return {
                  ...prevState,
                  ["departureDate"]: event
              };
          }));
      }} 
        renderInput={(startProps, endProps) => (
          <React.Fragment>
           <DateRangeTwoToneIcon sx={{ color: 'action.active', mr: 1, mt: 1.5 }}/>
           <TextField {...startProps} 
             id="input-with-sx" 
             variant="standard" 
             helperText="Departing"
             value={d.departureDate}
            onChange={(event) =>  {
              setData((prevState => {
                  return {
                      ...prevState,
                      ["departureDate"]: event
                  };
              }));
          }}            />
            <Box sx={{ mx: 3, my :0.5 }}>to</Box>
            <DateRangeTwoToneIcon sx={{ color: 'action.active', mr: 1, mt: 1.5 }}/>
            <TextField {...endProps} 
            id="input-with-sx"  
            variant="standard" 
            helperText="Arrival" 
            placeholder='mm/dd/yy'
            value={d.arrivalDate}
            onChange={(event) =>  {
              setData((prevState => {
                  return {
                      ...prevState,
                      ["arrivalDate"]: event
                  };
              }));
          }}
            />
          </React.Fragment>
        )}
      />
      </LocalizationProvider> */}

    </Stack>

    <Stack direction="row" spacing={1} sx={{ml:3.8,mt:1.5}}>

    {/* <Box   sx={{color: 'action.active',display: 'flex', alignItems: 'right',mt:2 , mr:1.5}}>
    <TextField
        id="time1"
        type="time"
        variant="standard" 
        value={d.departureTime}
            onChange={(event) =>  {
              setData((prevState => {
                  return {
                      ...prevState,
                      ["departureTime"]: event
                  };
              }));
          }}         
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
    
        helperText="Departing Time"
      />
      </Box>
   <Box sx={{ color: 'action.active',display: 'flex', alignItems: 'right',mt:2,mr:1.5}}>
        <TextField
                id="time2"
                type="time"
                variant="standard" 
                value={d.arrivalTime}
                    onChange={(event) =>  {
                    setData((prevState => {
                        return {
                            ...prevState,
                            ["arrivalTime"]: event
                        };
                    }));
                }}              
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 300, // 5 min
                }}
              helperText="Arrival Time"
            /> 
            </Box> */}

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