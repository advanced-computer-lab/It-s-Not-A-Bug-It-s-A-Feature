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

import Box from '@material-ui/core/Box';

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

// Sections for this page
import SearchBar from "./LandingPage/Sections/SearchSection";



export default function Reservation(props) {
    const location = useLocation();
    const key = location.state;

    //   state: {
    //     flight: selectedDepart,
    //     ReturnFlight: selectedReturn,
    //     cabin: key.type,
    //     adultsNo: key.adultsNo,
    //     childrenNo: key.childrenNo,
    //     count: key.count
    //   }
    const classes = useStyles();
    const { ...rest } = props;
    let history = useHistory();
    const cabin = key.cabin;
    const passengers = key.count;
    const childrenNo = key.childrenNo;
    const adultsNo = key.adultsNo;

    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [deptData, setDeptData] = useState({
        economySeats: 0,
        businessSeats: 0,
        currBusinessSeats: 0,
        currEconomySeats: 0,
        reservedSeats: []
    });
    const [reservedSeats2, setReservedSeats2] = useState([]);
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
    }, []);

    const onSubmit = () => {
        history.push({
            pathname: "/reserveRet",
            state: {
                flight: key.flight,
                ReturnFlight: key.ReturnFlight,
                cabin: key.cabin,
                adultsNo: key.adultsNo,
                childrenNo: key.childrenNo,
                count: key.count,
                deptSeats: reservedSeats2
            }

        });
    }

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
                                tabs={[
                                    {
                                        tabButton: " Choose Seats",
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

                                                        </Box>
                                                    }

                                                </GridItem>
                                            </GridContainer>
                                        ),
                                    },

                                    {
                                        tabButton: " Confirm Seats",
                                        tabIcon: CheckIcon,
                                        tabContent: (
                                            <div>
                                                <GridContainer justify="center">
                                                    <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                        <Button
                                                            color="danger"
                                                            size="lg"
                                                            onClick={(e) => { onSubmit(e); }}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Reserve
                                                        </Button>
                                                    </GridItem>
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