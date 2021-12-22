import React from 'react';
import GridContainer from "./../Grid/GridContainer.js";
import GridItem from "./../Grid/GridItem.js";
import makeStyles from "@material-ui/styles/makeStyles";
import styles from "./../../assets/jss/material-kit-react/components/cardStyle.js";
import Reservation from "./../Reservation/Reservation.js";


const useStyles = makeStyles(styles);

export default function PaymentInfo(props) {
    var adults = props.adults;
    var children = props.children;
    var totalPrice = props.totalPrice;
    var seatClass = props.seatClass;
    var deptFlight = props.deptFlight;
    var arrFlight = props.arrFlight;
    var deptSeats = props.deptSeats;
    var arrSeats = props.arrSeats;

    var passengers = adults+children;

    console.log(props);

    return (
        <div>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12}>
                    <Reservation
                        deptFlight={deptFlight}
                        count={passengers}
                        seatClass={seatClass}
                        // reservationID={}
                        deptSeats={deptSeats}
                        arrFlight={arrFlight}
                        arrSeats={arrSeats}
                        totalPrice={totalPrice}
                        child={children}
                        adult={adults}
                    ></Reservation>


                </GridItem>
            </GridContainer>


        </div>
    );
}
