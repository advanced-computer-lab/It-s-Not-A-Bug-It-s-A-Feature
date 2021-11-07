import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';


import {useState, useEffect} from 'react';
import axios from 'axios';
import { validateDateRange } from '@mui/lab/internal/pickers/date-utils';



export default function CreateFlight() {
  const [flightData, setFlight] =useState({
      flightNo:"",
      economySeats:"",businessSeats:"",departureAirport:"",arrivalAirport:"",departureTerminal:"",arrivalTerminal:"",
      departureDate:"",arrivalDate:""
    });
    const [flightError, setFlightError] =useState({
      flightNo:false,
      economySeats:false,businessSeats:false,departureAirport:false,arrivalAirport:false,departureTerminal:false,arrivalTerminal:false,
      departureDate:false,arrivalDate:false
    });
    const [errorMessage, setErrorMessage] =useState({
      flightNo:"",
      economySeats:"",businessSeats:"",departureAirport:"",arrivalAirport:"",departureTerminal:"",arrivalTerminal:"",
      departureDate:"",arrivalDate:""
    });
    
    function validateData(){
      if(!(flightError.flightNo|| flightError.economySeats|| flightError.businessSeats ||flightError.departureAirport ||flightError.arrivalAirport ||
        flightError.departureTerminal ||flightError.arrivalTerminal ||
        flightError.departureDate ||flightError.arrivalDate)){
          if(flightData.flightNo==''){
          setFlightError((prevState => {return {...prevState,["flightNo"]: true};}));
          setErrorMessage((prevState => {return {...prevState,["flightNo"]: 'This field is requiered'};}));return false;}
        }
        else return false;
        return true;
    }
    
     const onSubmit = (e) => { 
      e.preventDefault();
      if(validateData())
  
  
      axios.post('http://localhost:8000/admin/createFlight/' , flightData)
        .then(res => alert('Flight Added Successfuly'), )
        .catch(
          setFlightError((prevState => {return {...prevState,["flightNo"]: true};})),
          setErrorMessage((prevState => {return {...prevState,["flightNo"]: 'This ID is Taked please choose another one'};}))
        );
  
      
      };
  
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {myAppBar()}
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Create Flight
            </Typography>
            <React.Fragment>
            
                <React.Fragment>
                  {DataForm(flightData,setFlight,flightError,setFlightError,errorMessage,setErrorMessage)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
  
                    <Button
                      variant="contained"
                      onClick={(e) => {onSubmit(e);
                      }}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Create
                    </Button>
                  </Box>
                </React.Fragment>
              
            </React.Fragment>
          </Paper>
          <Copyright />
        </Container>
      </ThemeProvider>
    )
  
  
}



function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        overReact
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function myAppBar(){
  return(
    <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            overReact
          </Typography>
        </Toolbar>
      </AppBar>
  )
}



