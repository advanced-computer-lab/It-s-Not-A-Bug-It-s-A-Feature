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
import GridContainer from "./../Grid/GridContainer.js";

import Flight from "./Flight.js";
import React from 'react';
import makeStyles from "@material-ui/styles/makeStyles";


import styles from "./../../assets/jss/material-kit-react/components/cardStyle.js";
const useStyles = makeStyles(styles);


export default function FlightCard(props) {
    const classes = useStyles();
    return (
        <div>
             <Card  maxWidth="sm" >
                <form className={classes.form} >
                  <CardBody>
                  <GridContainer justify="center" spacing={1}>
                  < Flight 
                  flight={props.flight}
                  Number={props.Number}
                  type={props.type}
                  ></Flight>  
                                        </GridContainer> 

                  </CardBody>
                </form>
              </Card>
        </div>
    )
}
