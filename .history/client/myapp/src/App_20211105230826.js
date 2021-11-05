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
      <Routes>
      <div>
        <Route path='/admin/editFlight/:id' component={editFlight} />
        <label>hiii</label>
      </div>
      </Routes>
      <div>hi 22</div>
    </Router>
  );
}

export default App;
