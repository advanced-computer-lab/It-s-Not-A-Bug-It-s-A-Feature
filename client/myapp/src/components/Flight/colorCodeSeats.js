import * as React from 'react';
import { makeStyles } from "@material-ui/styles";
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import SeatPicker from 'react-seat-picker';
import Card from "./../Card/Card.js";
import CardBody from "./../Card/CardBody.js";

let seat = [[{ number: "99", isReserved: true }]];
let seat2 = [[{ number: "99", isReserved: false }]];
let seat3 = [[{ number: "99", isSelected: true }]];
const useStyles = makeStyles(styles);

export default function colorCodeSeats() {
    const classes = useStyles();
    return (
        <div>
            <Card maxWidth="xs">
                <CardBody>
                    <GridContainer justify="center">
                        <GridItem  xs={12} sm={12}>
                                <h3 className={classes.title}> Color Code </h3>                   
                        </GridItem>
                        <GridItem xs={12} sm={6}>
                            <SeatPicker rows={seat} maxReservableSeats={0} visible />
                            <h4>Unavaialable</h4>
                        </GridItem>
                        {/* <GridItem xs={12} sm={1}></GridItem> */}
                        <GridItem xs={12} sm={6}>
                            <SeatPicker rows={seat2} maxReservableSeats={0} visible />
                            <h4>Available</h4>
                        </GridItem>
                    </GridContainer>
                </CardBody>
            </Card>
            {/* <div>
            <SeatPicker selectedByDefault= {"true"} rows={seat3} maxReservableSeats={0} visible />
            <h4 className={classes.description}>Selected</h4>
            </div> */}
        </div>
    )
}
