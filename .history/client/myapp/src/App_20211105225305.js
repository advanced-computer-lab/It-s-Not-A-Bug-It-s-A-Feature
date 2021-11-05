import React, { Component } from 'react';
import { Routes } from 'react-router';
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Route, Routes } from "react-router-dom";
import editFlight from './components/editFlight';
import testView from './components/testView';

function App() {
  return (
    <Router>
      
      <div>
      
      <br/>
      <Routes>
        <Route path='/admin/editFlight/' component={editFlight} />
        </Routes>
        <label>hiii</label>
      </div>
      
    </Router>
  );
}

export default App;
