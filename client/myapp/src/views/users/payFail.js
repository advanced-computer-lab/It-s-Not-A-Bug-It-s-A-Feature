import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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

import successPic from "./../../assets/img/success.jpg";
import error from "./../../assets/img/error.jpg";
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Cancel } from "@material-ui/icons";

import { useHistory } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Switch,
    useLocation
} from "react-router-dom";
import PaymentInfo from "../../components/Payment/PaymentInfo.js";


const useStyles = makeStyles(styles);

export default function ProfilePageRes(props) {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const location = useLocation();
    const key = location.state;
    const classes = useStyles();
    
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
                                                    <img src={error} alt="..." className={imageClasses} />
                                                    <div className={classes.name}>
                                                        <h3 className={classes.title}>Something went wrong!</h3>
                                                        <h5>Please try again.</h5>
                                                    </div>
                                                </div>
                                            

                                </div>
                            </GridItem>
                        </GridContainer>
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
