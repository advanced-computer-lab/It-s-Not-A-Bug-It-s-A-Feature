import React, { Component } from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import  ViewAllFlights from './components/viewAllFlights.js';
import Search from './components/searchComponent.js'
export default function CustomizedTables() {

  return (
    <Router>
      <Route path ={"/AllFlights"} component={ViewAllFlights}></Route>
      <Route path ={"/Home"} component={Search}></Route>
     </Router>
  );
}


