import React, { Component } from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { useParams } from "react-router";
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/core/styles';
// import DeleteIcon from '@material-ui/core/Button'
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';


// export default function EditFlight() {
//   const[list, setList]= useState([]); 
//   const { id } = useParams();

//  useEffect(()=>{
    
//   axios.get('http://localhost:8000/admin/editFlight/' + id)
//   .then(res=> {setList(res.data);console.log(res)}).catch(err=>console.log(err))
//  },[]);



//  return (
//      list.map(a=>{return (<div><label>{a.flightNo}</label><br/></div>)})
//      );
// }

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
}
export default class EditFlight extends Component {

    constructor(props) {
        super(props);
    
        this.onChangeFlightNo = this.onChangeFlightNo.bind(this);
        this.onChangeDeptDate = this.onChangeDeptDate.bind(this);
        this.onChangeArrDate = this.onChangeArrDate.bind(this);
        this.onChangeEconSeats= this.onChangeEconSeats.bind(this);
        this.onChangeBusinessSeats= this.onChangeBusinessSeats.bind(this);
        this.onChangeArrAirport = this.onChangeArrAirport.bind(this);
        this.onChangeDeptAirport = this.onChangeDeptAirport.bind(this);
        this.onChangeDeptTerminal.No = this.onChangeDeptTerminal.bind(this);
        this.onChangeArrTerminal = this.onChangeArrTerminal.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);
    
        // var self = this;
        // var f = axios.get('http://localhost:8000/admin/editFlight/' + this.props.match.params.id)
        //   .then(res => console.log(res.data), this.setState({events: res.data}));
        // this.state = {
          // flightNo: 0,
          // departureDate : new Date(2018, 11, 24, 10, 33, 30, 0),
          // arrivalDate : new Date(2018, 11, 25, 10, 33, 30, 0),
          // economySeats : 4,
          // businessSeats : 2,
          // arrivalAirport : 'e',
          // departureAirport : 'e',
          // departureTerminal : 'e',
          // arrivalTerminal : 'e'
          
        // }
          // var self = this;
          this.state = {
            flightNo: 0,
            departureDate : new Date(2018, 11, 24, 10, 33, 30, 0),
            arrivalDate : new Date(2018, 11, 25, 10, 33, 30, 0),
            economySeats : 4,
            businessSeats : 2,
            arrivalAirport : 'e',
            departureAirport : 'e',
            departureTerminal : 'e',
            arrivalTerminal : 'e'
          }
          //this one works
          var self = this;
          axios.get('http://localhost:8000/admin/editFlight/' + this.props.match.params.id)
          .then(function (res) {
            console.log(res.data.flightNo);
            self.setState ({
              flightNo: res.data.flightNo,
              departureDate : res.data.departureDate,
              arrivalDate :res.data.arrivalDate,
              economySeats :res.data.economySeats,
              businessSeats :res.data.businessSeats,
              arrivalAirport : res.data.arrivalAirport,
              departureAirport : res.data.departureAirport,
              departureTerminal : res.data.departureTerminal,
              arrivalTerminal : res.data.arrivalTerminal
            });
            // this.render();

          })
          .catch(function (error) {
            console.log(error);
          });


