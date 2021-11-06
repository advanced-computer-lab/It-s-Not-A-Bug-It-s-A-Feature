import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import axios from 'axios';
import {useState,useEffect} from 'react';
import allFlights from './components/viewAllFlights.js';


export default function CustomizedTables() {
 
  return (
     <Router>
      <Route path ='/Admin/allFlights' component={allFlights}></Route>
     </Router>
  );
}

