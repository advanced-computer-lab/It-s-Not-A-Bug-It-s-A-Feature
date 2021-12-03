import React from 'react'

import { makeStyles } from "@material-ui/styles";
import { Apps, CloudDownload } from "@material-ui/icons";
import { Link } from "react-router-dom";

import CustomDropdown from "./../../components/CustomDropdown/CustomDropdown.js";
import Button from "./../../components/CustomButtons/Button.js";
import Flight from "./../../components/Flight/Flight.js";


import styles from "./../../assets/jss/material-kit-react/components/headerLinksStyle.js";
// import Flights from '../../../../../server/models/Flights.js';


const useStyles = makeStyles(styles);
export default function book() {
    const classes = useStyles();

    return (
        <div>
            <Flight
            flightNo = "45"
            departureDate = "2016-05-12T21:29:00.000Z"
            arrivalDate = "2012-12-12T21:29:00.000Z"
            economySeats = "12"
            businessSeats = "12"
            arrivalAirport = "Monaco"
            departureAirport = "Tokyo"
            departureTerminal = "Terminal 12"
            arrivalTerminal = "terminal 12"
            businessPrice = "10"
            economyPrice= "20"
            />
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
        </div>
    )
}