const theme = createTheme();





 function DataForm( d,setData,error,setError,helperText,setHelperText) {
  
  
  return (
    <React.Fragment>     
      <Grid container spacing={4}>
        <Grid item xs={12} >
          <TextField
            required
            id="flightNo"
            name="flightNo"
            label="Flight Number"
            fullWidth
            variant="standard"
            value={d.flightNo}
            error={error.flightNo}
            helperText={helperText.flightNo}
            onChange={(event) =>  {
              const {name, value} = event.target;
              if(!(value!='' && Number(value))){setError((prevState => {return {...prevState,[name]: true};}));
                if(!Number(value))setHelperText((prevState => {return {...prevState,[name]: 'Enter a number'};}));
                if(value=='')setHelperText((prevState => {return {...prevState,[name]: 'This field is requiered'};}));
                setData((prevState => {return {...prevState,[name]: ''};}));
            }
              else{setError((prevState => {return {...prevState,[name]: false};}));
              setHelperText((prevState => {return {...prevState,[name]: ''};}));
              setData((prevState => {return {...prevState,[name]: value};}));}
          }}
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="economySeats"
            name="economySeats"
            label="Number of Economy Seats"
            fullWidth
            variant="standard"
            value={d.economySeats}
            error={error.economySeats}
            onChange={(event) =>  {
              const {name, value} = event.target;
              if(value!='' && Number(value))setError((prevState => {return {...prevState,[name]: false};}));
              else setError((prevState => {return {...prevState,[name]: true};}));
              setData((prevState => {
                  return {
                      ...prevState,
                      [name]: value
                  };
              }));
          }}
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="businessSeats"
            name="businessSeats"
            label="Number of Business Seats"
            fullWidth
            variant="standard"
            value={d.businessSeats}
            error={error.businessSeats}
            onChange={(event) =>  {
              const {name, value} = event.target;
              if(value!='' && Number(value))setError((prevState => {return {...prevState,[name]: false};}));
              else setError((prevState => {return {...prevState,[name]: true};}));
              setData((prevState => {
                  return {
                      ...prevState,
                      [name]: value
                  };
              }));
          }}
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="departureAirport"
            name="departureAirport"
            label="Departure Airport"
            fullWidth
            variant="standard"
            value={d.departureAirport}
            error={error.departureAirport}
            onChange={(event) =>  {
              const {name, value} = event.target;
              if(value!='')setError((prevState => {return {...prevState,[name]: false};}));
              else setError((prevState => {return {...prevState,[name]: true};}));
              setData((prevState => {
                  return {
                      ...prevState,
                      [name]: value
                  };
              }));
          }}
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="arrivalAirport"
            name="arrivalAirport"
            label="Arrival Airport"
            fullWidth
            variant="standard"
            value={d.arrivalAirport}
            error={error.arrivalAirport}
            onChange={(event) =>  {
              const {name, value} = event.target;
              if(value!='')setError((prevState => {return {...prevState,[name]: false};}));
              else setError((prevState => {return {...prevState,[name]: true};}));
              setData((prevState => {
                  return {
                      ...prevState,
                      [name]: value
                  };
              }));
          }}
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="departureTerminal"
            name="departureTerminal"
            label="Departure Terminal"
            fullWidth
            variant="standard"
            value={d.departureTerminal}
            error={error.departureTerminal}
            onChange={(event) =>  {
              const {name, value} = event.target;
              if(value!='')setError((prevState => {return {...prevState,[name]: false};}));
              else setError((prevState => {return {...prevState,[name]: true};}));
              setData((prevState => {
                  return {
                      ...prevState,
                      [name]: value
                  };
              }));
          }}
           
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="arrivalTerminal"
            name="arrivalTerminal"
            label="Arrival Terminal"
            fullWidth
            variant="standard"
            value={d.arrivalTerminal}
            error={error.arrivalTerminal}
            onChange={(event) =>  {
              const {name, value} = event.target;
              if(value!='')setError((prevState => {return {...prevState,[name]: false};}));
              else setError((prevState => {return {...prevState,[name]: true};}));
              setData((prevState => {
                  return {
                      ...prevState,
                      [name]: value
                  };
              }));
          }}
        
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} required 
            label="Departure Date"
            fullWidth
            variant="standard" error={error.departureDate}/>}
            label="Departure Date"
            id="departureDate"
            value={d.departureDate}
            onChange={(event) =>  {
              if(event !=null)setError((prevState => {return {...prevState,["departureDate"]: false};}));
              else setError((prevState => {return {...prevState,["departureDate"]: true};}));
              
              setData((prevState => {
                  return {
                      ...prevState,
                      ["departureDate"]: event
                  };
              }));
          }}
          />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} 
            required 
            id="arrivalDate"
            name="arrivalDate"
            label="Arrival Date"
            fullWidth
            variant="standard" error={error.arrivalDate} />
          }
            id="arrivalDate"
            name="arrivalDate"
            value={d.arrivalDate}
            onChange={(event) =>  {
              if(event !=null)setError((prevState => {return {...prevState,["arrivalDate"]: false};}));
              else setError((prevState => {return {...prevState,["arrivalDate"]: true};}));
              setData((prevState => {
                  return {
                      ...prevState,
                      ["arrivalDate"]: event
                  };
              }));
          }}
            
          />
          </LocalizationProvider>
        </Grid>
       
      
      </Grid>
    </React.Fragment>
  );
}

