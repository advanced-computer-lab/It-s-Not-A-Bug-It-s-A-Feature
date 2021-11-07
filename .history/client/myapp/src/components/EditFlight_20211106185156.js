import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
//import {useState, useEffect} from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';



export default class EditFlight extends Component {

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
              <label>heereee</label>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        
        {/* <div className="form-group"> 
          <label>flightNo: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.flightNo}
              onChange={this.onChangeFlightNo}
              />
        </div>
       
        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div> */}
        <div>
          <TextField
            required
            id="outlined-required"
            label="flightNo"
            defaultValue = this.state.flightNo
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
      </form>
      <label>heereee</label>
    </div>
        )
    }
}

// export default function EditFlight() {
//   return (
//     <div>
//       {/* <DateTimePicker
//           label="Date&Time picker"
//           value={value}
//           onChange={this.onChangeDeptDate}
//           renderInput={(params) => <TextField {...params} />} */}
//     </div>
//   )
// }
