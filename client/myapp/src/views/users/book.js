import React from 'react'

import { makeStyles } from "@material-ui/styles";
import { Apps, CloudDownload } from "@material-ui/icons";
import { Link } from "react-router-dom";

import CustomDropdown from "./../../components/CustomDropdown/CustomDropdown.js";
import Button from "./../../components/CustomButtons/Button.js";
import Flight from "./../../components/Flight/Flight.js";
import SelectSeats from "./../../components/Flight/SelectSeats.js";
import AllSeats from "./../../components/Flight/AllSeats";

import GridContainer from "./../../components/Grid/GridContainer.js";
import GridItem from "./../../components/Grid/GridItem.js";


import styles from "./../../assets/jss/material-kit-react/components/headerLinksStyle.js";
// import Flights from '../../../../../server/models/Flights.js';


const useStyles = makeStyles(styles);
export default function book() {
    const classes = useStyles();

    return (
        <div>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4}>
            <Flight flight={{
      flightNo:"45",
      economySeats:"45",businessSeats:"45",departureAirport:"Cairo",arrivalAirport:"ter",departureTerminal:"ter",arrivalTerminal:"bn",
      departureDate:"2016-05-12T21:29:00.000Z",arrivalDate:"2016-05-12T21:29:00.000Z",economyPrice:"25",businessPrice:"25",economyBaggage:"52",businessBaggage:"25"
    }}
            type ="business"
            Number ="5"
            />
            </GridItem>
            {/* <GridItem xs={12} sm={6} md={4}>
            <Flight
            flightNo = "45"
            departureDate = "2016-05-12T21:29:00.000Z"
            arrivalDate = "2016-05-13T01:29:00.000Z"
            economySeats = "12"
            businessSeats = "12"
            arrivalAirport = "Monaco"
            departureAirport = "Tokyo"
            departureTerminal = "Terminal 12"
            arrivalTerminal = "terminal 12"
            businessPrice = "10"
            economyPrice= "20"
            Number ="2.9"
            />
             </GridItem> */}
            </GridContainer>
        <CustomDropdown
          noLiPadding
          buttonText="Components"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              All components
            </Link>,
            <a
              href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
              target="_blank"
              className={classes.dropdownLink}
            >
              Documentation
            </a>,
          ]}
        />
        <AllSeats
        type = "Business"
        passengers = "3"
        deptFlight = "75"
        retFlight = "775"
        />
        
        </div>
    )
}
