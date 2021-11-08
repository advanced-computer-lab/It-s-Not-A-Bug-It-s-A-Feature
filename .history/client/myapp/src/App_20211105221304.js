import React, { Component } from 'react';
import { render } from "react-dom";
import { BrowserRouter as Routes, Route} from "react-router-dom";
// import { Route, Routes } from "react-router-dom";
import editFlight from './components/editFlight';
import axios from 'axios';


function App() {
  return(
    <Routes>
        <div>
         <label> hi </label>
         <Route path = '/' exact component={editFlight} />
         <Route path='/admin/editFlight/:id' component={editFlight} />
        </div>
      </Routes>  
      
  );
}

export default App;
