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
                  < Flight 
                  flight={props.flight}
                  Number={props.Number}
                  type={props.type}
                  adult={props.adult}
                  child={props.child}
                  ></Flight>  
                  
                  </CardBody>
                </form>
              </Card>
        </div>
    )
}
