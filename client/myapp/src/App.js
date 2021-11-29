import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateFlight from './views/admin/createFlight';
import  ViewAllFlights from './views/admin/viewAllFlights.js';

import  Home from './views/users/LandingPage/LandingPage.js';
import  Login from './views/users/login.js';
// import { render } from "react-dom";
import EditFlight from './views/admin/EditFlight';
import Search from './views/admin/searchComponent.js'
//import { ThemeProvider } from "@mui/styles";
import { ThemeProvider } from '@material-ui/styles';

 import { createTheme, responsiveFontSizes } from '@mui/material/styles';
//import { createMuiTheme } from '@material-ui/core';

//const baseTheme = createMuiTheme();
 let theme = createTheme();
 theme = responsiveFontSizes(theme);




function App() {
  return(
    <ThemeProvider theme={theme}>
         <Router> 
           
           <Route path ={"/login"} component={Login}></Route>
           <Route path ={"/home"} component={Home}></Route>
           <Route path ={"/admin/allFlights"} component={ViewAllFlights}></Route>
           <Route path='/admin/createFlight' component={CreateFlight}></Route>
           <Route path='/admin/editFlight/:id' component={EditFlight} />
           <Route path ={"/admin/search"} component={Search}/>
         </Router> 
         </ThemeProvider>

         );
  }

export default App;
