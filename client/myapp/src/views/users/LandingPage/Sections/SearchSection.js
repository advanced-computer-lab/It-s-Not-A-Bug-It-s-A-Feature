import * as React from 'react';

import Box from '@material-ui/core/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Location from '@material-ui/icons/LocationOnSharp';
import CssBaseline from '@mui/material/CssBaseline';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';


import GridItem from "./../../../../components/Grid/GridItem.js";
import Stack from '@mui/material/Stack';
// import Button from '@material-ui/core/Button';
// import Color from 'color';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import Card from "../../../../components/Card/Card.js";

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import Button from "../../../../components/CustomButtons/Button.js";
import SnackbarContent from "../../../../components/Snackbar/SnackbarContent.js";

import Button2 from "@material-ui/core/Button";
import { useHistory } from "react-router";

import axios from 'axios';


// new things  for drop down menue 
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import Tooltip from "@material-ui/core/Tooltip";
import { useState } from "react";

//Things from template
import CustomDropdown from "../../../../components/CustomDropdown/CustomDropdown.js";
import { Link } from "react-router-dom";
import styles from "../../../../assets/jss/material-kit-react/components/headerLinksStyle.js";
import { makeStyles } from "@material-ui/styles";


import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import GridContainer from '../../../../components/Grid/GridContainer.js';

import Grid from "@material-ui/core/Grid";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import CardBody from '../../../../components/Card/CardBody.js';


