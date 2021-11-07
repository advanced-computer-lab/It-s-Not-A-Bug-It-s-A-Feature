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


export default function CreateFlight() {
  const [flightData, setFlight] =useState({
      flightNo:"",
      eSeatsNo:"",bSeatsNo:"",departureAirport:"",arrivalAirport:"",departureTerminal:"",arrivalTerminal:"",
      departureDate:"",arrivalDate:""
    });
   
    
     const handleNext = () => { 
       console.log(flightData);
       console.log("Handle Next");
      
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
                  {DataForm(flightData,setFlight)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
  
                    <Button
                      variant="contained"
                      onClick={(e) => {handleNext(e);
                      console.log("onClick");
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

// function Layout() {
//   const [flightData, setFlight] =useState({
//     flightNo:null,
//     eSeatsNo:null,bSeatsNo:null,departureAirport:null,arrivalAirport:null,departureTerminal:null,arrivalTerminal:null,
//     departureDate:null,arrivalDate:null
//   });
 
  
//    const handleNext = () => { 
//     // console.log(flightData);
//     // console.log(f.flightNo
//     //   //,eSeatsNo,bSeatsNo,departureAirport,arrivalAirport,departureTerminal,arrivalTerminal,departureDate,arrivalDate
//     //   );
//     };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       {myAppBar()}
//       <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
//         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
//           <Typography component="h1" variant="h4" align="center">
//             Create Flight
//           </Typography>
//           <React.Fragment>
          
//               <React.Fragment>
//                 {DataForm(flightData,setFlight)}
//                 <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

//                   <Button
//                     variant="contained"
//                     onClick={handleNext()}
//                     sx={{ mt: 3, ml: 1 }}
//                   >
//                     Create
//                   </Button>
//                 </Box>
//               </React.Fragment>
            
//           </React.Fragment>
//         </Paper>
//         <Copyright />
//       </Container>
//     </ThemeProvider>
//   );
// }




function DataForm( d,setData) {
  
  // const [flightNo, setflightNo] = useState(null);
  // const [eSeatsNo, setESeatsNo] = useState(null);
  // const [bSeatsNo, setBSeatsNo] = useState(null);
  // const [departureAirport, setDepartureAirport] = React.useState(null);
  // const [arrivalAirport, setArrivalAirport] = React.useState(null);
  // const [departureTerminal, setDepartureTerminal] = React.useState(null);
  // const [arrivalTerminal, setArrivalTerminal] = React.useState(null);
  // const [departureDate, setDepartureDate] = React.useState(null);
  // const [arrivalDate, setArrivalDate] = React.useState(null);

  

 
  
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
            onChange={(event) =>  {
              const {name, value} = event.target;
              setData((prevState => {
                  console.log({
                      ...prevState,
                      [name]: value
                  });
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
            id="economySeats"
            name="eSeatsNo"
            label="Number of Economy Seats"
            fullWidth
            variant="standard"
            value={d.eSeatsNo}
            onChange={(event) =>  {
              const {name, value} = event.target;
              setData((prevState => {
                  console.log({
                      ...prevState,
                      [name]: value
                  });
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
            id="bSeatsNo"
            name="bSeatsNo"
            label="Number of Business Seats"
            fullWidth
            variant="standard"
            value={d.bSeatsNo}
            onChange={(event) =>  {
              const {name, value} = event.target;
              setData((prevState => {
                  console.log({
                      ...prevState,
                      [name]: value
                  });
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
            onChange={(event) =>  {
              const {name, value} = event.target;
              setData((prevState => {
                  console.log({
                      ...prevState,
                      [name]: value
                  });
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
            onChange={(event) =>  {
              const {name, value} = event.target;
              setData((prevState => {
                  console.log({
                      ...prevState,
                      [name]: value
                  });
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
            onChange={(event) =>  {
              const {name, value} = event.target;
              setData((prevState => {
                  console.log({
                      ...prevState,
                      [name]: value
                  });
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
            onChange={(event) =>  {
              const {name, value} = event.target;
              setData((prevState => {
                  console.log({
                      ...prevState,
                      [name]: value
                  });
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
            variant="standard" />}
            label="Departure Date"
            id="departureDate"
            value={d.departureDate}
            onChange={(event) =>  {
              setData((prevState => {
                  console.log({
                      ...prevState,
                      ["departureDate"]: event
                  });
                  return {
                      ...prevState,
                      ["departureDate"]: event
                  };
              }));
          }}
            // onChange={(newValue) => {
            //   setData({[newValue.target.name]:newValue.target.value});
            // }}
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
            variant="standard" />
          }
            id="arrivalDate"
            name="arrivalDate"
            value={d.arrivalDate}
            onChange={(event) =>  {
              setData((prevState => {
                  console.log({
                      ...prevState,
                      ["arrivalDate"]: event
                  });
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
