import SelectSeats from "./SelectSeats.js";
// let Flights = require('./../../../server/models/Flights.js');

import axios from 'axios';


import React from 'react'

var flightNo = 0, flightNo2 = 0;
    var economySeats1 = 0, economySeats2 = 0;
    var businessSeats1 = 0, businessSeats2 = 0;
    var currBusinessSeats1 = 0, currBusinessSeats2 = 0;
    var currEconomySeats1 = 0, currEconomySeats2 = 0;
    var reservedSeats1 = [], reservedSeats2 = 0;
    let flightInfo;

async function setDeptInfo(deptFlight){
    //setting dept flight parameters
    await axios.get('http://localhost:8000/admin/searchFlights', {
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
            // store data in a variable to be later used
            flightInfo = res.data[0];
            // flightNo = res.data.flightNo, 
            economySeats1 = res.data[0].economySeats,
                businessSeats1 = res.data[0].businessSeats,
                currBusinessSeats1 = res.data[0].businessSeats,
                currEconomySeats1 = res.data[0].currEconomySeats,
                reservedSeats1 = res.data[0].reservedSeats,
                // console.log(economySeats1),
                // console.log(businessSeats1),
                console.log("ana gowwa"),
            console.log(res.data[0])
        }).catch(err => console.log(err))
}

export default function AllSeats(props) {
    const type = props.type;
    const passengers = Number(props.passengers);
    const deptFlight = Number(props.deptFlight);
    const retFlight = Number(props.retFlight);

    

    setDeptInfo(deptFlight);

    console.log(economySeats1);
    console.log("ana hena w yarab teshta3'al");
    // economySeats=flightInfo.economySeats,
    //     businessSeats=flightInfo.businessSeats,
    //     currBusinessSeats = flightInfo.businessSeats,
    //     currEconomySeats = flightInfo.currEconomySeats,
    //     reservedSeats = flightInfo.reservedSeats
    // await Flights.findById(deptFligthtId)
    //   .then(f => flightNo = f.flighNo, 
    //     economySeats=f.economySeats,
    //     businessSeats=f.businessSeats,
    //     currBusinessSeats = f.businessSeats,
    //     currEconomySeats = f.currEconomySeats,
    //     reservedSeats = f.reservedSeats)
    //   .catch();

    // //setting return flight parameters
    //   await Flights.findById(retFlightId)
    //   .then(f => flightNo2  = f.flighNo, 
    //     economySeats2 =f.economySeats,
    //     businessSeats2 =f.businessSeats,
    //     currBusinessSeats2  = f.businessSeats,
    //     currEconomySeats2  = f.currEconomySeats,
    //     reservedSeats2  = f.reservedSeats)
    //   .catch();

    return (
        <div>
            <SelectSeats
                flightNo={deptFlight}
                economySeats={economySeats1}
                businessSeats={businessSeats1}
                currBusinessSeats={currBusinessSeats1}
                currEconomySeats={currEconomySeats1}
                reservedSeats={reservedSeats1}
                type={type}
                passengers={passengers}
                isReturn="false" />

            {/* <SelectSeats
            flightNo = {flightNo2}
            economySeats = {economySeats2}
            businessSeats = {businessSeats2}
            currBusinessSeats = {currBusinessSeats2}
            currEconomySeats = {currEconomySeats2}
            reservedSeats = {reservedSeats2}
            type = {type}
            Number ={Number}
            isReturn = "true"/> */}
        </div>
    )
}
