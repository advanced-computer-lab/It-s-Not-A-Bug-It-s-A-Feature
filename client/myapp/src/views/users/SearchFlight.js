import React from "react";
// @material-ui/core components

import classNames from "classnames";

import { makeStyles } from "@material-ui/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "./../../components/Header/Header.js";
import HeaderLinks from "./../../components/Header/HeaderLinks.js";
import Footer from "./../../components/Footer/Footer.js";
import GridContainer from "./../../components/Grid/GridContainer.js";
import GridItem from "./../../components/Grid/GridItem.js";
import NavPills from "./../../components/NavPills/NavPills.js";
import Parallax from "./../../components/Parallax/Parallax.js";
import Button from "./../../components/CustomButtons/Button.js";
import Card from "./../../components/Card/Card.js";
import CardBody from "./../../components/Card/CardBody.js";
import CardHeader from "./../../components/Card/CardHeader.js";
import CardFooter from "./../../components/Card/CardFooter.js";
import CustomInput from "./../../components/CustomInput/CustomInput.js";
import LockIcon from '@mui/icons-material/Lock';
import Flight from "./../../components/Flight/Flight.js";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {useState, useEffect} from 'react';



import profile from "./../../assets/img/faces/christian.jpg";

import Info from "@material-ui/icons/Info";
// import AirplaneTicketIcon from '@material-ui/icons/AirplaneTicket';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import CheckIcon from '@mui/icons-material/Check';

import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";

import studio1 from "./../../assets/img/examples/studio-1.jpg";
import studio2 from "./../../assets/img/examples/studio-2.jpg";
import studio3 from "./../../assets/img/examples/studio-3.jpg";
import studio4 from "./../../assets/img/examples/studio-4.jpg";
import studio5 from "./../../assets/img/examples/studio-5.jpg";
import work1 from "./../../assets/img/examples/olu-eletu.jpg";
import work2 from "./../../assets/img/examples/clem-onojeghuo.jpg";
import work3 from "./../../assets/img/examples/cynthia-del-rio.jpg";
import work4 from "./../../assets/img/examples/mariya-georgieva.jpg";
import work5 from "./../../assets/img/examples/clem-onojegaw.jpg";


import styles from "./../../assets/jss/material-kit-react/views/loginPage.js";

import image from "./../../assets/img/cloud.jpg";
const useStyles = makeStyles(styles);

// Sections for this page
import SearchBar from "./LandingPage/Sections/SearchSection";
import { PartyModeSharp } from "@material-ui/icons";

//import SectionBasics from "./Sections/SectionBasics.js";


export default function SearchFlight(props) {
    const location = useLocation();
 const key = location.state;
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  let history = useHistory();

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  const [depart, setDepart] =useState([]);
  const [returnn, setreturnn] =useState([]);

  const [selectedDepart, setselectedDepart] =useState([]);
  const [selectedReturn, setselectedReturn] =useState([]);


  // const location = useLocation();
  let isLogged = props.isLogged
  // const isLogged = usekeys();
   useEffect(()=>{
     console.log("new key is"+ key);
    axios.get('http://localhost:8000/user/searchFlights',{ params:
    {
      arrivalAirport:key.arrivalAirport,
      departureDate:key.departureDate,
      departureAirport:key.departureAirport,
      cabin:key.type,
      adultsNo:key.adultsNo,
      childrenNo:key.childrenNo
    }     
})
.then(res=> {
  // store data in a variable to be later used
  // setdepartFlights( res.data);
  setDepart(res.data);
  console.log(depart)
  console.log("di el depart flightsss")

}).catch(err=>console.log(err))

 axios.get('http://localhost:8000/user/searchFlights',{ params:
    {
      arrivalAirport:key.departureAirport,
      departureDate:key.arrivalDate,
      departureAirport:key.arrivalAirport,
      cabin:key.type,
      adultsNo:key.adultsNo,
      childrenNo:key.childrenNo
    }     
})
.then(res=> {
  // store data in a variable to be later used
  // setreturnFlights ( res.data);
  setreturnn(res.data);
  console.log("di el set" + returnn )
  console.log("di hia el return flight");
}).catch(err=>console.log(err))

   },[key]);


  return (
    <div>
      <Header
        absolute
        brand="OverReact"
        fixed={true}
        rightLinks={<HeaderLinks isLogged = {isLogged}/>}
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
          <SearchBar/>
          <GridContainer justify="center">
          <GridItem xs={12} sm={12}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Departure Flight",
                      tabIcon: FlightTakeoffIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          
                            {depart.map((curr)=>(
                               <Button color={(selectedDepart==curr)?'blue':'transparent'} onClick={(e) => {
                                 if(selectedDepart!=curr)setselectedDepart(curr);
                                 else setselectedDepart(null);}}>
                                   
                              <GridItem xs={12} sm={12}> 
                               
                                <Flight
                                flight={curr}
                                type={key.type}
                                Number={key.count}
                                
                                />
                                </GridItem>
                                </Button>
                            ))}
                          
                        </GridContainer>
                      ),
                    },
                    {
                      tabButton: " Return Flight",
                      tabIcon: FlightLandIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          {returnn.map((curr)=>(
                               <Button color={(selectedReturn==curr)?'blue':'transparent'} onClick={(e) => {
                                 if(selectedReturn!=curr)setselectedReturn(curr);
                                 else setselectedReturn(null);}}>
                                   
                              <GridItem xs={12} sm={12}> 
                               
                                <Flight
                                flight={curr}
                                type={key.type}
                                Number={key.count}
                                
                                />
                                </GridItem>
                                </Button>
                            ))}
                        </GridContainer>
                      ),
                    },
                    ,
                    {
                      tabButton: " Confirm Reservation",
                      tabIcon: CheckIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work4}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio3}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work2}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio1}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
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
