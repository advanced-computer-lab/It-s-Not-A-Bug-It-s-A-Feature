import React from "react";
// @material-ui/core components

import classNames from "classnames";

import { makeStyles } from "@material-ui/styles";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "./../../components/Header/Header.js";
import HeaderLinks from "./../../components/Header/HeaderLinks.js";
import Footer from "./../../components/Footer/Footer.js";
import GridContainer from "./../../components/Grid/GridContainer.js";
import GridItem from "./../../components/Grid/GridItem.js";
import NavPills from "./../../components/NavPills/NavPills.js";
import Button from "./../../components/CustomButtons/Button.js";
import Card from "./../../components/Card/Card.js";
import Flight from "./../../components/Flight/Flight.js";
import Typography from '@mui/material/Typography';
import AllSeats from "../../components/Flight/AllSeats.js";
import SnackbarContent from "./../../components/Snackbar/SnackbarContent.js";
import Check from "@material-ui/icons/Check";
import SelectSeats from "../../components/Flight/SelectSeats.js";
import ColorCode from "../../components/Flight/colorCodeSeats.js";
import Box from '@material-ui/core/Box';

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
const useStyles = makeStyles(styles);


export default function Reservation(props) {
    const location = useLocation();
    const key = location.state;


    const classes = useStyles();
    const { ...rest } = props;
    let history = useHistory();
    const cabin = key.cabin;
    const passengers = key.count;
    const childrenNo = key.childrenNo;
    const adultsNo = key.adultsNo;
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [retData, setRetData] = useState({
        economySeats: 0,
        businessSeats: 0,
        currBusinessSeats: 0,
        currEconomySeats: 0,
        reservedSeats: []
    });
    const [deptData, setDeptData] = useState({
        economySeats: 0,
        businessSeats: 0,
        currBusinessSeats: 0,
        currEconomySeats: 0,
        reservedSeats: []
    });
    const [reservedSeats2, setReservedSeats2] = useState([]);
    const [reservedSeats3, setReservedSeats3] = useState([]);

    const [tab2, setTab2] = useState(0);

    let price = (cabin == "Business") ? passengers * (key.flight.businessPrice + key.ReturnFlight.businessPrice) : passengers * (key.flight.economyPrice + key.ReturnFlight.economyPrice);



    useEffect(() => {



        axios.get('http://localhost:8000/admin/searchFlights', {
            params:
            {
                flightNo: key.flight.flightNo,
                arrivalDate: '',
                arrivalAirport: '',
                arrivalTerminal: '',
                arrivalTime: '',
                departureDate: '',
                departureAirport: '',
                departureTerminal: '',
                departureTime: ''

            }
        }).then(res => {
            setDeptData(res.data[0]);
            setLoading(false);
            console.log("ana gowwa depttt");
            console.log(res.data[0]);
            console.log(deptData);
        }).catch(err => console.log(err))


        axios.get('http://localhost:8000/admin/searchFlights', {
            params:
            {
                flightNo: key.ReturnFlight.flightNo,
                arrivalDate: '',
                arrivalAirport: '',
                arrivalTerminal: '',
                arrivalTime: '',
                departureDate: '',
                departureAirport: '',
                departureTerminal: '',
                departureTime: ''

            }
        }).then(res => {
            setRetData(res.data[0]);
            setLoading2(false);
            console.log("ana gowwa returnnnn");
            console.log(res.data[0]);
        }).catch(err => console.log(err))
    }, []);

    const onSubmit = () => {
        history.push({
            pathname: "/pay",
            state: {
                adultsNo: key.adultsNo,
                childrenNo: key.childrenNo,
                seatClass: key.cabin,
                deptFlight: key.flight,
                arrFlight: key.ReturnFlight,
                deptSeats: reservedSeats2,
                arrSeats: reservedSeats3,
                totalPrice: price
            }

        });
        // const onSubmit = () => {

        // });

        // axios.post('http://localhost:8000/user/res', {

        //     resID: resID + 1,
        //     adultsNo: key.adultsNo,
        //     childrenNo: key.childrenNo,
        //     seatClass: key.cabin,
        //     deptFlight: key.flight._id,
        //     arrFlight: key.ReturnFlight._id,
        //     deptSeats: key.deptSeats,
        //     arrSeats: reservedSeats3
        // }).then(res => {
        //     console.log(res.data);
        //     //   setResId(resID);
        //     setReserved(true);
        // }).catch(err => console.log(err))

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
                        <GridItem xs={12} sm={12}>
                            <NavPills
                                alignCenter
                                color="primary"
                                active={tab2}
                                // if(tab2) active = {1} : active = {0}
                                tabs={[
                                    {
                                        tabButton: " Choose Seats - Dept",
                                        tabIcon: AirlineSeatReclineExtraIcon,
                                        tabContent: (
                                            <GridContainer justify="center">
                                                <GridItem xs={12} sm={12}>
                                                    <Typography> <h3>Choose your seats</h3></Typography>
                                                    {loading ? <CustomLinearProgress color="info" /> :
                                                        <Box display="flex" flex-direction="row">
                                                            <GridItem xs={12} sm={12}>
                                                                <SelectSeats
                                                                    flightNo={key.flight.flightNo}
                                                                    economySeats={deptData.economySeats}
                                                                    businessSeats={deptData.businessSeats}
                                                                    currBusinessSeats={deptData.currBusinessSeats}
                                                                    currEconomySeats={deptData.currEconomySeats}
                                                                    reservedSeats={deptData.reservedSeats}
                                                                    type={cabin}
                                                                    passengers={passengers}
                                                                    isReturn="false"
                                                                    callback={setReservedSeats2}
                                                                />
                                                            </GridItem>
                                                            <ColorCode />
                                                        </Box>
                                                    }

                                                </GridItem>
                                                {/* {reservedSeats2.length=== passengers? */}
                                                <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                    <h3>{reservedSeats2.length} {"/"} {passengers} Seats chosen</h3>
                                                    {/* <Button
                                              color="danger"
                                              size="lg"
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              Reserve
                                            </Button> */}
                                                </GridItem>
                                                {/* :null} */}
                                            </GridContainer>
                                        ),
                                    },
                                    {
                                        tabButton: " Choose Seats - Return",
                                        tabIcon: AirlineSeatReclineExtraIcon,
                                        tabContent: (
                                            <GridContainer justify="center">
                                                <GridItem xs={12} sm={12}>
                                                    {reservedSeats2.length === passengers ?
                                                        <div>
                                                            <Typography> <h3>Choose your seats</h3></Typography>
                                                            {loading2 ? <CustomLinearProgress color="info" /> :
                                                                <Box display="flex" flex-direction="row">
                                                                    <GridItem xs={12} sm={12}>
                                                                        <SelectSeats
                                                                            flightNo={key.ReturnFlight.flightNo}
                                                                            economySeats={retData.economySeats}
                                                                            businessSeats={retData.businessSeats}
                                                                            currBusinessSeats={retData.currBusinessSeats}
                                                                            currEconomySeats={retData.currEconomySeats}
                                                                            reservedSeats={retData.reservedSeats}
                                                                            type={cabin}
                                                                            passengers={passengers}
                                                                            callback={setReservedSeats3}
                                                                            isReturn="true"
                                                                        />
                                                                    </GridItem>
                                                                    <ColorCode />
                                                                </Box>

                                                            }
                                                        </div>

                                                        :
                                                        <div>
                                                            {/* <GridContainer justify="center" >
                                                    <GridItem xs={12} sm={12}><div class = "center"><Typography> <h3> .</h3></Typography> </div></GridItem>
                                                    <GridItem xs={12} sm={12}><div class = "center"><Typography> <h3> .</h3></Typography> </div></GridItem>

                                                    <GridItem xs={12} sm={12}> */}
                                                            <div class="center"><Typography> <h3> Please Select the Departure Flight Seats First</h3></Typography> </div>
                                                            {/* </GridItem >
                                                    </GridContainer> */}
                                                        </div>}

                                                </GridItem>
                                                {/* {reservedSeats3.length=== passengers? */}
                                                <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                    <h3>{reservedSeats3.length} {"/"} {passengers} Seats chosen</h3>
                                                    {/* <Button
                                                                color="danger"
                                                                size="lg"
                                                                onClick={(e) => { onSubmit(e); }}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                Reserve
                                                            </Button>*/}

                                                </GridItem>
                                                {/* : null}  */}
                                            </GridContainer>
                                        ),
                                    },

                                    {
                                        tabButton: " Confirm Seats",
                                        tabIcon: CheckIcon,
                                        tabContent: (
                                            <div>
                                                {/* {reserved ? <SnackbarContent
                                                    message={
                                                        <span>
                                                            <b>Reservation Confirmed!</b> reservation # {resID - 1}   Have a nice flight
                                                        </span>
                                                    }
                                                    close
                                                    color="success"
                                                    icon={Check}
                                                /> : null} */}
                                                <GridContainer justify="center">
                                                    {reservedSeats3.length === passengers ?
                                                        <div>
                                                            <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>



                                                                <ReservationCard
                                                                    adult={key.adultsNo}
                                                                    child={key.childrenNo}
                                                                    seatClass={key.cabin}
                                                                    deptFlight={key.flight}
                                                                    arrFlight={key.ReturnFlight}
                                                                    deptSeats={reservedSeats2}
                                                                    arrSeats={reservedSeats3}
                                                                    totalPrice={price}
                                                                >
                                                                </ReservationCard>
                                                            </GridItem>
                                                            {/* check chosenseats == passengers */}
                                                            <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                                <Button
                                                                    color="danger"
                                                                    size="lg"
                                                                    onClick={(e) => { onSubmit(e); }}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    Pay
                                                                </Button>
                                                            </GridItem>
                                                        </div>
                                                        : <div><Typography> <h3> Please Select your Seats First</h3></Typography> </div>}
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