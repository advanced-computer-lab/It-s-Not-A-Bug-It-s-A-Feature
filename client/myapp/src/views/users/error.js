import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "./../../components/Header/Header.js";
import HeaderLinks from "./../../components/Header/HeaderLinks.js";
import Footer from "./../../components/Footer/Footer.js";
import GridContainer from "./../../components/Grid/GridContainer.js";
import GridItem from "./../../components/Grid/GridItem.js";
import Button from "./../../components/CustomButtons/Button.js";
import Card from "./../../components/Card/Card.js";
import CardBody from "./../../components/Card/CardBody.js";
import CardHeader from "./../../components/Card/CardHeader.js";
import CardFooter from "./../../components/Card/CardFooter.js";
import CustomInput from "./../../components/CustomInput/CustomInput.js";
import LockIcon from '@mui/icons-material/Lock';
import { useHistory } from 'react-router-dom';
import {useState, useEffect} from 'react';


import styles from "./../../assets/jss/material-kit-react/views/loginPage.js";

import image from "./../../assets/img/bg.jpg";
const useStyles = makeStyles(styles);

export default function Login(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  let history = useHistory();

  const [isLogged, setLogged] =useState(false);

  const onSubmit = (e) => { 
    // i want to change the navbar links here
    e.preventDefault();
    setLogged(true);
    history.push('/profile'); 
  }

  
const jss604 ={
    textAlign: "center",
    color: "#FFF",
    fontSize: "13.7em",
    marginTop: "30px",
    minHeight: "32px",
    fontFamily: "Roboto Slab", 
    fontWeight: 700,
    marginBottom: "25px",
    letterSpacing: "14px" 
}
const jss605 ={
    fontSize: "2.25rem",
    textAlign: "center",
    marginBottom: "8px",
}
const jss606 = {
    fontSize: "1.125rem",
    textAlign: "center",
    marginBottom: "8px",
}
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="OverReact"
        rightLinks={<HeaderLinks isLogged = {isLogged}/>}
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
        <GridItem xs={12} sm={12} md={4}>
        <div class="MuiGrid-root jss159  MuiGrid-item MuiGrid-grid-md-12" justify="center">
            <h1 style={jss604}>404</h1>
            <h2 style={jss605}>Page not found :(</h2>
            <h4 style={jss606}>Ooooups! Looks like you got lost.</h4>
            <h4 style={jss606}>Try to Login</h4>
            </div>
        </GridItem>
        </GridContainer>
        </div>
        
        <Footer whiteFont />
      </div>
    </div>
  );
}
