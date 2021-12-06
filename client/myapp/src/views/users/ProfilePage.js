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
import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import Header from "./../../components/Header/Header.js";
import Footer from "./../../components/Footer/Footer.js";
import Button from "./../../components/CustomButtons/Button.js";
import GridContainer from "./../../components/Grid/GridContainer.js";
import GridItem from "./../../components/Grid/GridItem.js";
import HeaderLinks from "./../../components/Header/HeaderLinks.js";
import NavPills from "./../../components/NavPills/NavPills.js";
import Parallax from "./../../components/Parallax/Parallax.js";


import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import Card from "./../../components/Card/Card.js";
import CardBody from "./../../components/Card/CardBody.js";
import CardHeader from "./../../components/Card/CardHeader.js";
import CardFooter from "./../../components/Card/CardFooter.js";
import CustomInput from "./../../components/CustomInput/CustomInput.js";
import LockIcon from '@mui/icons-material/Lock';
import CustomLinearProgress from "./../../components/CustomLinearProgress/CustomLinearProgress.js";


import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";


import Reservation from "./../../components/Reservation/Reservation.js";
import profile from "./../../assets/img/faces/michael.jpg";


import styles from "./../../assets/jss/material-kit-react/views/profilePage.js";

import { useState, useEffect } from 'react';
import axios from 'axios';
const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const [MyReservation, setMyReservation] = useState([]);
  const [Profile, setProfile] = useState([]);
  const [ProfileEdit, setProfileEdit] = useState([]);
  const [loading, setLoading] = useState(true);

  const [edit, setedit] = useState(null);
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  useEffect(() => {
    axios.get('http://localhost:8000/user/myReservations')
      .then(res => { setMyReservation(res.data); console.log(res); setLoading(false); }).catch(err => console.log(err));

  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/user/editProfile/')
      .then(res => {
        setProfile(res.data); console.log(res);
        setProfileEdit(res.data);
      }
      ).catch(err => console.log(err));

  }, []);

  function onCancel(reserv) {
    // confirmation alert is shown before deletion
    const resNo = (reserv).reservationID;
    const r = window.confirm("Do you really want to Cancel Reservation " + resNo + " ?");
    if (r === true) {
      const id = (reserv)._id;
      axios.post(`http://localhost:8000/user/cancelReservation/${id}`)
        .then((response) => {
          window.location.reload(true);
        })

    }


  }

  const onEdit = () => {
    axios.post('http://localhost:8000/user/editProfile/', ProfileEdit)
      .then(res => { setProfile(ProfileEdit); setedit(null); }
      ).catch(err => console.log(err));
  }
  return (
    <div>
      <Header
        color="transparent"
        brand="OverReact"
        rightLinks={<HeaderLinks isLogged={true} />}
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
                    <h3 className={classes.title}>{Profile.firstName} {Profile.lastName}</h3>
                    <h6>Software Engineer</h6>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                It’s hard enough to find an error in your code when you’re looking for it; its even harder when you’ve ASSUMED your code is ERROR-FREE.{" "}
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
                        <div>

                          {!edit &&


                            <GridContainer justify="flex-start" justifyContent="flex-start" alignItems="left">
                              <GridItem xs={12} sm={12} justifyContent="flex-start" alignItems="left">
                                <b>UserName : </b> {Profile.username}
                              </GridItem>
                              <GridItem xs={12} sm={12}  >
                                <b>First Name :</b> {Profile.firstName}
                              </GridItem>
                              <GridItem xs={12} sm={12}  >
                                <b>Last Name : </b> {Profile.lastName}
                              </GridItem>
                              <GridItem xs={12} sm={12}  >
                                <b>Email : </b> {Profile.email}
                              </GridItem>
                              <GridItem xs={12} sm={12}  >
                                <b>Phone Number : </b> {Profile.phoneNo}
                              </GridItem>
                              <GridItem xs={12} sm={12}  >
                                <b>CreditCard Number : </b> {Profile.creditCardNo}
                              </GridItem>
                              <GridItem xs={12} sm={12}  >
                                <b>Passport Number : </b> {Profile.passportNo}
                              </GridItem>
                              <GridItem xs={12} sm={12}  >
                                <b>Age : </b> {Profile.age}
                              </GridItem>
                              <GridItem xs={12} sm={12}  >
                                <b>Address : </b> {Profile.address}
                              </GridItem>

                              <GridItem xs={12} sm={12}  >
                                <br />
                                <Button
                                  color="warning"
                                  // color="transparent"
                                  size="lg"
                                  id="demo-customized-button"
                                  aria-controls="demo-customized-menu"
                                  aria-haspopup="true"
                                  variant="contained"
                                  // disableElevation
                                  onClick={(e) => {
                                    setedit(true);
                                  }}
                                >Edit </Button>
                              </GridItem>
                            </GridContainer>


                          }
                          {edit &&
                            <GridContainer justify="center" >

                              <GridItem xs={12} sm={12}>

                                <form className={classes.form}>
                                  <CardBody>
                                    <TextField

                                      label="First Name..."
                                      id="firstName"
                                      name="firstName"
                                      variant="standard"
                                      value={ProfileEdit.firstName}
                                      fullWidth
                                      onChange=
                                      {(event) => {
                                        const { name, value } = event.target;
                                        setProfileEdit((prevState => { return { ...prevState, [name]: value }; }));
                                      }}
                                    />
                                    <br /><br />
                                    <TextField

                                      label="Last Name"
                                      id="lastName"
                                      name="lastName"
                                      variant="standard"
                                      value={ProfileEdit.lastName}
                                      fullWidth
                                      onChange=
                                      {(event) => {
                                        const { name, value } = event.target;
                                        setProfileEdit((prevState => { return { ...prevState, [name]: value }; }));
                                      }}
                                    />
                                    <br /><br />

                                    <TextField

                                      label="Email"
                                      id="email"
                                      name="email"
                                      variant="standard"
                                      value={ProfileEdit.email}
                                      fullWidth
                                      onChange=
                                      {(event) => {
                                        const { name, value } = event.target;
                                        setProfileEdit((prevState => { return { ...prevState, [name]: value }; }));
                                      }}
                                    />
                                    <br /><br />

                                    <TextField

                                      label="Passport Number"
                                      id="passportNo"
                                      name="passportNo"
                                      variant="standard"
                                      value={ProfileEdit.passportNo}
                                      fullWidth
                                      onChange=
                                      {(event) => {
                                        const { name, value } = event.target;
                                        setProfileEdit((prevState => { return { ...prevState, [name]: value }; }));
                                      }}
                                    />
                                    <br /><br />
                                    <Button alignItems="right"
                                      color="transparent"
                                      // color="transparent"
                                      size="lg"
                                      id="demo-customized-button"
                                      aria-controls="demo-customized-menu"
                                      aria-haspopup="true"
                                      variant="contained"
                                      // disableElevation
                                      onClick={(e) => {
                                        setedit(null);
                                      }}
                                    >Cancel </Button>

                                    <Button
                                      color="warning"
                                      // color="transparent"
                                      size="lg"
                                      id="demo-customized-button"
                                      aria-controls="demo-customized-menu"
                                      aria-haspopup="true"
                                      variant="contained"
                                      // disableElevation
                                      onClick={(e) => {
                                        onEdit(e);
                                      }}
                                    >Save </Button>




                                  </CardBody>
                                </form>


                              </GridItem>
                            </GridContainer>
                          }
                        </div>


                      ),
                    },
                    {
                      tabButton: "Upcoming Flights",
                      tabIcon: FlightTakeoffIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          {loading ? <CustomLinearProgress color="info" /> :
                          <GridContainer justify="center">
                            {
                              MyReservation.map((curr) => (

                                <div>
                                  <GridItem xs={12} sm={12}>
                                    <Reservation
                                      deptFlight={curr.deptFlight}
                                      count={curr.reservation.adultsNo}
                                      seatClass={curr.reservation.seatClass}
                                      reservationID={curr.reservation.reservationID}
                                      deptSeats={curr.reservation.deptSeats}
                                      arrFlight={curr.arrFlight}
                                      arrSeats={curr.reservation.arrSeats}
                                      totalPrice={curr.reservation.price}
                                      child={curr.reservation.childrenNo}
                                      adult={curr.reservation.adultsNo}
                                    ></Reservation>


                                  </GridItem>
                                  <GridItem xs={12} sm={12} style={{ textAlign: "center" }}>

                                    <Button
                                      color="warning"
                                      // color="transparent"
                                      size="lg"
                                      id="demo-customized-button"
                                      aria-controls="demo-customized-menu"
                                      aria-haspopup="true"
                                      variant="contained"
                                      // disableElevation
                                      onClick={(e) => {
                                        onCancel(curr.reservation);
                                      }}
                                    >Cancel Reservation </Button>
                                  </GridItem>
                                  <br /><br />
                                </div>

                              ))
                            }
                            </GridContainer>}
                        </GridContainer>

                      ),
                    },
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
