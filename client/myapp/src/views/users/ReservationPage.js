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



import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {useState, useEffect} from 'react';

// import AirplaneTicketIcon from '@material-ui/icons/AirplaneTicket';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
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

//import SectionBasics from "./Sections/SectionBasics.js";


export default function Reservation(props) {
    const location = useLocation();
 const key = location.state;
 
  const classes = useStyles();
  const { ...rest } = props;
  let history = useHistory();
  const [depart, setDepart] =useState([]);
  const [returnn, setreturnn] =useState([]);

  const [selectedDepart, setselectedDepart] =useState(null);
  const [selectedReturn, setselectedReturn] =useState(null);


  // const location = useLocation();
  let isLogged = props.isLogged
  // const isLogged = usekeys();


 


  return (
    <div>
      <Header
        absolute
        brand="OverReact"
        fixed={true}
        rightLinks={<HeaderLinks isLogged = {true}/>}
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
                          
                        </GridContainer>
                      ),
                    },
                    
                    {
                      tabButton: " Confirm Reservation",
                      tabIcon: CheckIcon,
                      tabContent: (
                        <GridContainer justify="center">

                        
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