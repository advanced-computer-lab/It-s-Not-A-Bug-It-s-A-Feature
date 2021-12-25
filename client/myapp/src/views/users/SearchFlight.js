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
import ButtonMUI from '@mui/material/Button';
import Card from "./../../components/Card/Card.js";
import CustomLinearProgress from "./../../components/CustomLinearProgress/CustomLinearProgress.js";


import Flight from "./../../components/Flight/FlightCard.js";
import SearchAirports from "./../../components/AutoComplete/autocomplete.js";
// import AllSeats from "./../.../components/Flight/AllSeats.js";
import Typography from '@mui/material/Typography';

import CardBody from "./../../components/Card/CardBody.js";



import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

// import AirplaneTicketIcon from '@material-ui/icons/AirplaneTicket';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import CheckIcon from '@mui/icons-material/Check';

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
import AllSeats from "../../components/Flight/AllSeats.js";

//import SectionBasics from "./Sections/SectionBasics.js";


export default function SearchFlight(props) {
    const location = useLocation();
    const key = location.state;
    var totalPrice;

    const classes = useStyles();
    const { ...rest } = props;
    let history = useHistory();
    const [depart, setDepart] = useState([]);
    const [returnn, setreturnn] = useState([]);

    const [selectedDepart, setselectedDepart] = useState(null);
    const [selectedReturn, setselectedReturn] = useState(null);

    const [empty, setempty] = useState(null);
    const [loading, setLoading] = useState(false);

    // const location = useLocation();
    let isLogged = props.isLogged
    // const isLogged = usekeys();
    if (key)
        useEffect(() => {
            setempty(null);
            setLoading(true);
            console.log("new key is" + key);
            axios.get('http://localhost:8000/user/searchFlights', {
                params:
                {
                    arrivalAirport: key.arrivalAirport,
                    departureDate: key.departureDate,
                    departureAirport: key.departureAirport,
                    cabin: key.type,
                    adultsNo: key.adultsNo,
                    childrenNo: key.childrenNo
                }
            })
                .then(res => {
                    // store data in a variable to be later used
                    // setdepartFlights( res.data);
                    setLoading(false);
                    if (res.data.length == 0) { setempty(true); }

                }).catch(err => console.log(err))

            axios.get('http://localhost:8000/user/searchFlights', {
                params:
                {
                    arrivalAirport: key.departureAirport,
                    departureDate: key.arrivalDate,
                    departureAirport: key.arrivalAirport,
                    cabin: key.type,
                    adultsNo: key.adultsNo,
                    childrenNo: key.childrenNo
                }
            })
                .then(res => {
                    // store data in a variable to be later used
                    // setreturnFlights ( res.data);
                    setreturnn(res.data);
                    setLoading(false);
                    if (res.data.length == 0) { setempty(true); }
                }).catch(err => console.log(err))

        }, [key]);

        function loggedIn(){
            if(localStorage.getItem("token") != null)return true;
            else return false;
        }

    const onSubmit = () => {
        const path= loggedIn()?"/reserveSeats":"/login";
        history.push({
            pathname: path,
            state: {
                flight: selectedDepart,
                ReturnFlight: selectedReturn,
                cabin: key.type,
                adultsNo: key.adultsNo,
                childrenNo: key.childrenNo,
                count: key.count,
                message:"Please Login to continue reservation"
            }

        });
    }


    return (
        <div>
            <Header
                absolute
                brand="OverReact"
                fixed={true}
                rightLinks={<HeaderLinks isLogged={isLogged} />}
                {...rest}
            />
            {/* <Parallax filter image={require("./../../assets/img/cloud.jpg").default}/> */}
            <div
                className={classes.pageHeader}
                style={{
                    // backgroundColor:"rgb(229, 229, 255)",
                    backgroundImage: "url(" + image + ")",

                    backgroundSize: "cover",
                    backgroundPosition: "top center",

                }}
            >

                <div className={classes.container}>
                    
                            <SearchBar />
                       

                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12}>
                            <NavPills
                                alignCenter
                                color="primary"
                                tabs={[
                                    {
                                        tabButton: "Departure Flight",
                                        tabIcon: FlightTakeoffIcon,
                                        tabContent: (
                                            <GridContainer justify="center">
                                                {loading ? <CustomLinearProgress color="info" /> : null}
                                                {empty ? <Typography>
                                                    Sorry There is No Flights Available
                                                </Typography> :
                                                    depart.map((curr) => (
                                                        <Button color={(selectedDepart == curr) ? 'blue' : 'transparent'} onClick={(e) => {
                                                            if (selectedDepart != curr) setselectedDepart(curr);
                                                            else setselectedDepart(null);
                                                        }}>

                                                            <GridItem xs={12} sm={12}>
                                                                {console.log("adult ", key.adultsNo)}
                                                                <Flight
                                                                    flight={curr}
                                                                    type={key.type}
                                                                    Number={key.count}
                                                                    adult={key.adultsNo}
                                                                    child={key.childrenNo}

                                                                />

                                                            </GridItem>
                                                        </Button>
                                                    ))}

                                            </GridContainer>
                                        ),
                                    },
                                    {
                                        tabButton: " Return Flight",
                                        tabIcon: FlightLandIcon,
                                        tabContent: (
                                            <GridContainer justify="center">
                                                {loading ? <CustomLinearProgress color="info" /> : null}
                                                {empty ? <Typography>
                                                    Sorry There is No Flights Available
                                                </Typography> :
                                                    returnn.map((curr) => (
                                                        <Button color={(selectedReturn == curr) ? 'blue' : 'transparent'} onClick={(e) => {
                                                            if (selectedReturn != curr) setselectedReturn(curr);
                                                            else setselectedReturn(null);
                                                        }}>

                                                            <GridItem xs={12} sm={12}>

                                                                <Flight
                                                                    flight={curr}
                                                                    type={key.type}
                                                                    Number={key.count}

                                                                    adult={key.adultsNo}
                                                                    child={key.childrenNo}

                                                                />
                                                            </GridItem>
                                                        </Button>
                                                    ))}
                                            </GridContainer>
                                        ),
                                    },

                                    {
                                        tabButton: " Confirm Reservation",
                                        tabIcon: CheckIcon,
                                        tabContent: (
                                            <GridContainer justify="center">

                                                {(() => {
                                                    if (selectedDepart == null) {
                                                        return (
                                                            <div><Typography> <h3> Please Select a Departure Flight</h3></Typography> </div>
                                                        )
                                                    } else if (selectedReturn == null) {
                                                        return (
                                                            <div><Typography> <h3> Please Select a Return Flight</h3></Typography></div>
                                                        )
                                                    } else {
                                                        var priceD = (key.type === "Business") ? parseInt(selectedDepart.businessPrice) : parseInt(selectedDepart.economyPrice);
                                                        var priceR = (key.type === "Business") ? parseInt(selectedReturn.businessPrice) : parseInt(selectedReturn.economyPrice);
                                                        totalPrice = (priceD + priceR) * key.count;

                                                        return (
                                                            <div>
                                                                <GridItem xs={12} sm={12}>
                                                                    <Typography> <h3>Departure Flight</h3></Typography>
                                                                </GridItem>
                                                                <GridItem xs={12} sm={12}>
                                                                    <Flight
                                                                        flight={selectedDepart}
                                                                        type={key.type}
                                                                        Number={key.count}
                                                                        adult={key.adultsNo}

                                                                        child={key.childrenNo}

                                                                    >
                                                                    </Flight>
                                                                </GridItem>
                                                                <GridItem xs={12} sm={12}>
                                                                    <Typography> <h3>Return Flight</h3></Typography>
                                                                </GridItem>
                                                                <GridItem xs={12} sm={12}>
                                                                    <Flight
                                                                        flight={selectedReturn}
                                                                        type={key.type}
                                                                        Number={key.count}
                                                                        adult={key.adultsNo}
                                                                        child={key.childrenNo}
                                                                    >
                                                                    </Flight>

                                                                </GridItem>
                                                                <GridItem xs={12} sm={12} style={{ textAlign: "center" }}><Card>
                                                                    <Typography color="#f44336" fontWeight="bold" fontSize="24px">Total : $ {totalPrice}</Typography> </Card>
                                                                </GridItem>
                                                                <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                                    <Button
                                                                        color="danger"
                                                                        size="lg"
                                                                        onClick={(e) => { onSubmit(e); }}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        {/* <i className="fas fa-play" /> */}
                                                                        Reserve
                                                                    </Button>
                                                                </GridItem>
                                                            </div>
                                                        )
                                                    }
                                                })()}
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