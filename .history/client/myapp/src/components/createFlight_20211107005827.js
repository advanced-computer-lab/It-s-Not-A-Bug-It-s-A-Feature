import React from "react";
import axios from 'axios';
import {useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';

export default function createFlight() {
  const[rows, setRows]= useState([]); 
  useEffect(()=>{
      axios.get('http://localhost:8000/Admin//createFlight')
    .then(res=> {setRows(res.data);console.log(res)}).catch(err=>console.log(err))
    
   },[]);

  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
    
     
    </div>
  );
}
