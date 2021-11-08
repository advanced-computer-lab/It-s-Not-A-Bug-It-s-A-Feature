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
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';



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
          //this one works
          var self = this;
          axios.get('http://localhost:8000/admin/editFlight/' + this.props.match.params.id)
          .then(function (res) {
            console.log(res.data.flightNo);
            self.setState ({
              flightNo: res.data.flightNo,
              departureDate : res.data.departureDate,
              arrivalDate :res.data.arrivalDate,
              economySeats :res.data.economySeats,
              businessSeats :res.data.businessSeats,
              arrivalAirport : res.data.arrivalAirport,
              departureAirport : res.data.departureAirport,
              departureTerminal : res.data.departureTerminal,
              arrivalTerminal : res.data.arrivalTerminal
            });
            // this.render();

          })
          .catch(function (error) {
            console.log(error);
          });

        
      }

      onChangeFlightNo(e) {
        this.setState({
          flightNo: e.target.value
        })
      }
      onChangeDeptDate(e) {
        this.setState({
          // departureDate: e.target.value
          departureDate: e
        })
      }
      onChangeArrDate(e) {
        this.setState({
          arrivalDate: e
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
    if (this.state.flightNo === 0)
    return(
      <div>loading</div>
    )
    else
    
          return (

    <div>
            
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
          id="FlightNo"
          fullWidth
          variant="standard"
          label="Flight Number"
          type="number"
          defaultValue= {this.state.flightNo}
          onChange={this.onChangeFlightNo}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          required
          id="filled-required"
          fullWidth
          variant="standard"
          label="Number of Economy Seats"
          type="number"
          defaultValue= {this.state.economySeats}
          onChange={this.onChangeEconSeats}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          required
          id="filled-required"
          fullWidth
          variant="standard"
          label="Number of Business Seats"
          type="number"
          defaultValue= {this.state.businessSeats}
          onChange={this.onChangeBusinessSeats}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          required
          id="filled-required"
          fullWidth
          variant="standard"
          label="dept ariport"
          defaultValue= {this.state.departureAirport}
          onChange={this.onChangeDeptAirport}
        />
        <TextField
          required
          id="filled-required"
          fullWidth
          variant="standard"
          label="arrival ariport"
          defaultValue= {this.state.arrivalAirport}
          onChange={this.onChangeArrAirport}
        />
        <TextField
          required
          id="filled-required"
          fullWidth
          variant="standard"
                              label="Departure Terminal"
          defaultValue= {this.state.departureTerminal}
          onChange={this.onChangeDeptTerminal}
        />
        <TextField
          required
          id="filled-required"
          fullWidth
          variant="standard"
                    label="Arrival Terminal"
          defaultValue= {this.state.arrivalTerminal}
          onChange={this.onChangeArrTerminal}
        />
        
        </div>
        <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
            renderInput={(props) => <TextField {...props} 
            required 
            id="departureDate"
            label="Departure date & time"
            fullWidth
            variant="standard" />}
            value={this.state.departureDate}
            onChange={(newValue) => {
              this.onChangeDeptDate(newValue);
            }}            />
        </LocalizationProvider>
        </div>
        <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
            renderInput={(props) => <TextField {...props} 
            required 
            id="arrivalDate"
            label="Arrival date & time"
            fullWidth
            variant="standard" />}
            value={this.state.arrivalDate}
            onChange={(newValue) => {
              this.onChangeArrDate(newValue);
            }}          />
          </LocalizationProvider>
        </div>
        </Box>
        
        <Button variant="contained" type="submit" onClick={this.onSubmit} sx={{ mt: 3, ml: 1 }}> Save </Button>
        
      </form>
      
    </div>
        )
    }
    
}
