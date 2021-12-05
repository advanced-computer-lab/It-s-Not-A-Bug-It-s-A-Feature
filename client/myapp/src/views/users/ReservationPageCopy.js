import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "./../../components/Header/Header.js";
import HeaderLinks from "./../../components/Header/HeaderLinks.js";
import Footer from "./../../components/Footer/Footer.js";
import GridContainer from "./../../components/Grid/GridContainer.js";
import GridItem from "./../../components/Grid/GridItem.js";
import NavPills from "./../../components/NavPills/NavPills.js";
import Button from "./../../components/CustomButtons/Button.js";
import Card from "./../../components/Card/Card.js";
import Flight from "./../../components/Flight/Flight.js";
import Typography from '@mui/material/Typography';
import AllSeats from "../../components/Flight/AllSeats.js";
import SnackbarContent from "./../../components/Snackbar/SnackbarContent.js";
import Check from "@material-ui/icons/Check";
import SeatPicker from 'react-seat-picker';
import CustomLinearProgress from "./../../components/CustomLinearProgress/CustomLinearProgress.js";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import CheckIcon from '@mui/icons-material/Check';
import {
    BrowserRouter as Router,
    Switch,
    useLocation
} from "react-router-dom";
import styles from "./../../assets/jss/material-kit-react/views/loginPage.js";
import image from "./../../assets/img/cloud.jpg";
const useStyles = makeStyles(styles);
// Sections for this page
import SearchBar from "./LandingPage/Sections/SearchSection";

//import SectionBasics from "./Sections/SectionBasics.js";
function createRows(business, econ) {
    // console.log("creating rows");
    const allSeats = business + econ;
    var res = [...Array(Math.ceil(allSeats / 6))].map(x => Array(6).fill(0));
    for (let k = 1, i = 0; i < res.length; i++) {
        for (let j = 0; j <= 6; j++) {
            if (j == 3 || k > allSeats) {
                res[i][j] = { number: "", isReserved: true };
            }
            else {
                res[i][j] = { number: k++ };
            }
        }
    }
    return res;
}
//TODO
//MAKE SURE NO OF SLESTED SEATS == PASSENGERS
//res Id use get requestttttttttttt

