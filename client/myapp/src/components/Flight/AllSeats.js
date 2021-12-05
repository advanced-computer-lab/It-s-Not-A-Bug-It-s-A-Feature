import SelectSeats from "./SelectSeats.js";
import axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react'
import CustomLinearProgress from "./../../components/CustomLinearProgress/CustomLinearProgress.js";
import Button from "./../../components/CustomButtons/Button.js";

// var flightNo = 0, flightNo2 = 0;
// var economySeats1 = 0, economySeats2 = 0;
// var businessSeats1 = 0, businessSeats2 = 0;
// var currBusinessSeats1 = 0, currBusinessSeats2 = 0;
// var currEconomySeats1 = 0, currEconomySeats2 = 0;
// var reservedSeats1 = [], reservedSeats2 = 0;
// let flightInfo;

// async function setDeptInfo(deptFlight){
//     //setting dept flight parameters


//     // await 
// }

export default function AllSeats(props) {
    const type = props.type;
    const passengers = Number(props.passengers);
    const deptFlight = Number(props.deptFlight);
    const retFlight = Number(props.retFlight);
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
    const [selRetSeats, setSelRetSeats] = useState([]);

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
    },[selDeptSeats,selRetSeats]);

    const handleChange = e => setSelDeptSeats(e.target.deptSeats);

    console.log("all seats - dept seats" + selDeptSeats);
    // const onSubmit = () => {

    //     axios.post('http://localhost:8000/user/res', {
    //         body:
    //         {
    //             resID: Number(props.resID),
    //             adultsNo: Number(props.adultsNo),
                
    //             childrenNo: Number(props.childrenNo),
    //             seatClass: type,
    //             deptFlight: deptFlight,
    //             arrFlight: retFlight,
    //             deptSeats: deptSeats, //???????
    //             arrSeats: arrSeats, //??????


    //         }
    //     }).then(res => {
    //         console.log(res.data);
    //     }).catch(err => console.log(err))
    //     // history.push({
    //     //   pathname: "/home", //ARO7 FEEEN B3D KEDA - mmkn profile
    //     //   state: {
    //     //     deptSeats: ,
    //     //     retSeats: retSeats
    //     //   }
    //     // });
    // };
    // console.log(deptData);
    // // console.log(retData);
    // console.log("ana hena w yarab teshta3'al");

    return (
        <div padding="35px">
            {/* <div>hii {deptData.economySeats}
                {deptFlight}
                {deptData.businessSeats}
                {deptData.currBusinessSeats}
                {deptData.currEconomySeats}
                {deptData.reservedSeats}
                {type}
                {passengers}</div> */}

            {loading2 ? <CustomLinearProgress color="info" /> :
                <div>
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
                        onChange={handleChange} />

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
                        onChange={handleChange} />
                </div>
            }
            {/* <Button
                color="warning"
                // color="transparent"
                size="lg"
                id="demo-customized-button"
                aria-controls="demo-customized-menu"
                aria-haspopup="true"
                variant="contained"
                disableElevation
                onClick={(e) => {
                    onSubmit(e);
                }}
            >Save</Button> */}
        </div>
    )
}
