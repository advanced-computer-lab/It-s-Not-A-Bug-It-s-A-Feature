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

import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import Card from "./../../components/Card/Card.js";
import CardBody from "./../../components/Card/CardBody.js";
import CardHeader from "./../../components/Card/CardHeader.js";
import CardFooter from "./../../components/Card/CardFooter.js";
import CustomInput from "./../../components/CustomInput/CustomInput.js";
import LockIcon from '@mui/icons-material/Lock';
import CustomLinearProgress from "./../../components/CustomLinearProgress/CustomLinearProgress.js";
import CustomDropdown from "./../../components/CustomDropdown/CustomDropdown.js";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Reservation from "./../../components/Reservation/Reservation.js";
import michael from "./../../assets/img/faces/michael.jpg";
import gego from "./../../assets/img/faces/khadija.jpg";
import cloud from "./../../assets/img/cloud.jpg";

import styles from "./../../assets/jss/material-kit-react/views/profilePage.js";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ContactsOutlined, SentimentDissatisfiedRounded } from "@material-ui/icons";
const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const [MyReservation, setMyReservation] = useState([]);
  const [Profile, setProfile] = useState([]);
  const [age, setage] = useState([]);
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
  let history = useHistory();

  function agee(){
    if(Profile.birthDate){
     return getAge(Profile.birthDate);
    }
    return Profile.age;
  }
  function getAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get('http://localhost:8000/user/myReservations', {
      headers: {
        'authorization': token
      }
    })
      .then(res => {
        if (res.data.message === "Please log in to continue.") {
          history.push("/error");
        }
        else {
          setMyReservation(res.data);
          console.log("Reservation");
          console.log(res); setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        history.push("/error");
      });
      console.log("MyReservation");
console.log(MyReservation);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get('http://localhost:8000/user/editProfile/', {
      headers: {
        'authorization': token
      }
    })
      .then(res => {
        if (res.data === "Access not allowed. Please login to proceed.") {
          history.push("/error");
        }
        else {
          setProfile(res.data);setage(agee()); console.log(res);
          setProfileEdit(res.data);
        }
      }
      ).catch(err => {
        console.log(err);
        history.push("/error");
      });

  }, []);

  function onCancel(reserv) {
    // confirmation alert is shown before deletion
    const resNo = (reserv).reservationID;
    const r = window.confirm("Do you really want to Cancel Reservation " + resNo + " ?");//change
    if (r === true) {
      const id = (reserv)._id;
      axios.post(`http://localhost:8000/user/cancelReservation/${id}`, {
        headers: {
          'authorization': token
        }
      })
        .then((response) => {
          window.location.reload(true);
        })

    }


  }
  function sendItinerary(email, resID) {
    //TODO
  }
  function editRes(resID) {
    history.push({
      pathname: "/editResFront",
      state: {

        // adultsNo: key.adultsNo,
        // childrenNo: key.childrenNo,
        // seatClass: key.cabin,
        // deptFlight: key.flight,
        // arrFlight: key.ReturnFlight,
        // deptSeats: reservedSeats2,
        // arrSeats: reservedSeats3,
        // totalPrice: price
      }

    });
  }

  const onEdit = () => {
    const token = localStorage.getItem("token");
    axios.post('http://localhost:8000/user/editProfile/', ProfileEdit, {
      headers: {
        'authorization': token
      }
    })
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
        image={require("./../../assets/img/cloud.jpg").default}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    {(Profile.username === "gego") ? <img src={gego} alt="..." className={imageClasses} />
                      :
                      <img src={cloud} alt="..." className={imageClasses} />}
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
                                <b>Phone Number : </b> 0{Profile.phoneNo}
                              </GridItem>
                              {Profile.phoneNoOptional &&
                              <GridItem xs={12} sm={12}  >
                                <b>2nd Phone Number : </b> 0{Profile.phoneNoOptional}
                              </GridItem>}
                              <GridItem xs={12} sm={12}  >
                                <b>CreditCard Number : </b> {Profile.creditCardNo}
                              </GridItem>
                              <GridItem xs={12} sm={12}  >
                                <b>Passport Number : </b> {Profile.passportNo}
                              </GridItem>
                              <GridItem xs={12} sm={12}  >
                                <b>Age : </b> {age}
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
                                    <GridContainer justify="center"></GridContainer>
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
                                    <GridContainer justify="center">
                                      
                                       <GridItem xs={12} sm={3}>
                                       <Button
                                          color="primary"
                                          size="lg"
                                          id="demo-customized-button"
                                          aria-controls="demo-customized-menu"
                                          aria-haspopup="true"
                                          variant="contained"
                                          // disableElevation
                                          onClick={(e) => {
                                            //check el input bta3 el method dy
                                            sendItinerary(Profile._id, curr.reservation.resID);
                                          }}
                                        >Send me my itinerary</Button>
                                       </GridItem>
                                       <GridItem  xs={12} sm={1} ></GridItem>
                                       <GridItem  xs={12} sm={3}  justify="center">
                                       <CustomDropdown
                                          noLiPadding
                                          buttonText={"Edit"}
                                          buttonProps={{
                                            size: "lg",
                                            id: "demo-customized-button",
                                            variant: "contained",
                                            className: classes.navLink,
                                            color: "warning",
                                          }}
                                          dropdownList={[
                                            <a className={classes.dropdownLink}
                                              onClick={() => {
                                                history.push({
                                                  pathname: "/changeDept",
                                                  state: { 
                                                  
                                                   res:curr,
                                                   type:"Dept"
                                                  }
                                            
                                                });
                                              }
                                                 }>
                                              <h4>    change departure flight   </h4>
                                            </a>,
                                            <a
                                              className={classes.dropdownLink}
                                              onClick={(e) => { history.push("/"); }}>
                                              <h4>     change return flight   </h4>
                                            </a>,
                                            <a
                                              className={classes.dropdownLink}
                                              onClick={(e) => {
                                                history.push({
                                                  pathname: "/changeSeats",
                                                  state: {
                                                    resID: curr.reservation.resID,
                                                    id:curr.reservation._id
                                                  }

                                                });
                                              }}>
                                              <h4>     switch seats    </h4>
                                            </a>,
                                          ]}
                                        />
                                       </GridItem>
                                       <GridItem  xs={12} sm={3}>

                                       <Button
                                          color="danger"
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
                                       
                                        {/* TRANSPARENT BUTTON */}
                                        {/* <Button alignItems="right"
                                          color="transparent"
                                          // color="transparent"
                                          size="lg"
                                          id="demo-customized-button"
                                          aria-controls="demo-customized-menu"
                                          aria-haspopup="true"
                                          variant="contained"
                                        > </Button> */}
                                        
                                    </GridContainer>
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