export default function Reservation(props) {
    const classes = useStyles();
    const { ...rest } = props;
    let history = useHistory();
    const location = useLocation();
    const key = location.state;
    //paramaters from previous page 
    // flight
    // ReturnFlight
    // cabin
    // adultsNo
    // childrenNo
    // count)
    const [reserved, setReserved] = useState(false);
    const [resID, setResId] = useState(15);
    // let isLogged = props.isLogged
    // from ALL SEATS
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
    const [deptSeats, setDeptSeats] = useState([]);
    const [retSeats, setRetSeats] = useState([]);
    const cabin = key.cabin;
    const passengers = key.count;
    const deptRows = createRows(deptData.businessSeats, deptData.economySeats);
    const retRows = createRows(retData.businessSeats, retData.economySeats);
    useEffect(() => {
        axios.get('http://localhost:8000/admin/searchFlights', {
            params:
            {
                flightNo: key.flight.flightNo,
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
                flightNo: key.ReturnFlight.flightNo,
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
            console.log(retData);
        }).catch(err => console.log(err))
        // axios.get() //GET THE MAX RES ID


    }, []);
    //................

    //from selectSeats

    let newArr = [];

    //   const [deptCurrBusSeats, setDeptCurrBusSeats] = useState(deptData.currBusinessSeats);///////////////////////////////////////////
    //   const [deptCurrEconSeats, setDeptCurrEconSeats] = useState(deptData.currBusinessSeats);
    //   const [retCurrBusSeats, setRetCurrBusSeats] = useState(retData.currBusinessSeats);///////////////////////////////////////////
    //   const [retCurrEconSeats, setRetCurrEconSeats] = useState(retData.currBusinessSeats);

    SeatPicker.defaultProps = {
        addSeatCallback: function addSeatCallback(row, number, id, myId) {
            console.log('Added seat ' + number + ', row ' + row + ', id ' + id);
            if (cabin === "Business" || cabin === "business") {
                console.log("busssss");
                if (myId === "dept") {
                    setDeptData((prevState => { return { ...prevState, ["currBusinessSeats"]: prevState.currBusinessSeats - 1 }; }));
                    //   setDeptData((prevState => {return {...prevState,["arrivalDate"]: true};}));
                }
                else {
                    setRetData((prevState => { return { ...prevState, ["currBusinessSeats"]: prevState.currBusinessSeats - 1 }; }));
                }
            }
            else {

                if (myId === "dept") {
                    setDeptData((prevState => { return { ...prevState, ["currEconomySeats"]: prevState.currEconomySeats - 1 }; }));
                }
                else {
                    setRetData((prevState => { return { ...prevState, ["currEconomySeats"]: prevState.currEconomySeats - 1 }; }));
                }
            }
            if (myId === "dept") {
                console.log("myID = dept");
                setDeptData(prevState => { return { ...prevState, ["reservedSeats"]: [...deptData.reservedSeats, number] }; });
            }
            else {
                console.log("myID = return ");
                console.log(deptData);
                setRetData(prevState => { return { ...prevState, ["reservedSeats"]: [...retData.reservedSeats, number] }; });
                console.log(retData);
            }
        },
        removeSeatCallback: function removeSeatCallback(row, number, id, myId) {
            console.log('Removed seat ' + number + ', row ' + row + ', id ' + id);
            if (cabin === "Business" || cabin === "business") {
                console.log("busssss");
                if (myId === "dept") {
                    setDeptData((prevState => { return { ...prevState, ["currBusinessSeats"]: prevState.currBusinessSeats + 1 }; }));
                    //   setDeptData((prevState => {return {...prevState,["arrivalDate"]: true};}));
                }
                else {
                    setRetData((prevState => { return { ...prevState, ["currBusinessSeats"]: prevState.currBusinessSeats + 1 }; }));
                }
            }
            else {

                if (myId === "dept") {
                    setDeptData((prevState => { return { ...prevState, ["currEconomySeats"]: prevState.currEconomySeats + 1 }; }));
                }
                else {
                    setRetData((prevState => { return { ...prevState, ["currEconomySeats"]: prevState.currEconomySeats + 1 }; }));
                }
            }
            if (myId === "dept") {
                console.log("myID = dept");
                var index = deptSeats.indexOf(number);
                if (index > -1) {
                    setDeptData((prevState => prevState.reservedSeats.filter(item => item !== number)));
                    // setDeptSeats(prevDeptSeats => prevDeptSeats.filter(item => item !== number));
                }
                // setDeptData(prevState => {return {...prevState, ["reservedSeats"]:[...deptData.reservedSeats, number]};});
            }
            else {
                console.log("myID = return ");
                var index = deptSeats.indexOf(number);

                if (index > -1) {
                    setRetData((prevState => prevState.reservedSeats.filter(item => item !== number)));
                    // setDeptSeats(prevDeptSeats => prevDeptSeats.filter(item => item !== number));
                }
                // console.log(deptData);
                // setRetData(prevState => {return {...prevState, ["reservedSeats"]:[...retData.reservedSeats, number]};});
                // console.log(retData);
            }
        },
        maxReservableSeats: 0
    };

    //   SeatPicker.defaultProps = {

    //     removeSeatCallback: function removeSeatCallback(row, number, id) {
    //       console.log('Removed seat ' + number + ', row ' + row + ', id ' + id);
    //     //   if (cabin === "Business" || cabin ==="business" ) {
    //     //       if(props.myId === "dept"){
    //     //         // setDeptData( currBusinessSeats+ 1);
    //     //         setDeptData((prevState => {return {...prevState,["currBusinessSeats"]: currBusinessSeats +1};}));
    //     //       }
    //     //       else{
    //     //           setRetData((prevState => {return {...prevState,["currBusinessSeats"]: currBusinessSeats +1};}));
    //     //       }
    //     //   }
    //     //   else {
    //     //     if(props.myId === "dept"){
    //     //         // setDeptData( currBusinessSeats+ 1);
    //     //         setDeptData((prevState => {return {...prevState,["currEconomySeats"]: currEconomySeats +1};}));
    //     //       }
    //     //       else{
    //     //           setRetData((prevState => {return {...prevState,["currEconomySeats"]: currEconomySeats +1};}));
    //     //       }
    //           //IF COND HENAAAAAA
    //         // setCurrEconSeats( currEconSeats + 1);
    //       }
    // //  BRING THIS PART BACK
    //     //   if(props.myId === "dept"){
    //     //   var index = deptSeats.indexOf(number);
    //     //   if (index > -1) {
    //     //     setDeptData((prevState => prevState.reservedSeats.filter(item => item !== number)));
    //     //     // setDeptSeats(prevDeptSeats => prevDeptSeats.filter(item => item !== number));
    //     //   }
    //     // }
    //     //   else{
    //     //     var index = retSeats.indexOf(number);
    //     //   if (index > -1) {
    //     //     setRetData((prevState => prevState.reservedSeats.filter(item => item !== number)));
    //     //     // setRetSeats(prevRetSeats => prevRetSeats.filter(item => item !== number));
    //     //   }
    //     //   }
    //     //................................................
    //     //   console.log(currBusSeats);
    //     //   console.log(currEconSeats);
    //     //   console.log(deptSeats);
    //     //   console.log(retSeats);
    //     // },
    //   };
    //........................

    const onSubmitRet = (e) =>{
        console.log("IM HEREEEE PPL");
        console.log(e.target.myId);
        console.log(e.target);
    };
    const onSubmit = () => {

        // axios.post()//update flight curr seats for both flights 

        axios.post('http://localhost:8000/user/res', {
            body:
            {
                resID: resID,
                adultsNo: key.adultsNo,
                childrenNo: key.childrenNo,
                seatClass: key.type,
                deptFlight: key.flight.flightNo,
                arrFlight: key.ReturnFlight.flightNo,
                deptSeats: deptData.reservedSeats, //...............
                arrSeats: retData.reservedSeats //lessaaaaaaaaaa
            }
        }).then(res => {
            console.log(res.data);
            setResId(resID + 1); //brdo lessaaaaaaaaa
            setReserved(true);
        }).catch(err => console.log(err))
    };


    return (
        <div>
            <Header
                absolute
                brand="OverReact"
                fixed={true}
                rightLinks={<HeaderLinks isLogged={true} />}
                {...rest}
            />

            {/* <Parallax filter image={require("./../../assets/img/cloud.jpg").default}/> */}
            <div
                className={classes.pageHeader}
                style={{
                    // backgroundColor:"rgb(229, 229, 255)",
                    backgroundImage: "url(" + image + ")",

                    backgroundSize: "cover",
                    backgroundPosition: "top center",

                }}
            >

                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12}>
                            <NavPills
                                alignCenter
                                color="primary"
                                tabs={[
                                    {
                                        tabButton: " Choose Seats",
                                        tabIcon: AirlineSeatReclineExtraIcon,
                                        tabContent: (
                                            <GridContainer justify="center">
                                                {loading2 || loading ? <CustomLinearProgress color="info" /> :
                                                    <GridItem xs={12} sm={12}>
                                                        <Typography> <h3>Choose your seats - copy class</h3></Typography>

                                                        <div >
                                                            <h4>Departure flight</h4>
                                                            <SeatPicker
                                                                myId="dept"
                                                                rows={deptRows} maxReservableSeats={passengers} visible />
                                                            {/* <Button
                                                            id= "dept" 
                                                            color="danger"
                                                            size="lg"
                                                            onClick={(e) => { onSubmit2(e); }}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Save seats
                                                        </Button> */}
                                                        </div>
                                                        <div >
                                                            <h4>Return flight</h4>
                                                            <SeatPicker
                                                                myId="ret"
                                                                // onClick={(e) => { onSubmitRet(e); }}
                                                                rows={retRows} maxReservableSeats={passengers} visible />
                                                            {/* <Button
                                                            id= "return" 
                                                            color="danger"
                                                            size="lg"
                                                            onClick={(e) => { onSubmit2(e); }}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Save seats
                                                        </Button> */}
                                                        </div>
                                                        {/* <div>                                                        
                                                        <SeatPicker rows={retRows} maxReservableSeats={passengers} visible />
                                                        </div> */}

                                                    </GridItem>}
                                            </GridContainer>
                                        ),
                                    },

                                    {
                                        tabButton: " Confirm Reservation",
                                        tabIcon: CheckIcon,
                                        tabContent: (
                                            <div>
                                                {reserved ? <SnackbarContent
                                                    message={
                                                        <span>
                                                            <b>Reservation Confirmed!</b> reservation # {resID - 1}   Have a nice flight
                                                        </span>
                                                    }
                                                    close
                                                    color="success"
                                                    icon={Check}
                                                /> : null}
                                                <GridContainer justify="center">

                                                    {/* check chosenseats == passengers */}
                                                    <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>
                                                        <Button
                                                            color="danger"
                                                            size="lg"
                                                            onClick={(e) => { onSubmit(e); }}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Reserve
                                                        </Button>
                                                    </GridItem>
                                                </GridContainer>
                                            </div>
                                        ),
                                    },
                                ]}
                            />
                        </GridItem>
                    </GridContainer>

                </div>
            </div>

            <Footer />
        </div>
    );
}