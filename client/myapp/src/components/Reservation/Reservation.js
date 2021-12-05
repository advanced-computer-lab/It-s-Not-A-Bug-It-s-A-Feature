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
import Divider from '@mui/material/Divider';

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
const deptFlight=props.deptFlight;

const date =  new Date(deptFlight.departureDate);

const deptDate=((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();

const arrFlight=props.arrFlight;

const date2 =  new Date(arrFlight.departureDate);

const arrDate=((date2.getMonth() > 8) ? (date2.getMonth() + 1) : ('0' + (date2.getMonth() + 1))) + '/' + ((date2.getDate() > 9) ? date2.getDate() : ('0' + date2.getDate())) + '/' + date2.getFullYear();


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
              {props.reservationID &&  <CardHeader color="primary" className={classes.cardHeader}>
                <Typography fontWeight="bold" fontSize="24px">
                   Booking Number    {props.reservationID}
                 </Typography>   
                  </CardHeader>}
                  <CardBody>
                  <GridContainer justify="center" spacing={1}>
                  <GridItem  xs={12} sm={6}>
                      <h4> Departure Flight : {deptFlight.flightNo}</h4>
                    </GridItem>
                    <GridItem  xs={12} sm={6}>
                      <h4> Date : {deptDate}</h4>
                    </GridItem>
                    <br/>
                  <Flight
                  flight={deptFlight}
                  type={props.seatClass}
                  Number={props.count}
                  res="Departure"
                  ></Flight>
                   <GridItem  xs={12} sm={12}> 
                   <Typography  >
                   Seats reserved : {props.deptSeats}
                 </Typography>  
                   
                    </GridItem>
                    <br/><br/>
                    <Divider/>
                    <GridItem  xs={12} sm={6} >
                      <h4> Return Flight : {arrFlight.flightNo}</h4>
                    </GridItem>
                    <GridItem  xs={12} sm={6}>
                      <h4> Date : {arrDate}</h4>
                    </GridItem>
                   <br/>
                  <Flight
                  flight={arrFlight}
                  type={props.seatClass}
                  Number={props.count}
                  res="Return"
                  ></Flight>
                   <GridItem  xs={12} sm={12}> 
                   <Typography  >
                   Seats reserved : {props.arrSeats}
                 </Typography>  
                   
                    </GridItem>

                    <GridItem xs={12} sm={12} style={{textAlign:"center"}}>
                                <Typography color="#f44336" fontWeight="bold" fontSize="24px">Total : $ {props.totalPrice}</Typography> 
                              </GridItem>
                   </GridContainer>
                    </CardBody>
                </form>
              </Card>
           
        </div>
    )
}
