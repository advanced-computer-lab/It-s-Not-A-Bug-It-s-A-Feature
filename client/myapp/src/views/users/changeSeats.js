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
import CardBody from "./../../components/Card/CardBody.js";

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
    console.log(location);
    const classes = useStyles();
    const { ...rest } = props;
    let history = useHistory();
    // const childrenNo = key.childrenNo;
    // const adultsNo = key.adultsNo;
    const [loading, setLoading] = useState(true);
    // const [loading2, setLoading2] = useState(true);
    // const [retData, setRetData] = useState({
    //     economySeats: 0,
    //     businessSeats: 0,
    //     currBusinessSeats: 0,
    //     currEconomySeats: 0,
    //     reservedSeats: []
    // });
    // const [deptData, setDeptData] = useState({
    //     economySeats: 0,
    //     businessSeats: 0,
    //     currBusinessSeats: 0,
    //     currEconomySeats: 0,
    //     reservedSeats: []
    // });
    // const cabin = key.cabin;
    // const passengers = key.passengers;
    const [reservedSeats2, setReservedSeats2] = useState([]);
    const [reservedSeats3, setReservedSeats3] = useState([]);
    const [oldDeptSeats, setOldDeptSeats] = useState([]);
    const [oldRetSeats, setOldRetSeats] = useState([]);
    const [cabin, setCabin] = useState([]);
    const [passengers, setPassengers] = useState([]);
    const [resInfo, setResInfo] = useState({
        reservation: null,
        deptFlight: null,
        retFlight: null
    });
    const token = localStorage.getItem("token");
    useEffect(() => {
        axios.get('http://localhost:8000/user/myReservations/' + key.id, {
            headers: {
                'authorization': token
            },
        }).then(res => {
            console.log("ana f myresss");
            console.log(res.data);
            setResInfo({
                reservation: res.data.reservation,
                deptFlight: res.data.deptFlight,
                arrFlight: res.data.arrFlight
            });
            setOldDeptSeats(res.data.reservation.deptSeats);
            setOldRetSeats(res.data.reservation.arrSeats);
            setCabin(res.data.reservation.seatClass);
            setPassengers(res.data.reservation.adultsNo + res.data.reservation.childrenNo);
            setLoading(false);
        }).catch(err => console.log(err))

        //    userRes = {reservation: reserv, deptFlight: resDeptFlight, arrFlight: resArrFlight};


    }, []);

    const onSubmit = () => {
        history.push({
            //TODO - fl return method
            //display old seat numbers
            //TODO
            //axios post req hena to edit seats
            // "/changeSeats"
            // give it resID,  key.resID
            // whichFligh (string), //h3ml nboth wla eh??????
            //give option to stay w old seats
            //display old seats
            // new arr of seats, resSeat 2 w 3

            //deptFlight
            // arrFlight
        });


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
                                tabs={[
                                    {
                                        tabButton: " Switch Seats - Dept",
                                        tabIcon: AirlineSeatReclineExtraIcon,
                                        tabContent: (
                                            <GridContainer justify="center">
                                                <GridItem xs={12} sm={12}>
                                                    {/* <Typography> <h3>Choose your seats</h3></Typography> */}
                                                    {loading ? <CustomLinearProgress color="info" /> :
                                                        <div>
                                                            <Box display="flex" flex-direction="row">
                                                                <GridItem xs={12} sm={8}>
                                                                    <SelectSeats
                                                                        flightNo={resInfo.deptFlight.flightNo}
                                                                        economySeats={resInfo.deptFlight.economySeats}
                                                                        businessSeats={resInfo.deptFlight.businessSeats}
                                                                        currBusinessSeats={resInfo.deptFlight.currBusinessSeats}
                                                                        currEconomySeats={resInfo.deptFlight.currEconomySeats}
                                                                        reservedSeats={resInfo.deptFlight.reservedSeats}
                                                                        type={cabin}
                                                                        passengers={passengers}
                                                                        isReturn="false"
                                                                        callback={setReservedSeats2}
                                                                    />
                                                                </GridItem>
                                                                <GridItem xs={12} sm={4}>
                                                                    <ColorCode />
                                                                    <Card maxwidth="xs">
                                                                        <CardBody>
                                                                            <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                                                <b className={classes.title}>Old Seat Numbers: {oldDeptSeats}</b>
                                                                            </GridItem>
                                                                        </CardBody>
                                                                    </Card>
                                                                    <Card maxwidth="xs">
                                                                        <CardBody>
                                                                            <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                                                <b className={classes.title}>New Seat Numbers: {reservedSeats2}</b>
                                                                            </GridItem>
                                                                        </CardBody>
                                                                    </Card>
                                                                    <Card maxwidth="xs">
                                                                        <CardBody>
                                                                            <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                                                <b className={classes.title}>{reservedSeats2.length} {"/"} {passengers}   Seats chosen</b>
                                                                            </GridItem>
                                                                        </CardBody>
                                                                    </Card>
                                                                </GridItem>
                                                            </Box>


                                                        </div>
                                                    }

                                                </GridItem>

                                            </GridContainer>
                                        ),
                                    },
                                    {
                                        tabButton: " Switch Seats - Return",
                                        tabIcon: AirlineSeatReclineExtraIcon,
                                        tabContent: (
                                            <GridContainer justify="center">
                                                {loading ? <CustomLinearProgress color="info" /> :
                                                    <div>
                                                        <GridItem xs={12} sm={12}>
                                                            {reservedSeats2.length === passengers ?
                                                                <div>
                                                                    <Box display="flex" flex-direction="row">
                                                                        <GridItem xs={12} sm={8}>
                                                                            <SelectSeats
                                                                                flightNo={resInfo.arrFlight.flightNo}
                                                                                economySeats={resInfo.arrFlight.economySeats}
                                                                                businessSeats={resInfo.arrFlight.businessSeats}
                                                                                currBusinessSeats={resInfo.arrFlight.currBusinessSeats}
                                                                                currEconomySeats={resInfo.arrFlight.currEconomySeats}
                                                                                reservedSeats={resInfo.arrFlight.reservedSeats}
                                                                                type={cabin}
                                                                                passengers={passengers}
                                                                                callback={setReservedSeats3}
                                                                                isReturn="true"
                                                                            />
                                                                        </GridItem>
                                                                        <GridItem xs={12} sm={4}>
                                                                            <ColorCode />
                                                                            <Card maxwidth="xs">
                                                                                <CardBody>
                                                                                    <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                                                        <b className={classes.title}>{reservedSeats3.length} {"/"} {passengers} Seats chosen</b>
                                                                                    </GridItem>
                                                                                </CardBody>
                                                                            </Card>
                                                                        </GridItem>
                                                                        {/* <GridItem xs={12} sm={2}></GridItem> */}
                                                                    </Box>
                                                                </div>
                                                                :
                                                                <div>
                                                                    <div class="center"><Typography> <h3> Please Select the Departure Flight Seats First</h3></Typography> </div>
                                                                </div>}
                                                        </GridItem>
                                                    </div>}
                                            </GridContainer>
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
