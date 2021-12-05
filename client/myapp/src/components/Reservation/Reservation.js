// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import Container from '@mui/material/Container';
import FlightIcon from '@mui/icons-material/Flight';



import Card from "../Card/Card.js";
import CardBody from "../Card/CardBody.js";
import CardHeader from "../Card/CardHeader.js";
import CardFooter from "../Card/CardFooter.js";
import Grid from "@material-ui/core/Grid";

import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
import Flight from "../Flight/Flight.js";

// @material-ui/core components
import makeStyles from "@material-ui/styles/makeStyles";
import Typography from '@mui/material/Typography';
import LuggageIcon from '@mui/icons-material/Luggage';



import styles from "../../assets/jss/material-kit-react/components/cardStyle.js";

const useStyles = makeStyles(styles);

import React from 'react'
import { getTime } from "date-fns";
import { fontSize, textAlign } from "@mui/system";

export default function Reservation(props) {
console.log(props);

    const classes = useStyles();
    const styleTime = {
      fontSize: 24,
      textAlign: "center",
      fontWeight: "bold",
      paddingTop: "0px",
      lineHeight: 0,
      paddingBottom: "0px",
  }
  const styleSpac = {
    lineHeight: 0,
    paddingTop: "0px",
    paddingBottom: "0px",
}
    
    return (
        <div>
           <Card  maxWidth="sm" >
                <form className={classes.form} >
                  <CardBody>
                  <Flight
                  flight={props.departFlight}
                  type={props.cabin}
                  Number={props.count}
                  ></Flight>
                  {/* <Flight>
                    
                  </Flight> */}
                   
                    </CardBody>
                </form>
              </Card>
           
        </div>
    )
}
