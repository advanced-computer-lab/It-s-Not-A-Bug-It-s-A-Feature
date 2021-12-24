import React from "react";
// @material-ui/core components

import classNames from "classnames";

import { makeStyles } from "@material-ui/styles";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "./../../components/Header/Header.js";
import HeaderLinks from "./../../components/Header/HeaderLinks.js";
import CustomDropdown from "./../../components/CustomDropdown/CustomDropdown.js";
import Footer from "./../../components/Footer/Footer.js";
import GridContainer from "./../../components/Grid/GridContainer.js";
import GridItem from "./../../components/Grid/GridItem.js";
import NavPills from "./../../components/NavPills/NavPills.js";
import Button from "./../../components/CustomButtons/Button.js";
import Card from "./../../components/Card/Card.js";
import CardContent from '@mui/material/CardContent';
import Flight from "./../../components/Flight/Flight.js";
import Typography from '@mui/material/Typography';
import AllSeats from "../../components/Flight/AllSeats.js";
import SnackbarContent from "./../../components/Snackbar/SnackbarContent.js";
import Check from "@material-ui/icons/Check";
import Grid from "@material-ui/core/Grid";

import SelectSeats from "../../components/Flight/SelectSeats.js";
import ColorCode from "../../components/Flight/colorCodeSeats.js";
import Box from '@material-ui/core/Box';
import { Link } from "react-router-dom";


import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';


import ReservationCard from "./../../components/Reservation/Reservation.js";

import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

// import AirplaneTicketIcon from '@material-ui/icons/AirplaneTicket';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import CheckIcon from '@mui/icons-material/Check';
import CustomLinearProgress from "./../../components/CustomLinearProgress/CustomLinearProgress.js";

import {
    BrowserRouter as Router,
    Switch,
    useLocation
} from "react-router-dom";

import styles from "./../../assets/jss/material-kit-react/views/loginPage.js";

import image from "./../../assets/img/cloud.jpg";
import { typography } from "@mui/system";
const useStyles = makeStyles(styles);


