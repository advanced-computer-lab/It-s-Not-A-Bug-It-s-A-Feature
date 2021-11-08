import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
//import {useState, useEffect} from 'react';

export default class editFlight extends Component {

    constructor(props) {
        super(props);
    
        this.onChangeFlightNo = this.onChangeFlightNo.bind(this);
        // this.onChangeDescription = this.onChangeDescription.bind(this);
        // this.onChangeDuration = this.onChangeDuration.bind(this);
        // this.onChangeDate = this.onChangeDate.bind(this);
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
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div> */}
        <div className="form-group"> 
          <label>flightNo: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.flightNo}
              onChange={this.onChangeFlightNo}
              />
        </div>
        {/* <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div> */}

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
      <label>heereee</label>
    </div>
        )
    }
}