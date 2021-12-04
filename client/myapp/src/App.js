import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateFlight from './views/admin/createFlight';
import  ViewAllFlights from './views/admin/viewAllFlights.js';

import  Home from './views/users/LandingPage/LandingPage.js';
// import  userHome from './views/users/LandingPage/userLandingPage.js';
import  Login from './views/users/login.js';
import Book from './views/users/book';
import  Profile from './views/users/ProfilePage';
import  SearchFlight from './views/users/SearchFlight.js';


// import { render } from "react-dom";
import EditFlight from './views/admin/EditFlight';
import Search from './views/admin/searchComponent.js'
//import { ThemeProvider } from "@mui/styles";
import { ThemeProvider } from '@material-ui/styles';
// import testsearch from './views/users/LandingPage/Sections/testsearch.js';
 import { createTheme, responsiveFontSizes } from '@mui/material/styles';

   let theme = createTheme();
 theme = responsiveFontSizes(theme);




function App() {
  return(
    <ThemeProvider theme={theme}>
         <Router> 
           
           <Route path ={"/login"} component={Login}></Route>
           <Route path ={"/profile"} component={Profile}></Route>
           <Route path ={"/book"} component={Book}></Route>
           <Route path ={"/search"} component={SearchFlight}></Route>

           <Route path ={"/home"} component={Home}></Route>
           <Route path ={"/admin/allFlights"} component={ViewAllFlights}></Route>
           <Route path='/admin/createFlight' component={CreateFlight}></Route>
           <Route path='/admin/editFlight/:id' component={EditFlight} />
           <Route path ={"/admin/search"} component={Search}/>
           {/* <Route path ={"/testSearch"} component={testsearch}/> */}
         </Router> 
         </ThemeProvider>

         );
  }

export default App;
