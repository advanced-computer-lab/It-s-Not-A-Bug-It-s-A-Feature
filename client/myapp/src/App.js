import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import axios from 'axios';
import {useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';


function App() {
 
  const[list, setList]= useState([]); 

 useEffect(()=>{
    
  axios.get('http://localhost:8000/Admin/allFlights')
  .then(res=> {setList(res.data);console.log(res)}).catch(err=>console.log(err))
 },[]);

   return (
     list.map(a=>{return (<div><label>{a.flightNo}</label><br/></div>)})
     );
   };
 export default App;