const useStyles = makeStyles(styles);
export default function Main() {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const classes = useStyles();
    // ----------------------------------  for the number of passengers ------------------------------

    const [countPassengers, setCountPassengers] = useState(1); //since we must have 1 adult
    const [cabin, setCabin] = useState("Economy"); // will store the name of the cabin that we choose 



    var departFlights; // variable to hold the departure flights of the search query
    var returnFlights; // variable to hold the return flights of the search query
    // const [departFlights, setdepartFlights] = useState([]);
    // const [returnFlights, setreturnFlights] = useState([]);

    // we will use this to to fade the buttons 
    const [buttonFade1, setButtonFade1] = useState(false);
    const [buttonFade2, setButtonFade2] = useState(false);

    //
    const [arrival, setarrival] = useState("");
    const [departure, setdeparture] = useState("");
    let arrivalDate="";
    let departureDate="";
    const [value, setValue] = React.useState([null, null]);


    const [message, setmessage] = useState(null);
    const today = new Date();


    //_______ADULT__________
    const [countAdults, setCountAdults] = useState(1);
    const IncNumAdults = () => {
        setCountAdults(countAdults + 1);
        setCountPassengers(countPassengers + 1);

    };

    const DecNumAdults = () => {
        if (countAdults > 1) {
            setCountPassengers(countPassengers - 1);
            setCountAdults(countAdults - 1);
        }
        else {
            setCountAdults(1);
            // rather than alert we just need to make the button fadeout 
            setmessage("Must Have atleast 1 adult");
        }
    };

    //_______CHILDREN_________

    const [countChild, setCountChild] = useState(0);

    const IncNumChild = () => {
        setCountChild(countChild + 1);
        setCountPassengers(countPassengers + 1);
    };
    const DecNumChild = () => {
        if (countChild > 0) {
            setCountPassengers(countPassengers - 1);
            setCountChild(countChild - 1);
        }
        else {

            setCountChild(0);
            // rather than alert we just need to make the button fadeout 
        }
    };
    Date.prototype.addHours = function (h) {
        this.setTime(this.getTime() + (h * 60 * 60 * 1000));
        return this;
    }

    const onSubmit = () => {
        departureDate = ((new Date(value[0]).addHours(4)).toISOString());
        arrivalDate =((new Date(value[1]).addHours(4)).toISOString());

        if (departure == "") { setmessage('please enter a departuring destination'); }
        else
            if (arrival == "") { setmessage('please enter an arrival destination'); }
            else
                if (departureDate === "" || arrivalDate === "") { setmessage('please enter a Date'); }
                else
                    if (departureDate >= arrivalDate || ((new Date(arrivalDate).getTime() - new Date(departureDate).getTime()) < 1000 * 60 * 60 * 48)) { setmessage('please choose an arrival date after at least 2 days from departure'); }
                    else {
                        history.push({
                            pathname: "/search",
                            state: {
                                arrivalAirport: arrival,
                                departureDate: departureDate,
                                departureAirport: departure,
                                arrivalDate: arrivalDate,
                                adultsNo: countAdults,
                                childrenNo: countChild,
                                type: cabin,
                                count: countPassengers
                            }

                        });
                        //  else
                        //  alert("Sever is not working");
                    }
    };


    // const handleClick = (event) => {
    //   setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //   setAnchorEl(null);
    // };


    return (
        <div className={classes.container}>
            <GridContainer justify="center">
                {message ?
                    <GridItem xs={12} xm={12}>
                        <SnackbarContent
                            message={
                                <span>
                                    {message}
                                </span>
                            }
                            close
                            color="danger"

                        /> </GridItem> : null}
                <Card margin="none" color='transparent'
                >
                    <CardBody
                    >

                        <Grid container spacing={2} direction="row" justify="center" alignItems="center" >
                            <Grid item xs textAlign='center'>
                                <TextField
                                    required
                                    label="Leaving from"
                                    id="departure"
                                    variant="outlined"
                                    placeholder="Select origin"
                                    value={departure}
                                    // color="warning"
                                    onChange={(e) => {
                                        setdeparture(e.target.value);
                                    }}
                                // focused 
                                />
                            </Grid>


                            <Grid item xs >
                                <TextField
                                    required
                                    label="Going To"
                                    variant="outlined"
                                    placeholder="Select destination"
                                    value={arrival}
                                    onChange={(e) => {
                                        setarrival(e.target.value);
                                    }}
                                />
                            </Grid>

                            <Grid item xs={4} >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDateRangePicker
                                        disabledEnd
                                        minDate={today}
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                            // console.log((new Date(value[0]).addHours(4)).toISOString());
                                        }}
                                        renderInput={(startProps, endProps) => (
                                            <React.Fragment>
                                                <TextField {...startProps} required
                                                    label="Check In"
                                                    fullWidth
                                                    variant="outlined"
                                                />
                                                <Box sx={{ mx: 2 }}> to </Box>
                                                <TextField {...endProps}
                                                    required
                                                    label="Check Out"
                                                    fullWidth
                                                    variant="outlined"
                                                />
                                            </React.Fragment>
                                        )}
                                    />

                                </LocalizationProvider>

                            </Grid>

                            <Grid item xs textAlign='center'>
                                <CustomDropdown
                                    noLiPadding
                                    buttonText={(countPassengers > 1) ? countPassengers + " Travellers" : countPassengers + " Traveller"}
                                    buttonProps={{
                                        className: classes.navLink,
                                        color: "transparent",

                                    }}
                                    dropdownList={[
                                        <a className={classes.dropdownLink}>
                                            <h4>  Adults</h4>
                                            <div className="main_div">
                                                <div className="center_div">

                                                    <div className="btn_div">
                                                        <Tooltip title="Delete">
                                                            <Button2 onClick={DecNumAdults}>
                                                                <RemoveCircleOutlineSharpIcon />
                                                            </Button2>
                                                        </Tooltip>
                                                        {countAdults}
                                                        <Button2 onClick={IncNumAdults}>
                                                            < AddCircleOutlineSharpIcon />
                                                        </Button2>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>,
                                        <a
                                            className={classes.dropdownLink}
                                        >
                                            <h4>   Children</h4>
                                            <br />
                                            <div className="main_div">
                                                <div className="center_div">

                                                    <div className="btn_div">
                                                        <Tooltip title="Delete">
                                                            <Button2 onClick={DecNumChild}>
                                                                <RemoveCircleOutlineSharpIcon />
                                                            </Button2>
                                                        </Tooltip>
                                                        {countChild}
                                                        <Button2
                                                            onClick={IncNumChild}>
                                                            < AddCircleOutlineSharpIcon />
                                                        </Button2>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>,
                                    ]}
                                />

                            </Grid>
                            <Grid item xs textAlign='center'>
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

                            <Grid item xs textAlign='center'>
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

                        {/* </Box> */}

                    </CardBody>
                </Card>

            </GridContainer>
        </div>

    );
};
