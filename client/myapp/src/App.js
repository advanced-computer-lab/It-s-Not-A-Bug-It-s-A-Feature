import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createFlight from './components/createFlight';
import  ViewAllFlights from './components/viewAllFlights.js';
// import { render } from "react-dom";
import EditFlight from './components/EditFlight';
import Search from './components/searchComponent.js'

function App() {
  return(
         <Router> 
           <Route path ={"/admin/allFlights"} component={ViewAllFlights}></Route>
           <Route path='/admin/createFlight' component={createFlight}></Route>
           <Route path='/admin/editFlight/:id' component={EditFlight} />
           <Route path ={"/admin/home"} component={Search}/>
         </Router> 
         );
  }

export default App;
