import React from "react";
// @material-ui/core components

import classNames from "classnames";

import { makeStyles } from "@material-ui/styles";
import Checkbox from "@material-ui/core/Checkbox";
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
import FormControlLabel from "@material-ui/core/FormControlLabel";


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



    }, []);

    const onSubmit = () => {
        axios.post('http://localhost:8000/user/changeSeats', {
            newSeats: reservedSeats2,
            reservationID: resInfo.reservation._id,
            whichFlight: "deptFlight"
        }, {
            headers: {
                'authorization': token
            }
        }).then(res => {


            console.log(res.data);

            setReserved(true);
        }).catch(err => console.log(err))
        
        axios.post('http://localhost:8000/user/changeSeats', {
            newSeats: reservedSeats3,
            reservationID: resInfo.reservation._id,
            whichFlight: "arrFlight"
        }, {
            headers: {
                'authorization': token
            }
        }).then(res => {


            console.log(res.data);

            setReserved(true);
        }).catch(err => console.log(err))

        history.push({

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
                                                                <GridItem xs={12} sm={4}>
                                                                    <ColorCode />
                                                                    {/* <Card maxwidth="xs">
                                                                        <CardBody>
                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Checkbox
                                                                                        tabIndex={-1}
                                                                                        onClick={() => 
                                                                                            reservedSeats2 === oldDeptSeats? 
                                                                                            setReservedSeats2([]):
                                                                                            setReservedSeats2(oldDeptSeats)}
                                                                                        checked={reservedSeats2 === oldDeptSeats ? true:false}
                                                                                        checkedIcon={<Check className={classes.checkedIcon} />}
                                                                                        icon={<Check className={classes.uncheckedIcon} />}
                                                                                        classes={{
                                                                                            checked: classes.checked,
                                                                                            root: classes.checkRoot,
                                                                                        }}
                                                                                    />
                                                                                }
                                                                                classes={{  label: classes.title, root: classes.labelRoot }}
                                                                                label="Keep my old seats"
                                                                            />
                                                                        </CardBody>
                                                                    </Card> */}
                                                                </GridItem>
                                                                <GridItem xs={12} sm={4}>
                                                                    <Card maxwidth="xs">
                                                                        <CardBody>
                                                                            <SelectSeats
                                                                                flightNo={resInfo.deptFlight.flightNo}
                                                                                economySeats={resInfo.deptFlight.economySeats}
                                                                                businessSeats={resInfo.deptFlight.businessSeats}
                                                                                currBusinessSeats={resInfo.deptFlight.currBusinessSeats}
                                                                                currEconomySeats={resInfo.deptFlight.currEconomySeats}
                                                                                reservedSeats={resInfo.deptFlight.reservedSeats.filter(item => !oldDeptSeats.includes(item))}
                                                                                type={cabin}
                                                                                passengers={passengers}
                                                                                isReturn="false"
                                                                                callback={setReservedSeats2}
                                                                            />
                                                                            <br />
                                                                        </CardBody>
                                                                    </Card>
                                                                </GridItem>
                                                                <GridItem xs={12} sm={4}>
                                                                    {/* <ColorCode /> */}
                                                                    <Card maxwidth="xs">
                                                                        <CardBody>
                                                                            <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                                                <b className={classes.title}>Old Seats # &nbsp;
                                                                                    {oldDeptSeats.map((seat) => "   " + "    " + seat)}</b>
                                                                            </GridItem>
                                                                        </CardBody>
                                                                    </Card>
                                                                    <Card maxwidth="xs">
                                                                        <CardBody>
                                                                            <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                                                <b className={classes.title}>New Seats # &nbsp; {reservedSeats2.map((seat) => "   " + "    " + seat)}</b>
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
                                                                        <GridItem xs={12} sm={4}>

                                                                            <ColorCode />
                                                                            <GridContainer justify="center">
                                                                                <GridItem xs={12} sm={3}></GridItem>
                                                                                <GridItem xs={12} sm={9}>
                                                                                    {(reservedSeats3.length === passengers) ?
                                                                                        <Button
                                                                                            color="danger"
                                                                                            size="lg"
                                                                                            onClick={(e) => { onSubmit(e); }}
                                                                                            target="_blank"
                                                                                            rel="noopener noreferrer"
                                                                                        >
                                                                                            Reserve
                                                                                        </Button> : null}
                                                                                </GridItem>
                                                                            </GridContainer>
                                                                        </GridItem>
                                                                        <GridItem xs={12} sm={4}>
                                                                            <Card maxwidth="xs">
                                                                                <CardBody>
                                                                                    <SelectSeats
                                                                                        flightNo={resInfo.arrFlight.flightNo}
                                                                                        economySeats={resInfo.arrFlight.economySeats}
                                                                                        businessSeats={resInfo.arrFlight.businessSeats}
                                                                                        currBusinessSeats={resInfo.arrFlight.currBusinessSeats}
                                                                                        currEconomySeats={resInfo.arrFlight.currEconomySeats}
                                                                                        reservedSeats={resInfo.arrFlight.reservedSeats.filter(item => !oldRetSeats.includes(item))}
                                                                                        type={cabin}
                                                                                        passengers={passengers}
                                                                                        callback={setReservedSeats3}
                                                                                        isReturn="true"
                                                                                    />
                                                                                    <br />
                                                                                </CardBody>
                                                                            </Card>
                                                                        </GridItem>
                                                                        <GridItem xs={12} sm={4}>
                                                                            <Card maxwidth="xs">
                                                                                <CardBody>
                                                                                    <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                                                        <b className={classes.title}>Old Seat Numbers: {oldRetSeats}</b>
                                                                                    </GridItem>
                                                                                </CardBody>
                                                                            </Card>
                                                                            <Card maxwidth="xs">
                                                                                <CardBody>
                                                                                    <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                                                        <b className={classes.title}>New Seat Numbers: {reservedSeats3}</b>
                                                                                    </GridItem>
                                                                                </CardBody>
                                                                            </Card>
                                                                            <Card maxwidth="xs">
                                                                                <CardBody>
                                                                                    <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                                                        <b className={classes.title}>{reservedSeats3.length} {"/"} {passengers}   Seats chosen</b>
                                                                                    </GridItem>
                                                                                </CardBody>
                                                                            </Card>
                                                                        </GridItem>
                                                                        {/* <GridItem xs={12} sm={4}>
                                                                            <Card maxwidth="xs">
                                                                                <CardBody>
                                                                                    <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                                                        <b className={classes.title}>{reservedSeats3.length} {"/"} {passengers} Seats chosen</b>
                                                                                    </GridItem>
                                                                                </CardBody>
                                                                            </Card>
                                                                        </GridItem> */}
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
