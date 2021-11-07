import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
// import Stack from '@mui/material/Stack';
import { useParams } from "react-router";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';



export default function FindCurr() {
  const[list, setList]= useState([]); 
  const { id } = useParams();

 useEffect(()=>{
    
  axios.get('http://localhost:8000/admin/editFlight/' + id)
  .then(res => console.log(res.data));
 },[]);



 return (
  //  <div>
     list.map(a=>{return (<div><label>{a.flightNo}</label><br/></div>)})
     {/* </div> */}
    //  <h3>{res.data[0]}</h3>
    
     );
}

class EditFlight extends Component {

    constructor(props) {
        super(props);
    
        this.onChangeFlightNo = this.onChangeFlightNo.bind(this);
        this.onChangeDeptDate = this.onChangeDeptDate.bind(this);
        this.onChangeArrDate = this.onChangeArrDate.bind(this);
        this.onChangeEconSeats= this.onChangeEconSeats.bind(this);
        this.onChangeBusinessSeats= this.onChangeBusinessSeats.bind(this);
        this.onChangeArrAirport = this.onChangeArrAirport.bind(this);
        this.onChangeDeptAirport = this.onChangeDeptAirport.bind(this);
        this.onChangeDeptTerminal.No = this.onChangeDeptTerminal.bind(this);
        this.onChangeArrTerminal = this.onChangeArrTerminal.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);
    
        // var f = axios.get('http://localhost:8000/admin/editFlight/' + this.props.match.params.id)
        //   .then(res => console.log(res.data));

          
        

        // console.log("hi 2 " + f);

        this.state = {
          flightNo: 0,
          departureDate : new Date(2018, 11, 24, 10, 33, 30, 0),
          arrivalDate : new Date(2018, 11, 25, 10, 33, 30, 0),
          economySeats : 4,
          businessSeats : 2,
          arrivalAirport : 'e',
          departureAirport : 'e',
          departureTerminal : 'e',
          arrivalTerminal : 'e'
          
        }
      }
      onChangeFlightNo(e) {
        this.setState({
          flightNo: e.target.value
        })
      }
      onChangeDeptDate(e) {
        this.setState({
          departureDate: e.target.value
        })
      }
      onChangeArrDate(e) {
        this.setState({
          arrivalDate: e.target.value
        })
      }
      onChangeEconSeats(e) {
        this.setState({
          economySeats: e.target.value
        })
      }
      onChangeBusinessSeats(e) {
        this.setState({
          businessSeats: e.target.value
        })
      }
      onChangeArrAirport(e) {
        this.setState({
          arrivalAirport: e.target.value
        })
      }
      onChangeDeptAirport(e) {
        this.setState({
          departureAirport: e.target.value
        })
      }
      onChangeArrTerminal(e) {
        this.setState({
          arrivalTerminal: e.target.value
        })
      }
      onChangeDeptTerminal(e) {
        this.setState({
          departureTerminal: e.target.value
        })
      }
      
      
      onSubmit(e) {
        e.preventDefault();
    
        const flight = {
          flightNo: this.state.flightNo,
          departureDate: this.state.departureDate,
          arrivalDate: this.state.arrivalDate,
          economySeats: this.state.economySeats,
          businessSeats: this.state.businessSeats,
          arrivalAirport: this.state.arrivalAirport,
          departureAirport: this.state.departureAirport,
          departureTerminal: this.state.departureTerminal,
          arrivalTerminal : this.state.arrivalTerminal
        
        }
    
        console.log(flight);
    
        axios.post('http://localhost:8000/admin/editFlight/' + this.props.match.params.id, flight)
          .then(res => console.log(res.data));
    
        window.location = '/';
      }

    render() {
        return (
          
    <div>
            
      <h3>Edit Flight #{this.state.flightNo}</h3>
      <form onSubmit={this.onSubmit}>
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      <TextField
          required
          id="outlined-number"
          label="Number"
          type="number"
          defaultValue= {this.state.flightNo}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="dept ariport"
          defaultValue= {this.state.departureAirport}
        />
        <TextField
          required
          id="outlined-required"
          label="arrival ariport"
          defaultValue= {this.state.arrivalAirport}
        />
        <TextField
          required
          id="outlined-required"
          label="Departure Terminal"
          defaultValue= {this.state.departureTerminal}
        />
        <TextField
          required
          id="outlined-required"
          label="Arrival Terminal"
          defaultValue= {this.state.arrivalTerminal}
        />
        
        </div>
        <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label="Departure date & time"
          value={this.state.departureDate}
          onChange={this.onChangeDeptDate}
          renderInput={(params) => <TextField {...params} />}
        />  
        </LocalizationProvider>
        </div>
        </Box>
        
      </form>
      
    </div>
        )
    }
}
