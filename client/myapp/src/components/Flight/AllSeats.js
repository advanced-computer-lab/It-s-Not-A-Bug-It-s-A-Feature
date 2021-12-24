import SelectSeats from "./SelectSeats.js";
import axios from 'axios';
axios.defaults.withCredentials = true
import { useState, useEffect } from 'react';
import React from 'react'
import CustomLinearProgress from "./../../components/CustomLinearProgress/CustomLinearProgress.js";
import Button from "./../../components/CustomButtons/Button.js";
import Box from '@material-ui/core/Box';
import GridContainer from "./../../components/Grid/GridContainer.js";
import GridItem from "./../../components/Grid/GridItem.js";
import Grid from '@material-ui/core/Grid'
import styles from "./../../assets/jss/material-kit-react/views/loginPage.js";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(styles);


export default function AllSeats(props) {
    const type = props.type;
    const passengers = Number(props.passengers);
    const deptFlight = Number(props.deptFlight);
    const retFlight = Number(props.retFlight);
    const classes = useStyles();
    //these 2 used to create the reservation
    // const adultsNo = Number(props.adultsNo);
    // const childrenNo = Number(props.childrenNo);

    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [deptData, setDeptData] = useState({
        economySeats: 0,
        businessSeats: 0,
        currBusinessSeats: 0,
        currEconomySeats: 0,
        reservedSeats: []
    });
    const [retData, setRetData] = useState({
        economySeats: 0,
        businessSeats: 0,
        currBusinessSeats: 0,
        currEconomySeats: 0,
        reservedSeats: []
    });
    const [selDeptSeats, setSelDeptSeats] = useState([]);
    
    
    useEffect(() => {
        axios.get('http://localhost:8000/admin/searchFlights', {
            params:
            {
                flightNo: deptFlight,
                arrivalDate: '',
                arrivalAirport: '',
                arrivalTerminal: '',
                arrivalTime: '',
                departureDate: '',
                departureAirport: '',
                departureTerminal: '',
                departureTime: ''

            }
        }).then(res => {
            setDeptData(res.data[0]);
            setLoading(false);
            console.log("ana gowwa depttt");
            console.log(res.data[0]);
            console.log(deptData);
        }).catch(err => console.log(err))

        axios.get('http://localhost:8000/admin/searchFlights', {
            params:
            {
                flightNo: retFlight,
                arrivalDate: '',
                arrivalAirport: '',
                arrivalTerminal: '',
                arrivalTime: '',
                departureDate: '',
                departureAirport: '',
                departureTerminal: '',
                departureTime: ''

            }
        }).then(res => {
            setRetData(res.data[0]);
            setLoading2(false);
            console.log("ana gowwa returnnnn");
            console.log(res.data[0]);
        }).catch(err => console.log(err))
    }, []);

    useEffect(() => {
        console.log("all seats - dept seats" + selDeptSeats);
        console.log("selected seats" + selDeptSeats);
    }, [selDeptSeats]);

 
    return (
        <div className={classes.container}>
        <GridContainer justify="center">
            <GridItem xs={12} sm={12}>
            {loading2 || loading ? <CustomLinearProgress color="info" /> :
                <Box display = "flex" flex-direction ="row">
                    <GridItem xs={12} sm={12}>
                        <SelectSeats
                            flightNo={deptFlight}
                            economySeats={deptData.economySeats}
                            businessSeats={deptData.businessSeats}
                            currBusinessSeats={deptData.currBusinessSeats}
                            currEconomySeats={deptData.currEconomySeats}
                            reservedSeats={deptData.reservedSeats}
                            type={type}
                            passengers={passengers}
                            isReturn="false"
                            callback={setSelDeptSeats} />
                    </GridItem>
                    <GridItem xs={12} sm={12}>

                        <SelectSeats
                            flightNo={retFlight}
                            economySeats={retData.economySeats}
                            businessSeats={retData.businessSeats}
                            currBusinessSeats={retData.currBusinessSeats}
                            currEconomySeats={retData.currEconomySeats}
                            reservedSeats={retData.reservedSeats}
                            type={type}
                            passengers={passengers}
                            isReturn="true"
                             />
                    </GridItem>
                </Box>
            }
            </GridItem>
            </GridContainer>
        </div>
    )
}