      //     axios.get('http://localhost:8000/admin/editFlight/' + this.props.match.params.id)
      // .then(res => {
      //   const persons = res.data;
      //   this.setState({ persons });
      // })

          
        


        
      }

      // componentDidUpdate(props, state){
        
      // }
      onChangeFlightNo(e) {
        this.setState({
          flightNo: e.target.value
        })
      }
      onChangeDeptDate(e) {
        this.setState({
          // departureDate: e.target.value
          departureDate: e
        })
      }
      onChangeArrDate(e) {
        this.setState({
          arrivalDate: e
        })
      }
      onChangeEconSeats(e) {
        this.setState({
          economySeats: e.target.value
        })
      }
      onChangeBusinessSeats(e) {
        this.setState({
          businessSeats: e.target.value
        })
      }
      onChangeArrAirport(e) {
        this.setState({
          arrivalAirport: e.target.value
        })
      }
      onChangeDeptAirport(e) {
        this.setState({
          departureAirport: e.target.value
        })
      }
      onChangeArrTerminal(e) {
        this.setState({
          arrivalTerminal: e.target.value
        })
      }
      onChangeDeptTerminal(e) {
        this.setState({
          departureTerminal: e.target.value
        })
      }
      
      
      onSubmit(e) {
        e.preventDefault();
    
        const flight = {
          flightNo: this.state.flightNo,
          departureDate: this.state.departureDate,
          arrivalDate: this.state.arrivalDate,
          economySeats: this.state.economySeats,
          businessSeats: this.state.businessSeats,
          arrivalAirport: this.state.arrivalAirport,
          departureAirport: this.state.departureAirport,
          departureTerminal: this.state.departureTerminal,
          arrivalTerminal : this.state.arrivalTerminal
        
        }
    
        console.log(flight);
    
        axios.post('http://localhost:8000/admin/editFlight/' + this.props.match.params.id, flight)
          .then(res => console.log(res.data));
    
        window.location = '/allflights';
      }
      

    render() {
      if (this.state.flightNo === 0)
    return(
      <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
    )
    else return(

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
              <React.Fragment>
      
      <Grid container spacing={4}>
        <Grid item xs={12} >
        <TextField
          required
          id="FlightNo"
          fullWidth
          variant="standard"
          label="Flight Number"
          type="number"
          defaultValue= {this.state.flightNo}
          onChange={this.onChangeFlightNo}
          InputLabelProps={{
            shrink: true,
          }}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          required
          id="filled-required"
          fullWidth
          variant="standard"
          label="Number of Economy Seats"
          type="number"
          defaultValue= {this.state.economySeats}
          onChange={this.onChangeEconSeats}
          InputLabelProps={{
            shrink: true,
          }}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          required
          id="filled-required"
          fullWidth
          variant="standard"
          label="Number of Business Seats"
          type="number"
          defaultValue= {this.state.businessSeats}
          onChange={this.onChangeBusinessSeats}
          InputLabelProps={{
            shrink: true,
          }}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          required
          id="filled-required"
          fullWidth
          variant="standard"
          label="dept ariport"
          defaultValue= {this.state.departureAirport}
          onChange={this.onChangeDeptAirport}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          required
          id="filled-required"
          fullWidth
          variant="standard"
          label="arrival ariport"
          defaultValue= {this.state.arrivalAirport}
          onChange={this.onChangeArrAirport}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          required
          id="filled-required"
          fullWidth
          variant="standard"
          label="Departure Terminal"
          defaultValue= {this.state.departureTerminal}
          onChange={this.onChangeDeptTerminal}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          required
          id="filled-required"
          fullWidth
          variant="standard"
          label="Arrival Terminal"
          defaultValue= {this.state.arrivalTerminal}
          onChange={this.onChangeArrTerminal}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
            renderInput={(props) => <TextField {...props} 
            required 
            id="departureDate"
            label="Departure date & time"
            fullWidth
            variant="standard" />}
            value={this.state.departureDate}
            onChange={(newValue) => {
              this.onChangeDeptDate(newValue);
            }}            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
            renderInput={(props) => <TextField {...props} 
            required 
            id="arrivalDate"
            label="Arrival date & time"
            fullWidth
            variant="standard" />}
            value={this.state.arrivalDate}
            onChange={(newValue) => {
              this.onChangeArrDate(newValue);
            }}          />
          </LocalizationProvider>
        </Grid>
       
      
      </Grid>
    </React.Fragment>                
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {/* <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Create
                  </Button> */}
                  <Button variant="contained" type="submit" onClick={this.onSubmit} sx={{ mt: 3, ml: 1 }}> Save </Button>
      
                </Box>
              </React.Fragment>
            
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
    )

//////////////////////////////////////////////////////////////////////
    // if (this.state.flightNo === 0)
    // return(
    //   <Box sx={{ display: 'flex' }}>
    //   <CircularProgress />
    // </Box>
    // )
    // else
    
    //       return (

    // <div>
            
    //   <form onSubmit={this.onSubmit}>
    //     <Box
    //   component="form"
    //   sx={{
    //     '& .MuiTextField-root': { m: 1, width: '25ch' },
    //   }}
    //   noValidate
    //   autoComplete="off"
    // >
    //   <div>
    //   <TextField
    //       required
    //       id="FlightNo"
    //       fullWidth
    //       variant="standard"
    //       label="Flight Number"
    //       type="number"
    //       defaultValue= {this.state.flightNo}
    //       onChange={this.onChangeFlightNo}
    //       InputLabelProps={{
    //         shrink: true,
    //       }}
    //     />
    //     <TextField
    //       required
    //       id="filled-required"
    //       fullWidth
    //       variant="standard"
    //       label="Number of Economy Seats"
    //       type="number"
    //       defaultValue= {this.state.economySeats}
    //       onChange={this.onChangeEconSeats}
    //       InputLabelProps={{
    //         shrink: true,
    //       }}
    //     />
    //     <TextField
    //       required
    //       id="filled-required"
    //       fullWidth
    //       variant="standard"
    //       label="Number of Business Seats"
    //       type="number"
    //       defaultValue= {this.state.businessSeats}
    //       onChange={this.onChangeBusinessSeats}
    //       InputLabelProps={{
    //         shrink: true,
    //       }}
    //     />
    //     <TextField
    //       required
    //       id="filled-required"
    //       fullWidth
    //       variant="standard"
    //       label="dept ariport"
    //       defaultValue= {this.state.departureAirport}
    //       onChange={this.onChangeDeptAirport}
    //     />
    //     <TextField
    //       required
    //       id="filled-required"
    //       fullWidth
    //       variant="standard"
    //       label="arrival ariport"
    //       defaultValue= {this.state.arrivalAirport}
    //       onChange={this.onChangeArrAirport}
    //     />
    //     <TextField
    //       required
    //       id="filled-required"
    //       fullWidth
    //       variant="standard"
    //       label="Departure Terminal"
    //       defaultValue= {this.state.departureTerminal}
    //       onChange={this.onChangeDeptTerminal}
    //     />
    //     <TextField
    //       required
    //       id="filled-required"
    //       fullWidth
    //       variant="standard"
    //       label="Arrival Terminal"
    //       defaultValue= {this.state.arrivalTerminal}
    //       onChange={this.onChangeArrTerminal}
    //     />
        
    //     </div>
    //     <div>
    //     <LocalizationProvider dateAdapter={AdapterDateFns}>
    //     <DateTimePicker
    //         renderInput={(props) => <TextField {...props} 
    //         required 
    //         id="departureDate"
    //         label="Departure date & time"
    //         fullWidth
    //         variant="standard" />}
    //         value={this.state.departureDate}
    //         onChange={(newValue) => {
    //           this.onChangeDeptDate(newValue);
    //         }}            />
    //     </LocalizationProvider>
    //     </div>
    //     <div>
    //     <LocalizationProvider dateAdapter={AdapterDateFns}>
    //     <DateTimePicker
    //         renderInput={(props) => <TextField {...props} 
    //         required 
    //         id="arrivalDate"
    //         label="Arrival date & time"
    //         fullWidth
    //         variant="standard" />}
    //         value={this.state.arrivalDate}
    //         onChange={(newValue) => {
    //           this.onChangeArrDate(newValue);
    //         }}          />
    //       </LocalizationProvider>
    //     </div>
    //     </Box>
        
    //     <Button variant="contained" type="submit" onClick={this.onSubmit} sx={{ mt: 3, ml: 1 }}> Save </Button>
        
    //   </form>
      
    // </div>
    //     )
    }
    
}
