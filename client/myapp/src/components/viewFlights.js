import axios from 'axios';
import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

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
import DeleleIcon from '@material-ui/icons/Delete';



function search() {
const response = axios.get('http://localhost:8000/Admin/searchFlights', { params:
          {
            flightNo:'1',
            arrivalDate:'',
            arrivalAirport:'',
            arrivalTerminal:'',
            arrivalTime:''
          }     
    }
    ).then(data => {console.log(data.data);  }).catch(err=>console.log(err));
  
    return response.data
}
export default class ViewFlights extends Component {
    render(){
        return(<div> "view flights" </div>)
    }
    constructor(props) {
        super(props);
        search();
    }
}
