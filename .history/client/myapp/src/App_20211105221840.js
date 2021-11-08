import React, { Component } from 'react';
import { render } from "react-dom";
import { BrowserRouter as Routes, Route} from "react-router-dom";
// import { Route, Routes } from "react-router-dom";
import editFlight from './components/editFlight';
import axios from 'axios';


function App() {
  return(
    
        <div>
         <label> hi </label>
         <Routes>
         <Route path = '/' exact component={editFlight} />
         <Route path='/admin/editFlight/:id' component={editFlight} />
         </Routes> 
        </div>
       
      
  );
}

export default App;
