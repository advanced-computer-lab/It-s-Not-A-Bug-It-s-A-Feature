import React, { Component } from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import editFlight from './components/editFlight';
// import axios from 'axios';


function App() {
  return(
    <Route>
        <div>
         <label> hi </label>
        <Router path='/admin/editFlight' component={editFlight} />
        </div>
      </Route>  
      
  );
}

export default App;
