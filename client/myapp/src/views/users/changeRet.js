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
import ButtonMUI from '@mui/material/Button';
import Card from "./../../components/Card/Card.js";
import CardContent from '@mui/material/CardContent';
import FlightCard from "./../../components/Flight/FlightCard.js";
import CardBody from "./../../components/Card/CardBody.js";
import Typography from '@mui/material/Typography';
import AllSeats from "../../components/Flight/AllSeats.js";
import SnackbarContent from "./../../components/Snackbar/SnackbarContent.js";
import Check from "@material-ui/icons/Check";
import Grid from "@material-ui/core/Grid";
import PaidIcon from '@mui/icons-material/Paid';
import SelectSeats from "../../components/Flight/SelectSeats.js";
import ColorCode from "../../components/Flight/colorCodeSeats.js";
import Box from '@material-ui/core/Box';
import { Link } from "react-router-dom";


import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import CreditCardIcon from '@mui/icons-material/CreditCard';


import ReservationCard from "./../../components/Reservation/Reservation.js";

import axios from 'axios';
axios.defaults.withCredentials = true

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
    console.log(key.res);

    const type = key.type;
    const count = key.res.reservation.adultsNo + key.res.reservation.childrenNo;
    const traveller = count == 1 ? " " + 1 + " Traveller" : " " + count + " Travellers";
    // const reservation =key.res;
    const arrivalFlight = key.res.arrFlight;
    const myIcon = type === "Dept" ? FlightTakeoffIcon : FlightLandIcon;
    const [reservedSeats, setReservedSeats] = useState([]);
    const [Flight, setFlight] = useState(null);
    const [allFlights, setAllFlights] = useState([]);
    const [empty, setempty] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [loading2, setLoading2] = useState(false);

    // const [deptDate, setdeptDate] = useState(null);
    const deptDate = new Date(key.res.deptFlight.departureDate);
    const [value, setValue] = React.useState(key.res.arrFlight.departureDate);
    const [cabin, setCabin] = useState(key.res.reservation.seatClass);
    let newPrice = 0, priceDiff = 0;


    // const [newPrice, setNewPrice] = 
    if (key.res.deptFlight !== null && Flight !== null) {
        newPrice = (cabin == "Business") ?
            (count * (key.res.deptFlight.businessPrice + Flight.businessPrice)) :
            (count * (key.res.deptFlight.economyPrice + Flight.economyPrice));

        priceDiff = newPrice - key.res.reservation.price;
    }
    const today = new Date();

    Date.prototype.addHours = function (h) {
        this.setTime(this.getTime() + (h * 60 * 60 * 1000));
        return this;
    }
    const onSubmit = () => {
        setempty(null);
        setLoading(true);
        console.log(arrivalFlight.departureAirport,
            (new Date(value).addHours(4)).toISOString(),
            arrivalFlight.arrivalAirport,
            cabin,
            key.res.reservation.adultsNo,
            key.res.reservation.childrenNo);

        if (cabin === key.res.reservation.seatClass)
            axios.get('http://localhost:8000/user/searchFlights', {
                params:
                {
                    departureAirport: arrivalFlight.departureAirport,
                    departureDate: (new Date(value).addHours(4)).toISOString(),
                    arrivalAirport: arrivalFlight.arrivalAirport,
                    cabin: cabin,
                    adultsNo: key.res.reservation.adultsNo,
                    childrenNo: key.res.reservation.childrenNo
                }
            })
                .then(res => {
                    // store data in a variable to be later used
                    // setdepartFlights( res.data);
                    setAllFlights(res.data);
                    console.log(res);
                    setFlight(null);
                    setLoading(false);
                    if (res.data.length == 0) {
                        setempty(true);
                    }
                }).catch(err => console.log(err))
        else {
            setFlight(null);
            setAllFlights([]);
            setLoading(false);
            setempty(true);
        }

    };
    //PAY THE DIFFERENCE
    const onSubmit2 = () => {
        const token = localStorage.getItem("token");
        axios.post('http://localhost:8000/user/payment', {
            price: newPrice
        }, {
            headers: {
                'authorization': token
            }
        }).then(res => {
            console.log(res.data);

            localStorage.setItem("res_id", key.res.reservation._id);
            localStorage.setItem("resID", key.res.reservation.reservationID);
            localStorage.setItem("adultsNo", key.res.reservation.adultsNo);
            localStorage.setItem("childrenNo", key.res.reservation.childrenNo);
            localStorage.setItem("seatClass", cabin);
            localStorage.setItem("deptFlight", key.res.deptFlight._id);
            localStorage.setItem("arrFlight",  Flight._id);
            localStorage.setItem("deptSeats", key.res.reservation.deptSeats);
            localStorage.setItem("arrSeats", reservedSeats);

            localStorage.setItem("isEdit", "true");
            window.location = res.data.url;
        })
            .catch(err => console.log(err))

    };
    //IN CASE OF no price diff
    const onSubmit3 = () => {
        console.log("on submit 3: ", key.res.reservation._id);

        const token = localStorage.getItem("token");
        axios.post('http://localhost:8000/user/editReservation/' + key.res.reservation._id, {
            resID: key.res.reservation.reservationID,
            adultsNo: key.res.reservation.adultsNo,
            childrenNo: key.res.reservation.childrenNo,
            seatClass: cabin,
            deptFlight: key.res.deptFlight._id,
            arrFlight: Flight._id,
            deptSeats: key.res.reservation.deptSeats,
            arrSeats: reservedSeats
        }, {
            headers: {
                'authorization': token
            }
        }).then(res => {
            console.log(res.data);
            //FEEDBACK AW NOTIFICATION
            history.push("/profile");
        }).catch(err => console.log(err))

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
                                <Grid container spacing={1} direction="row" justify="center" alignItems="center" >
                                    <Grid item xs textAlign='center'>
                                        <Typography textAlign='center'>
                                            Leaving From
                                        </Typography>
                                        <Typography textAlign='center'>
                                            {arrivalFlight.departureAirport}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography textAlign='center'>
                                            Going To
                                        </Typography>
                                        <Typography textAlign='center'>
                                            {arrivalFlight.arrivalAirport}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                disabledEnd
                                                minDate={deptDate}
                                                value={value}
                                                onChange={(newValue) => {
                                                    setValue(newValue);
                                                }}
                                                renderInput={(props) => (
                                                    <React.Fragment>
                                                        <TextField {...props} required
                                                            label="Date"
                                                            fullWidth
                                                            variant="standard"
                                                        />

                                                    </React.Fragment>
                                                )}
                                            />

                                        </LocalizationProvider>

                                    </Grid>
                                    <Grid item xs>
                                        <Typography textAlign='center'>
                                            {traveller}
                                        </Typography>

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
                            </CardContent>
                        </Card>

                        <GridItem xs={12} sm={12}>
                            <NavPills
                                alignCenter
                                color="primary"
                                tabs={[
                                    {
                                        tabButton: "Return Flight",
                                        tabIcon: myIcon,
                                        tabContent: (
                                            <GridContainer justify="center">
                                                {loading ? <CustomLinearProgress color="info" /> : null}
                                                {empty ? <Typography>
                                                    Sorry There is No Flights Available
                                                </Typography> :
                                                    allFlights.map((curr) => (
                                                        <Button color={(Flight == curr) ? 'blue' : 'transparent'} onClick={(e) => {
                                                            if (Flight != curr) setFlight(curr);
                                                            else setFlight(null);
                                                        }}>

                                                            <GridItem xs={12} sm={12}>
                                                                <FlightCard
                                                                    flight={curr}
                                                                    type={cabin}
                                                                    Number={count}
                                                                    adult={key.res.reservation.adultsNo}
                                                                    child={key.res.reservation.childrenNo}

                                                                />

                                                            </GridItem>
                                                        </Button>
                                                    ))

                                                }
                                            </GridContainer>

                                        ),
                                    },
                                    {
                                        tabButton: " Choose Seats",
                                        tabIcon: AirlineSeatReclineExtraIcon,
                                        tabContent: (
                                            <GridContainer justify="center">

                                                <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                    {Flight === null ?
                                                        <div><Typography> <h3> Please Select a Return Flight</h3></Typography> </div>
                                                        :
                                                        <Box display="flex" flex-direction="row">
                                                            <GridItem xs={12} sm={4}>
                                                                <ColorCode />
                                                            </GridItem>
                                                            <GridItem xs={12} sm={4}>
                                                                <Card maxwidth="xs">
                                                                    <CardBody>
                                                                        <SelectSeats
                                                                            flightNo={Flight.flightNo}
                                                                            economySeats={Flight.economySeats}
                                                                            businessSeats={Flight.businessSeats}
                                                                            currBusinessSeats={Flight.currBusinessSeats}
                                                                            currEconomySeats={Flight.currEconomySeats}
                                                                            reservedSeats={Flight.reservedSeats}
                                                                            type={cabin}
                                                                            passengers={count}
                                                                            isReturn="true"
                                                                            callback={setReservedSeats}
                                                                        />
                                                                        <br />
                                                                    </CardBody>
                                                                </Card>
                                                            </GridItem>
                                                            <GridItem xs={12} sm={4}>
                                                                <Card maxwidth="xs">
                                                                    <CardBody>
                                                                        <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                                            <b className={classes.title}>Selected Seats # &nbsp; {reservedSeats.map((seat) => "   " + "    " + seat)}</b>
                                                                        </GridItem>
                                                                    </CardBody>
                                                                </Card>
                                                                <Card maxwidth="xs">
                                                                    <CardBody>
                                                                        <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                                            <b className={classes.title}>{reservedSeats.length} {"/"} {count}   Seats chosen</b>
                                                                        </GridItem>
                                                                    </CardBody>
                                                                </Card>
                                                            </GridItem>
                                                        </Box>
                                                    }
                                                </GridItem>
                                            </GridContainer>
                                        ),
                                    },

                                    {
                                        tabButton: " Payment ",
                                        tabIcon: PaidIcon,
                                        tabContent: (
                                            <div>
                                                {reservedSeats.length === count && Flight !== null && key.res.reservation !== null ?
                                                    <GridContainer justify="center">
                                                        <GridItem xs={12} sm={6} style={{ textAlign: "center" }}>
                                                            <ReservationCard
                                                                adult={key.res.reservation.adultsNo}
                                                                child={key.res.reservation.childrenNo}
                                                                seatClass={cabin}
                                                                deptFlight={key.res.deptFlight}
                                                                arrFlight={Flight}
                                                                deptSeats={key.res.reservation.deptSeats}
                                                                arrSeats={ reservedSeats}
                                                                totalPrice={priceDiff}
                                                            >
                                                            </ReservationCard>
                                                        </GridItem>
                                                        <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                            {priceDiff === 0 ?
                                                                <Button
                                                                    color="danger"
                                                                    size="lg"
                                                                    onClick={(e) => { onSubmit3(e); }}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    Reserve
                                                                </Button>
                                                                : <div>

                                                                    {priceDiff > 0 ?
                                                                        <Button
                                                                            color="danger"
                                                                            size="lg"
                                                                            onClick={(e) => { onSubmit2(e); }}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            Pay &nbsp;&nbsp;&nbsp;
                                                                            <CreditCardIcon></CreditCardIcon>
                                                                        </Button>
                                                                        :
                                                                        <Button
                                                                            color="danger"
                                                                            size="lg"
                                                                            onClick={(e) => { onSubmit2(e); }}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            Refund &nbsp;&nbsp;&nbsp;
                                                                            <CreditCardIcon></CreditCardIcon>
                                                                        </Button>}
                                                                </div>}

                                                        </GridItem>
                                                    </GridContainer>
                                                    : <div><Typography> <h3> Please Select your Seats First</h3></Typography> </div>}
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
