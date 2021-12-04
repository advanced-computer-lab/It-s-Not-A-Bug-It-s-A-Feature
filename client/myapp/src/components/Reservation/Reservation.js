// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import Container from '@mui/material/Container';
import FlightIcon from '@mui/icons-material/Flight';



import Card from "./../Card/Card.js";
import CardBody from "./../Card/CardBody.js";
import CardHeader from "./../Card/CardHeader.js";
import CardFooter from "./../Card/CardFooter.js";
import Grid from "@material-ui/core/Grid";

import GridContainer from "./../Grid/GridContainer.js";
import GridItem from "./../Grid/GridItem.js";

// @material-ui/core components
import makeStyles from "@material-ui/styles/makeStyles";
import Typography from '@mui/material/Typography';
import LuggageIcon from '@mui/icons-material/Luggage';



import styles from "./../../assets/jss/material-kit-react/components/cardStyle.js";

const useStyles = makeStyles(styles);

import React from 'react'
import { getTime } from "date-fns";
import { fontSize, textAlign } from "@mui/system";

export default function Flight(props) {

  const flight =props.flight;
    const departureTime= new Date(flight.departureDate).getHours()+" : "+new Date(flight.departureDate).getMinutes();
    const arrivalTime= new Date(flight.arrivalDate).getHours()+" : "+new Date(flight.arrivalDate).getMinutes();
    const duration =Math.ceil((new Date(flight.arrivalDate).getTime()-new Date(flight.departureDate).getTime())/(1000*60));
    const durationHour = Math.ceil(duration /60);
    var durationMin = Math.ceil(duration %60)+"M";
    if(durationMin=="0M")durationMin ="";
    const type =props.type;
    var price = (type=="business")?parseInt(flight.businessPrice):parseInt(flight.economyPrice);
    var bag = (type=="business")?flight.businessBaggage:flight.economyBaggage;
    bag+=" KG";
     if(props.Number>1)price = price*Number(props.Number);
     const trav =(props.Number>1)?props.Number+" Travellers":props.Number+" Traveller";
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
                  <GridContainer justify="center" spacing={1}>
                    <GridItem  xs={12} sm={12}>
                      <h4> Flight : {flight.flightNo}</h4>
                    </GridItem>
                   <GridItem  xs={12} sm={3}>
                     <p style={styleTime}>{departureTime}</p>
                     <p style={{textAlign:"center"}}>{flight.departureAirport}</p>
                      </GridItem>
                      <GridItem  xs={12} sm={3} >
                        <Grid  container direction="row" justifyContent="space-around" alignItems="center">
                        <Grid item xs={9}><Typography>---------------</Typography> </Grid>
                        <Grid item xs><Typography>
                        <FlightIcon style={{ transform: 'rotate(90deg)', fontSize:18,lineHeight:0}}/>
                          </Typography> 
                        </Grid>
                        </Grid>
                        
                        <p style ={{textAlign:"center"}}> {durationHour}H {durationMin}</p>
                                              </GridItem> 
                      <GridItem  xs={12} sm={3}>
                      <p style={styleTime}>{arrivalTime}</p>
                      <p style={{textAlign:"center"}}>{flight.arrivalAirport}</p>
                      </GridItem> 
                      <GridItem  xs={12} sm={3}>
                      <p style={styleTime} color="primary" >$ {price}</p>
                      </GridItem>
                      <GridItem  xs={12} sm={12} style={styleSpac}>
                      <Grid  container direction="row" justifyContent="flex-start" alignItems="left">
                        <Grid item xs >
                        <Grid  container direction="row" justifyContent="flex-start" alignItems="left">
                        <Grid item  >
                        <LuggageIcon style={styleSpac}/> </Grid>
                        <Typography> {bag}</Typography> 
                        </Grid></Grid>
                        <Grid item xs ><Typography> {type}</Typography> </Grid>
                        <Grid item xs ><Typography> {trav} </Typography> </Grid>
                        </Grid>
                    </GridItem>
                      </GridContainer> 
                    </CardBody>
                </form>
              </Card>
           
        </div>
    )
}
