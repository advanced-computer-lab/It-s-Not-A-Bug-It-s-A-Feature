import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router';
//import allFlights from './components/AllFlights';
//import editFlight from './components/editFlight';
import createFlight from './components/createFlight';
// import axios from 'axios';


function App() {
  return(
         <Router>
           
             <div>
           {createFlight()}
           </div>
         
         </Router> 
         );
}

export default App;


  {/*<Router>
           <Routes>
           <Route exact path='/' ><createFlight /></Route>
         </Routes>
         </Router> 
    <Route exact path='/' component={allFlights} />
       <Route path='/admin/allFlights' component={allFlights} />  
  <Route path='/admin/editFlight' component={editFlight} /> */}