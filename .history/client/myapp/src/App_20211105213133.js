import React, { Component } from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import editFlight from './components/editFlight';
// import axios from 'axios';


function App() {
  return(
    <Router>
        <div>
         <label> hi </label>
        <Route path='/admin/editFlight' component={editFlight} />
            
        </div>
      </Router>  
  );
}

export default App;
