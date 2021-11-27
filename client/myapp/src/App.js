import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateFlight from './views/admin/createFlight';
import  ViewAllFlights from './views/admin/viewAllFlights.js';

import  Home from './views/users/LandingPage/LandingPage.js';
import  Login from './views/users/login.js';
// import { render } from "react-dom";
import EditFlight from './views/admin/EditFlight';
import Search from './views/admin/searchComponent.js'

function App() {
  return(
         <Router> 
           
           <Route path ={"/login"} component={Login}></Route>
           <Route path ={"/home"} component={Home}></Route>
           <Route path ={"/admin/allFlights"} component={ViewAllFlights}></Route>
           <Route path='/admin/createFlight' component={CreateFlight}></Route>
           <Route path='/admin/editFlight/:id' component={EditFlight} />
           <Route path ={"/admin/search"} component={Search}/>
         </Router> 
         );
  }

export default App;