export default function Reservation(props) {
    const location = useLocation();
    let history = useHistory();

    const key = location.state;
    const classes = useStyles();
    const { ...rest } = props;
    console.log(location);
    const type =key.type;
    var traveller = key.res.reservation.adultsNo+key.res.reservation.childrenNo;
    traveller= traveller==1? " "+1+" Traveller":" "+traveller+" Traveller";
  // const reservation =key.res;
  const deptFlight = key.res.deptFlight;
    const tabName = type=="Dept"?"Departure Flight":"Return Flight";
    const myIcon=type==="Dept"?FlightTakeoffIcon:FlightLandIcon;
    const [reservedSeats, setReservedSeats] = useState([]);
    const [Flight, setFlight] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

   // const [deptDate, setdeptDate] = useState(null);
   const arrDate = new Date(key.res.deptFlight.departureDate);
    const [value, setValue] = React.useState( [null,arrDate]);
     
     console.log(arrDate);
    const [cabin, setCabin] = useState("Economy");
    const today = new Date();

    Date.prototype.addHours = function(h) {
        this.setTime(this.getTime() + (h*60*60*1000));
        return this;
      }
    const onSubmit = () => {
        axios.get('http://localhost:8000/user/searchFlights', {
      params:
      {
        arrivalAirport: key.arrivalAirport,
        arrivalDate: (new Date(value[1]).addHours(4)).toISOString(),
        departureAirport: key.departureAirport,
        cabin: key.type,
        adultsNo: key.adultsNo,
        childrenNo: key.childrenNo
      }
    })
      .then(res => {
        // store data in a variable to be later used
        // setdepartFlights( res.data);
        setDepart(res.data);
        console.log(depart)
        console.log("di el depart flightsss")

      }).catch(err => console.log(err))

 
                history.push({
                  pathname: "/search",
                  state: {
                    arrivalAirport: arrival,
                    departureDate: departureDate,
                    departureAirport: (new Date(value[0]).addHours(4)).toISOString(),
                    arrivalDate: (new Date(value[1]).addHours(4)).toISOString(),
                    adultsNo: countAdults,
                    childrenNo: countChild,
                    type: cabin,
                    count: countPassengers
                  }
    
                });
                //  else
                //  alert("Sever is not working");
              
      };
    return (

        <div>
            <Header
                absolute
                brand="OverReact"
                fixed={true}
                rightLinks={<HeaderLinks isLogged={true} />}
                {...rest}
            />
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",

                    backgroundSize: "cover",
                    backgroundPosition: "top center",

                }}
            >

                <div className={classes.container}>
                    <GridContainer justify="center">
                        <Card>
                            <CardContent>
                            <Grid container spacing={1} direction="row"  justify="center"  alignItems="center" >
                        <Grid item xs textAlign= 'center'>
                                <Typography textAlign= 'center'>
                                   Leaving From
                                </Typography>
                                <Typography textAlign= 'center'>
                                    {deptFlight.departureAirport}
                                </Typography>
                            </Grid>
                            <Grid item xs>
                            <Typography textAlign= 'center'>
                                   Going To
                                </Typography>
                                <Typography textAlign= 'center'>
                                    {deptFlight.arrivalAirport}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                       <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDateRangePicker
                                        disabledEnd
                                        minDate={today}
                                        maxDate={arrDate}
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue([newValue[0],arrDate]);
                                                console.log(value);
                                                console.log((new Date(value[0]).addHours(4)).toISOString());
                                            }}
                                            renderInput={(startProps, endProps) => (
                                                <React.Fragment>
                                                <TextField {...startProps} required
                                                    label="Check In"
                                                    fullWidth
                                                    variant="standard"
                                                    />
                                                <Box sx={{ mx: 2 }}> to </Box>
                                                <TextField {...endProps} 
                                                disabled
                                                    label="Check Out"
                                                    fullWidth
                                                    variant="standard"
                                                    />
                                                </React.Fragment>
                                            )}
                                            />
                                        
                                        </LocalizationProvider>

                            </Grid>
                            <Grid item xs>
                                <Typography textAlign= 'center'>
                                {traveller}
                                </Typography>
                               
                            </Grid>
                            <Grid item xs textAlign= 'center'>
                            <CustomDropdown
                                noLiPadding
                                buttonText={cabin}
                                buttonProps={{
                                    className: classes.navLink,
                                    color: "transparent",

                                }}
                                            dropdownList={[
                                    <Link className={classes.dropdownLink}
                                    onClick={(e) => { setCabin("Economy"); }}
                                    >
                                    <h4>  Economy </h4>
                                    </Link>,
                                    <a
                                    className={classes.dropdownLink}
                                    onClick={(e) => { setCabin("Business"); }}
                                    >
                                    <h4>   Business</h4>

                                    </a>,
                                ]}
                                />
                            </Grid>
                            <Grid item xs textAlign= 'center'>
                            <Button

                                color="warning"
                                // color="transparent"
                                size="lg"
                                id="demo-customized-button"
                                aria-controls="demo-customized-menu"
                                aria-haspopup="true"
                                variant="contained"
                                disableElevation
                                onClick={(e) => {
                                onSubmit(e);
                                }}
                                >Search</Button>
                            </Grid>
                        </Grid>
                            </CardContent>
                        </Card>
                       
                        <GridItem xs={12} sm={12}>
                            <NavPills
                                alignCenter
                                color="primary"
                                tabs={[
                                    {
                                        tabButton: tabName,
                                        tabIcon: myIcon,
                                        tabContent: (
                                            <GridContainer justify="center">
                                                <GridItem xs={12} sm={12}>
                                                    {loading ? <CustomLinearProgress color="info" /> :
                                                        <Box display="flex" flex-direction="row">
                                                            <GridItem xs={12} sm={12}>
                                                               
                                                            </GridItem>
                                                        </Box>
                                                    }

                                                </GridItem>
                                                
                                                <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                   
                                                </GridItem>
                                               
                                            </GridContainer>
                                        ),
                                    },
                                    {
                                        tabButton: " Choose Seats",
                                        tabIcon: AirlineSeatReclineExtraIcon,
                                        tabContent: (
                                            <GridContainer justify="center">
                                               
                                                <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                   

                                                </GridItem>
                                            </GridContainer>
                                        ),
                                    },

                                    {
                                        tabButton: " Confirm Flight",
                                        tabIcon: CheckIcon,
                                        tabContent: (
                                            <div>
                                            
                                                <GridContainer justify="center">
                                                    </GridContainer>
                                            </div>
                                        ),
                                    },
                                ]}
                            />
                        </GridItem>
                    </GridContainer>

                </div>
            </div>

            <Footer />
        </div>
    );
}
