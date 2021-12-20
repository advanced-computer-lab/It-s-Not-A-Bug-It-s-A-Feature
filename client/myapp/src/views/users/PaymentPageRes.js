import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Info from "@material-ui/icons/Info";
// import AirplaneTicketIcon from '@material-ui/icons/AirplaneTicket';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightLandIcon from '@material-ui/icons/FlightLand';
// import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import Favorite from "@material-ui/icons/Favorite";
import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import Button from "../../components/CustomButtons/Button.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import NavPills from "../../components/NavPills/NavPills.js";
import Parallax from "../../components/Parallax/Parallax.js";


import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import LockIcon from '@mui/icons-material/Lock';
import CustomLinearProgress from "../../components/CustomLinearProgress/CustomLinearProgress.js";


import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";


import Reservation from "../../components/Reservation/Reservation.js";
import profile from "./../../assets/img/faces/michael.jpg";
import successPic from "./../../assets/img/success.jpg";
import error from "./../../assets/img/error.jpg";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import styles from "../../assets/jss/material-kit-react/views/profilePage.js";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Cancel } from "@material-ui/icons";
const useStyles = makeStyles(styles);

export default function ProfilePageRes(props) {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    //   const [MyReservation, setMyReservation] = useState([]);
    //   const [Profile, setProfile] = useState([]);
    //   const [ProfileEdit, setProfileEdit] = useState([]);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(true);
    //   const [edit, setedit] = useState(null);
    const { ...rest } = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);





    return (
        <div>
            <Header
                color="transparent"
                brand="OverReact"
                rightLinks={<HeaderLinks isLogged={true} />}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: "white",
                }}
                {...rest}
            />
            <Parallax
                small
                filter
                image={require("./../../assets/img/passport.jpg").default}
            />
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <div className={classes.profile}>
                                    <div>
                                        {success ?
                                            <div>
                                                <img src={successPic} alt="..." className={imageClasses} />
                                                <div className={classes.name}>
                                                    <h3 className={classes.title}>Transaction Successful!</h3>
                                                    <p>Thanks for choosing overReact Airlines</p>
                                                    <h4>Have a safe flight</h4>
                                                    
                                                </div>
                                            </div>
                                            :
                                            <div>
                                                <img src={error} alt="..." className={imageClasses} />
                                                <div className={classes.name}>
                                                    <h3 className={classes.title}>Something went wrong!</h3>
                                                    <h5>Please try again.</h5>
                                                </div>
                                            </div>
                                        }

                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>
                        {/* <div className={classes.description}>
                            <p>
                                It’s hard enough to find an error in your code when you’re looking for it; its even harder when you’ve ASSUMED your code is ERROR-FREE.{" "}
                            </p>
                        </div> */}
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>

                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
