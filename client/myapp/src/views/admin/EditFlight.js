import React, { Component } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import { fabClasses } from '@mui/material';

const matchList =document.getElementById("match-List");
const matchList2 =document.getElementById("match-List2");
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

// function Checkout() {


//   const handleNext = () => {

//   };
// }
export default class EditFlight extends Component {

  constructor(props) {
    super(props);

    this.onChangeFlightNo = this.onChangeFlightNo.bind(this);
    this.onChangeDeptDate = this.onChangeDeptDate.bind(this);
    this.onChangeArrDate = this.onChangeArrDate.bind(this);
    this.onChangeEconSeats = this.onChangeEconSeats.bind(this);
    this.onChangeBusinessSeats = this.onChangeBusinessSeats.bind(this);
    this.onChangeArrAirport = this.onChangeArrAirport.bind(this);
    this.onChangeDeptAirport = this.onChangeDeptAirport.bind(this);
    this.onChangeDeptTerminal = this.onChangeDeptTerminal.bind(this);
    this.onChangeArrTerminal = this.onChangeArrTerminal.bind(this);

    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      flightNo: 0,
      departureDate: new Date(2000, 1, 1, 1, 33, 30, 0),
      arrivalDate: new Date(2000, 1, 1, 1, 33, 30, 0),
      economySeats: 0,
      businessSeats: 0,
      arrivalAirport: '',
      departureAirport: '',
      departureTerminal: '',
      arrivalTerminal: '',
      flightError: {
        flightNo: false, economySeats: false, businessSeats: false, departureAirport: false,
        arrivalAirport: false, departureTerminal: false, arrivalTerminal: false,
        departureDate: false, arrivalDate: false
      },
      errorMessage: {
        flightNo: "",
        economySeats: "", businessSeats: "", departureAirport: "", arrivalAirport: "",
        departureTerminal: "", arrivalTerminal: "",
        departureDate: "", arrivalDate: ""
      }
    }
    //this one works
    var self = this;
    axios.get('http://localhost:8000/admin/editFlight/' + this.props.match.params.id)
      .then(function (res) {
        console.log(res.data.flightNo);
        self.setState({
          flightNo: res.data.flightNo,
          departureDate: res.data.departureDate,
          arrivalDate: res.data.arrivalDate,
          economySeats: res.data.economySeats,
          businessSeats: res.data.businessSeats,
          arrivalAirport: res.data.arrivalAirport,
          departureAirport: res.data.departureAirport,
          departureTerminal: res.data.departureTerminal,
          arrivalTerminal: res.data.arrivalTerminal
        });
        // this.render();

      })
      .catch(function (error) {
        console.log(error);
      });





  }
   searchAirports = async searchText=>
  {
    // const allAirports = await require("..\\..\\jsonFiles\\airports.json");
    const allAirports = await require("./../../jsonFiles/airports.json");
    // console.log(result);
    let matches =allAirports.filter(airport =>{
      const regex = new RegExp("^"+searchText,'gi');
      return airport.code.match(regex)||airport.name.match(regex)||airport.country.match(regex);
    });
    console.log(matches);//the search result
    if(searchText.length===0) matches=[];
    if(matchList!=null)
      outputHtml(matches);
  }
   outputHtml = matches=>{
    if(matches.length>0){
      const html=matches.map(match=>`
      <div class= "card card-body mb-1">
        <h4>${match.name}(${match.code})
        <span class="text-primary"> ${match.country}</span> </h4>
        
      </div>`
        ).join('');
        matchList.innerHTML=html;
        console.log(html);
    }
  }
  
   searchAirports2 = async searchText=>
  {
    // const allAirports = await require("..\\..\\jsonFiles\\airports.json");
    const allAirports = await require("./../../jsonFiles/airports.json");
    // console.log(result);
    let matches =allAirports.filter(airport =>{
      const regex = new RegExp("^"+searchText,'gi');
      return airport.code.match(regex)||airport.name.match(regex)||airport.country.match(regex);
    });
    console.log(matches);//the search result
    if(searchText.length===0) matches=[];
    if(matchList2!=null)
      outputHtml2(matches);
  }
   outputHtml2 = matches=>{
    if(matches.length>0){
      const html=matches.map(match=>`
      <div class= "card card-body mb-1">
        <h4>${match.name}(${match.code})
        <span class="text-primary"> ${match.country}</span> </h4>
        
      </div>`
        ).join('');
        matchList2.innerHTML=html;
        console.log(html);
    }
  }
  
  
  onChangeFlightNo(e) {
    const { name, value } = e.target;
    if (!(value != '' && Number(value) && Number(value) >= 0)) {
      this.setState(prevState => ({
        flightError: { ...prevState.flightError, flightNo: true }
      }));
      if (Number(value) < 0)
        this.setState(prevState => ({

          errorMessage: { ...prevState.errorMessage, flightNo: "Please enter a valid positive number" }
        }));
      if (value == '')
        this.setState(prevState => ({
          errorMessage: { ...prevState.errorMessage, flightNo: "This field is required" }
        }));
    }
    else
      this.setState(prevState => ({
        flightError: { ...prevState.flightError, flightNo: false },
        errorMessage: { ...prevState.errorMessage, flightNo: "" }
      }));
    this.setState({ flightNo: e.target.value });
  }
  onChangeDeptDate(e) {
    if (e != null) {
      this.setState(prevState => ({

        flightError: { ...prevState.flightError, departureDate: false },
        errorMessage: { ...prevState.errorMessage, departureDate: "" }
      }));
    }
    else {
      this.setState(prevState => ({
        flightError: { ...prevState.flightError, departureDate: true },
        errorMessage: { ...prevState.errorMessage, departureDate: "This field is required" }
      }));
      
    }
    this.setState({
      departureDate: e
    })
  }
  onChangeArrDate(e) {
    if (e != null) {
      this.setState(prevState => ({
        flightError: { ...prevState.flightError, arrivalDate: false },
        errorMessage: { ...prevState.errorMessage, arrivalDate: "" }
      }));
    }
    else {
      this.setState(prevState => ({
        flightError: { ...prevState.flightError, arrivalDate: true },
        errorMessage: { ...prevState.errorMessage, arrivalDate: "This field is required" }
      }));
      
    }
    this.setState({
      arrivalDate: e
    })
  }
  onChangeEconSeats(e) {
    const { name, value } = e.target;
    if (!(value != '' && Number(value) && Number(value) >= 0)) {
      this.setState(prevState => ({
        flightError: { ...prevState.flightError, economySeats: true }
      }));
      if (Number(value) < 0)
        this.setState(prevState => ({
          errorMessage: { ...prevState.errorMessage, economySeats: "Please enter a valid positive number" }
        }));
      if (value == '')
        this.setState(prevState => ({
          errorMessage: { ...prevState.errorMessage, economySeats: "This field is required" }
        }));

      }else {
        this.setState(prevState => ({
          flightError: { ...prevState.flightError, economySeats: false },
          errorMessage: { ...prevState.errorMessage, economySeats: "" }
        }));
      }

      this.setState({
        economySeats: e.target.value
      })
    
  }
  onChangeBusinessSeats(e) {
    const { name, value } = e.target;
    if (!(value != '' && Number(value) && Number(value) >= 0)) {
      this.setState(prevState => ({
        flightError: { ...prevState.flightError, businessSeats: true }
      }));
      if (Number(value) < 0)
        this.setState(prevState => ({

          errorMessage: { ...prevState.errorMessage, businessSeats: "Please enter a valid positive number" }
        }));
      if (value == '')
        this.setState(prevState => ({
          errorMessage: { ...prevState.errorMessage, businessSeats: "This field is required" }
        }));
      }

      else {
        this.setState(prevState => ({
          flightError: { ...prevState.flightError, businessSeats: false },
          errorMessage: { ...prevState.errorMessage, businessSeats: "" }
        }));
      }
      this.setState({
        businessSeats: e.target.value
      });
    
  }
  onChangeArrAirport(e) {
    const { name, value } = e.target;
    if (value == '') {
      this.setState(prevState => ({
        flightError: { ...prevState.flightError, arrivalAirport: true },
        errorMessage: { ...prevState.errorMessage, arrivalAirport: "This field is required" }
      }));
    }
    else {
      this.setState(prevState => ({
        flightError: { ...prevState.flightError, arrivalAirport: false },
        errorMessage: { ...prevState.errorMessage, arrivalAirport: "" } 
      }));        
      searchAirports(value)

    }
      this.setState({
        arrivalAirport: e.target.value
      })
     
  }
  onChangeDeptAirport(e) {
    const { name, value } = e.target;
    if (value == '') {
      this.setState(prevState => ({
        flightError: { ...prevState.flightError, departureAirport: true },
        errorMessage: { ...prevState.errorMessage, departureAirport: "This field is required" }
      }));
    }
    else {
      this.setState(prevState => ({
        flightError: { ...prevState.flightError, departureAirport: false },
        errorMessage: { ...prevState.errorMessage, departureAirport: "" }
      }));      
      searchAirports(value)

    }
      this.setState({
        departureAirport: e.target.value
      })
    
  }
  onChangeArrTerminal(e) {
    const { name, value } = e.target;
    if (value == '') {
      this.setState(prevState => ({
        flightError: { ...prevState.flightError, arrivalTerminal: true },
        errorMessage: { ...prevState.errorMessage, arrivalTerminal: "This field is required" }
      }));
    }
    else {
      this.setState(prevState => ({
        flightError: { ...prevState.flightError, arrivalTerminal: false },
        errorMessage: { ...prevState.errorMessage, arrivalTerminal: "" }
      }));
    }
      this.setState({
        arrivalTerminal: e.target.value
      })
    
  }
  onChangeDeptTerminal(e) {
    const { name, value } = e.target;
    if (value == '') {
      this.setState(prevState => ({
        flightError: { ...prevState.flightError, departureTerminal: true },
        errorMessage: { ...prevState.errorMessage, departureTerminal: "This field is required" }
      }));
    }
    else {
      this.setState(prevState => ({
        flightError: { ...prevState.flightError, departureTerminal: false },
        errorMessage: { ...prevState.errorMessage, departureTerminal: "" }
      }));
    }

    this.setState({
      departureTerminal: e.target.value
    })
  }


  onSubmit(e) {
    const flightError = this.state.flightError;
    if (!(flightError.flightNo
      || flightError.economySeats || flightError.businessSeats || flightError.departureAirport
      || flightError.arrivalAirport || flightError.departureTerminal || flightError.arrivalTerminal ||
      flightError.departureDate || flightError.arrivalDate)) {

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
        arrivalTerminal: this.state.arrivalTerminal

      }

      console.log(flight);
      // var koloTmam = false;

      axios.post('http://localhost:8000/admin/editFlight/' + this.props.match.params.id, flight)
        .then(res => {console.log(res.data); window.location = '/admin/allflights';})
        // .catch(
        //   this.setState(prevState => ({
        //     flightError: { ...prevState.flightError, flightNo: true },
        //     errorMessage: { ...prevState.errorMessage, flightNo: "This Flight Number is taken please choose another one" }
        //   }))
        // );
        .catch((error) => {
              if( error.response ){
                console.log(error.response)
                console.log("here");
                return this.setState(prevState => ({
                      flightError: { ...prevState.flightError, flightNo: true },
                      errorMessage: { ...prevState.errorMessage, flightNo: "This Flight Number is taken please choose another one" }
                    }))
                // return (setFlightError((prevState => {return {...prevState,["flightNo"]: true};})),
                //  setErrorMessage((prevState => {return {...prevState,["flightNo"]: 'This Flight Number is take please choose another one'};}))
                // )
              }});
    

      // if( koloTmam)
      // window.location = '/allflights';
    }
  }


  render() {
    if (this.state.flightNo === 0)
      return (
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <Box sx={{ display: 'flex' }} >
            <CircularProgress />
          </Box>
        </div>

      )
    else return (

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
              Edit Flight #{this.state.flightNo}
            </Typography>
            <React.Fragment>

              <React.Fragment>
                {DataForm(this)}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                  <Button variant="contained" onClick={this.onSubmit} sx={{ mt: 3, ml: 1 }}> Save </Button>

                </Box>
              </React.Fragment>

            </React.Fragment>
          </Paper>
          <Copyright />
        </Container>
      </ThemeProvider>
    )


  }

}
function DataForm(self) {
  return (
    <React.Fragment>

      <Grid container spacing={4}>
        <Grid item xs={12} >
          <TextField
            required
            id="FlightNo"
            name="flightNo"
            label="Flight Number"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={self.state.flightNo}
            onChange={self.onChangeFlightNo}
            error={self.state.flightError.flightNo}
            helperText={self.state.errorMessage.flightNo}

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
            defaultValue={self.state.economySeats}
            onChange={self.onChangeEconSeats}
            error={self.state.flightError.economySeats}
            helperText={self.state.errorMessage.economySeats}
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
            defaultValue={self.state.businessSeats}
            onChange={self.onChangeBusinessSeats}
            error={self.state.flightError.businessSeats}
            helperText={self.state.errorMessage.businessSeats}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="filled-required"
            fullWidth
            variant="standard"
            label="dept ariport"
            defaultValue={self.state.departureAirport}
            onChange={self.onChangeDeptAirport}
            error={self.state.flightError.departureAirport}
            helperText={self.state.errorMessage.departureAirport}
          />
          <div id="match-List2"> </div>

        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="filled-required"
            fullWidth
            variant="standard"
            label="arrival ariport"
            defaultValue={self.state.arrivalAirport}
            onChange={self.onChangeArrAirport}
            error={self.state.flightError.arrivalAirport}
            helperText={self.state.errorMessage.arrivalAirport}
          />
          <div id="match-List"> </div>

        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="filled-required"
            fullWidth
            variant="standard"
            label="Departure Terminal"
            defaultValue={self.state.departureTerminal}
            onChange={self.onChangeDeptTerminal}
            error={self.state.flightError.departureTerminal}
            helperText={self.state.errorMessage.departureTerminal}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="filled-required"
            fullWidth
            variant="standard"
            label="Arrival Terminal"
            defaultValue={self.state.arrivalTerminal}
            onChange={self.onChangeArrTerminal}
            error={self.state.flightError.arrivalTerminal}
            helperText={self.state.errorMessage.arrivalTerminal}
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
                variant="standard" value={self.state.departureDate}
                error={self.state.flightError.departureDate}
                helperText={self.state.errorMessage.departureDate} />}
                value={self.state.departureDate}
                onChange={self.onChangeDeptDate}
             
            />
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
                variant="standard"
                error={self.state.flightError.arrivalDate}
                helperText={self.state.errorMessage.arrivalDate}
                value={self.state.arrivalDate} />}
                value={self.state.arrivalDate}
              onChange={(newValue) => {
                self.onChangeArrDate(newValue);
              }}
            />
          </LocalizationProvider>
        </Grid>


      </Grid>
    </React.Fragment>
  );
}
