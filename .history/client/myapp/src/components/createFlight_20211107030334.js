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

export default function createFlight() {
  // const[rows, setRows]= useState([]); 
  // useEffect(()=>{
  //     axios.get('http://localhost:8000/Admin//createFlight')
  //   .then(res=> {setRows(res.data);console.log(res)}).catch(err=>console.log(err))
    
  //  },[]);

  return (
    Checkout()
  );
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





const theme = createTheme();

function Checkout() {
  

  const handleNext = () => {
    
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Create Flight
          </Typography>
          <React.Fragment>
          
              <React.Fragment>
                {DataForm()}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                  <Button
                    variant="contained"
                    onClick={handleNext}
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
  );
}


function DataForm() {
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label="Date&Time picker"
          value={value}
          onChange={handleChange}
          renderInput={(params) => 
          <TextField
            required
            id="departureDate"
            name="departureDate"
            label="Departure Date"
            fullWidth
            variant="standard"/>}
          />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="arrivalDate"
            name="arrivalDate"
            label="Arrival Date"
            fullWidth
            variant="standard"
          />
        </Grid>
      
      </Grid>
    </React.Fragment>
  );
}
