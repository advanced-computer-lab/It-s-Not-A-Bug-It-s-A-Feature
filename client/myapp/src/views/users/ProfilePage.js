import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Info from "@material-ui/icons/Info";
// import AirplaneTicketIcon from '@material-ui/icons/AirplaneTicket';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightLandIcon from '@material-ui/icons/FlightLand';
// import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "./../../components/Header/Header.js";
import Footer from "./../../components/Footer/Footer.js";
import Button from "./../../components/CustomButtons/Button.js";
import GridContainer from "./../../components/Grid/GridContainer.js";
import GridItem from "./../../components/Grid/GridItem.js";
import HeaderLinks from "./../../components/Header/HeaderLinks.js";
import NavPills from "./../../components/NavPills/NavPills.js";
import Parallax from "./../../components/Parallax/Parallax.js";



import Reservation from "./../../components/Reservation/Reservation.js";
import profile from "./../../assets/img/faces/christian.jpg";


import styles from "./../../assets/jss/material-kit-react/views/profilePage.js";

import {useState, useEffect} from 'react';
import axios from 'axios';
const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const [MyReservation, setMyReservation] = useState([]);
  const [Profile, setProfile] = useState([]);

  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  useEffect(()=>{
    axios.get('http://localhost:8000/user/myReservations')
  .then(res=> {setMyReservation(res.data);console.log(res)}).catch(err=>console.log(err))
  
 },[]);

 useEffect(()=>{
  axios.get('http://localhost:8000/user//editProfile/')
.then(res=> {setProfile(res.data);console.log(res)}).catch(err=>console.log(err))

},[]);

const onCancel= (reserv)=>{
  
 }
  return (
    <div>
      <Header
        color="transparent"
        brand="OverReact"
        rightLinks={<HeaderLinks isLogged = {true} />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax
        small
        filter
        image={require("./../../assets/img/profile-bg.jpg").default}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>Christian Louboutin</h3>
                    <h6>DESIGNER</h6>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-twitter"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-instagram"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-facebook"} />
                    </Button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                An artist of considerable range, Chet Faker — the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure.{" "}
              </p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "About",
                      tabIcon: Info,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={20} sm={20} md={20}>
        ////     details of our current user 
                          </GridItem>
                        </GridContainer>
                      ),
                    },
                    {
                      tabButton: "Upcoming Flights",
                      tabIcon: FlightTakeoffIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          {MyReservation.map((curr)=>(
                               
                              <div>     
                              <GridItem xs={12} sm={10}> 
                             
                             {/* <Reservation res={curr}/> */}
                                 
                                </GridItem>
                                <GridItem xs={12} sm={2}> 
                             
                                <Button 
                                  color = "warning"
                                  // color="transparent"
                                  size="lg"
                                  id="demo-customized-button"
                                  aria-controls="demo-customized-menu"
                                  aria-haspopup="true"
                                  variant="contained"
                                  // disableElevation
                                  onClick={(e) => {onCancel(curr);
                                  }}
                                  >Cancel Reservation</Button>
                                    
                                   </GridItem>
                                   </div>
                               
                            ))}
                         
                          
                        </GridContainer>
                      ),
                    },
                    // {
    //                   tabButton: "Past Reservations",
    //                   tabIcon: FlightLandIcon,
    //                   tabContent: (
    //                     <GridContainer justify="center">
    //                       <GridItem xs={20} sm={20} md={20}>

    //                       <Reservation flight={{
    //   flightNo:"45",
    //   economySeats:"45",businessSeats:"45",departureAirport:"Cairo",arrivalAirport:"ter",departureTerminal:"ter",arrivalTerminal:"bn",
    //   departureDate:"2016-05-12T21:29:00.000Z",arrivalDate:"2016-05-12T21:29:00.000Z",economyPrice:"25",businessPrice:"25",economyBaggage:"52",businessBaggage:"25"
    // }}
    //         type ="business"
    //         Number ="5"
    //         />
                           
                           
    //                       </GridItem>
    //                     </GridContainer>
    //                   ),
    //                 }
                    ,
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
