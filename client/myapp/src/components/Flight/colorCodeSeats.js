import * as React from 'react';
import { makeStyles } from "@material-ui/styles";
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import SeatPicker from 'react-seat-picker';

let seat = [[{ number: "99", isReserved: true }]];
let seat2 = [[{ number: "99", isReserved: false }]];
let seat3 = [[{ number: "99", isSelected: true }]];
const useStyles = makeStyles(styles);

export default function colorCodeSeats() {
    const classes = useStyles();
    return (
        <div>
            <GridContainer justify="center">
            <GridItem>
                    <h4>Color Code</h4>
                </GridItem>
                <GridItem>
                    <SeatPicker rows={seat} maxReservableSeats={0} visible />
                    <h4>Unavaialable</h4>
                </GridItem>
                <GridItem></GridItem>
                <GridItem>
                    <SeatPicker rows={seat2} maxReservableSeats={0} visible />
                    <h4>Available</h4>
                </GridItem>
            </GridContainer>
            {/* <div>
            <SeatPicker selectedByDefault= {"true"} rows={seat3} maxReservableSeats={0} visible />
            <h4 className={classes.description}>Selected</h4>
            </div> */}
        </div>
    )
}
