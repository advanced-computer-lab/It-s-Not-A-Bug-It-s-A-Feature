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
import Parallax from "../../components/Parallax/Parallax.js";
import Grid from '@mui/material/Grid';
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
    // const [resID, setResId] = useState(15);
    const { ...rest } = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    let data = {
        resID: localStorage.getItem("resID"),
        adultsNo: localStorage.getItem("adultsNo"),
        childrenNo: localStorage.getItem("childrenNo"),
        seatClass: localStorage.getItem("seatClass"),
        deptFlight: localStorage.getItem("deptFlight"),
        arrFlight: localStorage.getItem("arrFlight"),
        deptSeats: localStorage.getItem("deptSeats"),
        arrSeats: localStorage.getItem("arrSeats")
    };

    const token = localStorage.getItem("token");
    useEffect(() => {
        // axios.get('http://localhost:8000/user/getMaxResID')
        //     .then(res => {
        //         setResId(res.data);
        //         console.log("max res id aho" + res.data);
        //     }).catch(err => console.log(err))

        axios.post('http://localhost:8000/user/res', data, {
            headers: {
                'authorization': token
            }
        }).then(res => {
            console.log(res.data);
            localStorage.removeItem('resID');
            localStorage.removeItem('adultsNo');
            localStorage.removeItem('childrenNo');
            localStorage.removeItem('seatClass');
            localStorage.removeItem('deptFlight');
            localStorage.removeItem('arrFlight');
            localStorage.removeItem('deptSeats');
            localStorage.removeItem('arrSeats');
            setReserved(true);
        }).catch(err => console.log(err)) 
    }, []);

    // const onSubmit = () => {
    //     axios.post('http://localhost:8000/user/res', {

    //         resID: resID + 1,
    //         adultsNo: key.adultsNo,
    //         childrenNo: key.childrenNo,
    //         seatClass: key.seatClass,
    //         deptFlight: key.deptFlight._id,
    //         arrFlight: key.arrFlight._id,
    //         deptSeats: key.deptSeats,
    //         arrSeats: key.arrSeats
    //     }).then(res => {
    //         console.log(res.data);
    //         setReserved(true);
    //     }).catch(err => console.log(err))
    // };


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
                                        <img src={successPic} alt="..." className={imageClasses} />
                                        <div className={classes.name}>
                                            <h3 className={classes.title}>Transaction Successful!</h3>
                                            <p>Thanks for choosing overReact Airlines</p>
                                            <h4>Have a safe flight</h4>
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
