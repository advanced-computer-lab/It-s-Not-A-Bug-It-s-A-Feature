import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
//import allFlights from './components/AllFlights';
//import editFlight from './components/editFlight';
import createFlight from './components/createFlight';
// import axios from 'axios';

import  ViewAllFlights from './components/viewAllFlights.js';

export default function CustomizedTables() {


function App() {
  return(
         <Router> 
           <Route path='/admin/createFlight' >{createFlight}</Route>
           <Route path ={"/AllFlights"} component={ViewAllFlights}></Route>
         </Router> 
         );
}

export default App;
