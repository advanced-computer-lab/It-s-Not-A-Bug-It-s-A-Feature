import React from 'react';
import ReactDOM from 'react-dom';
import "./assets/scss/material-kit-react.scss?v=1.10.0";
import App from './App';
import reportWebVitals from './reportWebVitals';
//import {provider} from 'react-redux';
//import {createStore , applyMiddleware , componse} from 'redux';
//import thunk from 'redux-thunk';

// we need to set redux , we need to create const store

// const store = createStore();


import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

