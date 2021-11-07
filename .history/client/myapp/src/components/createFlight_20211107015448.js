import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';

export default function createFlight() {
  // const[rows, setRows]= useState([]); 
  // useEffect(()=>{
  //     axios.get('http://localhost:8000/Admin//createFlight')
  //   .then(res=> {setRows(res.data);console.log(res)}).catch(err=>console.log(err))
    
  //  },[]);

  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
    {containerData()}
    </div>
  );
}

function containerData(){
  return(
  <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField error
          id="outlined-error"
          label="Error"
          defaultValue="Flight Number" variant="outlined" />
      
    </Box>
  );
}
