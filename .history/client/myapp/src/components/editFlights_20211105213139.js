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
        //   description: '',
        //   duration: 0,
        //   date: new Date(),
        //   users: []
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
        //   description: this.state.description,
        //   duration: this.state.duration,
        //   date: this.state.date
        }
    
        console.log(flight);
    
        axios.post('http://localhost:5000/admin/editFlight/' + this.props.match.params.id, flight)
          .then(res => console.log(res.data));
    
        window.location = '/';
      }

    render() {
        return (
            <div>
                "editFlights here - Gego brdo"
            </div>
        )
    }
}