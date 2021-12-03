// // nodejs library to set properties for components
// import PropTypes from "prop-types";
// // nodejs library that concatenates classes
// import classNames from "classnames";


// import Card from "./../Card/Card.js";
// import CardBody from "./../Card/CardBody.js";
// import CardHeader from "./../Card/CardHeader.js";
// import CardFooter from "./../Card/CardFooter.js";


// import GridContainer from "./../Grid/GridContainer.js";
// import GridItem from "./../Grid/GridItem.js";

// // @material-ui/core components
// import makeStyles from "@material-ui/styles/makeStyles";
// // import {
//   Text,
//   View,
//   StyleSheet,
//   Image,
//   Dimensions,
//   ImageBackground,
// } from 'react-native';

// import styles from "./../../assets/jss/material-kit-react/components/cardStyle.js";

// const useStyles = makeStyles(styles);

// import React from 'react'
// import { getTime } from "date-fns";

// export default function Flight(props) {
//     const departureTime= new Date(props.departureDate).getHours()+" : "+new Date(props.departureDate).getMinutes();
//     const arrivalTime= new Date(props.arrivalDate).getHours()+" : "+new Date(props.arrivalDate).getMinutes();
//     console.log(props.departureTime);
//     const classes = useStyles();

    // return (
        // <div>
            
        //      <Card >
        //         <form className={classes.form} >
        //           <CardHeader color="primary" className={classes.cardHeader} >
        //             <h4>{props.flightNo}</h4>
        //           </CardHeader>
        //           <CardBody>
        //           <GridContainer justify="center">
        //              {/** top-right corner */}
        //   <View style={{ position: 'absolute', top: 0, right: 0 }}>
        //     <Text
        //       style={{
        //         fontSize: 20,
        //         color: 'black',
        //         backgroundColor: 'white',
        //       }}>
        //       35 mins
        //     </Text>
        //   </View>

        //   {/** top -left */}
        //   <View style={{ position: 'absolute', top: 10, left: 0 }}>
        //     <Text
        //       style={{ fontSize: 20, color: 'white', backgroundColor: 'red' }}>
        //       Flat 50%
        //     </Text>
        //   </View>
        //   <View style={{ position: 'absolute', top: 40, left: 0 }}>
        //     <Text
        //       style={{ fontSize: 20, color: 'white', backgroundColor: 'red' }}>
        //       Free delivery
        //     </Text>
        //   </View>
        //   {/**Card text */}
        //   <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 8 }}>
        //     Papa's john town
        //   </Text>
        //   <Text />
        //           <Text style={{flex: 1, flexWrap: 'wrap'}}> 
        //               {departureTime}
        //               </Text>
        //               {props.flightNo}
        //               </GridContainer> 
        //             </CardBody>
        //           <CardFooter className={classes.cardFooter}>
        //             <h5>End</h5>
        //           </CardFooter>
        //         </form>
        //       </Card>
              
        // </div>
//     );
// }
