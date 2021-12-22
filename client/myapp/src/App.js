import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateFlight from './views/admin/createFlight';
import  ViewAllFlights from './views/admin/viewAllFlights.js';

import  Home from './views/users/LandingPage/LandingPage.js';
// import  userHome from './views/users/LandingPage/userLandingPage.js';
import  Login from './views/users/login.js';
import SignUp from './views/users/SignUpPage.js';
import Test from './views/users/test.js';
import Book from './views/users/book';
import  Profile from './views/users/ProfilePage';
import  SearchFlight from './views/users/SearchFlight.js';
import  Error from './views/users/error.js';
import  deptReserveFlight from './views/users/ReservationDeptSeats.js';
import  retReserveFlight from './views/users/ReservationRetSeats.js';
import  Payment from './views/users/PaymentPageRes.js';
import bothSeats from './views/users/ResTwoWaySeats.js';
import editRes from './views/users/editRes.js';

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
           <Route path ={"/signUp"} component={SignUp}></Route>
           <Route path ={"/test"} component={Test}></Route>
           <Route path ={"/profile"} component={Profile}></Route>
           <Route path ={"/book"} component={Book}></Route>
           <Route path ={"/search"} component={SearchFlight}></Route>
           <Route path ={"/Error"} component={Error}></Route>
           {/* <Route path ={"/reserve"} component={ReserveFlight}></Route> */}
           <Route path ={"/home"} component={Home}></Route>
           <Route path ={"/admin/allFlights"} component={ViewAllFlights}></Route>
           <Route path='/admin/createFlight' component={CreateFlight}></Route>
           <Route path='/admin/editFlight/:id' component={EditFlight} />
           <Route path ={"/admin/search"} component={Search}/>
           {/* <Route path ={"/reserveDept"} component={deptReserveFlight}/>
           <Route path ={"/reserveRet"} component={retReserveFlight}/> */}
           <Route path ={"/pay"} component={Payment}/>
           <Route path ={"/reserveSeats"} component={bothSeats}/>
           <Route path ={"/editResFront"} component={editRes}/>
           
         </Router> 
         </ThemeProvider>

         );
  }

export default App;
