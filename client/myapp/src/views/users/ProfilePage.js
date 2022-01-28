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

// for password
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
//_________________

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

import SnackbarContent from "./../../components/Snackbar/SnackbarContent.js";
import Check from "@material-ui/icons/Check";


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
import buzz from "./../../assets/img/faces/buzz.jpg";
import tom from "./../../assets/img/faces/tom.jpg";

import "animate.css";
import "react-notifications-component/dist/theme.css";
import { store } from 'react-notifications-component';
import cloud from "./../../assets/img/cloud.jpg";
// import { NotificationContainer, NotificationManager } from 'react-notifications';
import ReactNotifications from 'react-notifications-component';

import styles from "./../../assets/jss/material-kit-react/views/profilePage.js";
import { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true


import { useHistory } from 'react-router-dom';
import { ContactsOutlined, SentimentDissatisfiedRounded } from "@material-ui/icons";
const useStyles = makeStyles(styles);

export default function ProfilePage(props) {



  /// password



  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
});
const [values1, setValues1] = React.useState({
    password: '',
    showPassword: false,
});
const [values2, setValues2] = React.useState({
  password: '',
  showPassword: false,
});
const handleClickShowPassword = () => {
    setValues({
        ...values,
        showPassword: !values.showPassword,
    });
};
const handleMouseDownPassword = (event) => {
    event.preventDefault();
};
const handleClickShowPassword1 = () => {
    setValues1({
        ...values1,
        showPassword: !values1.showPassword,
    });
};
const handleClickShowPassword2 = () => {
  setValues2({
      ...values2,
      showPassword: !values2.showPassword,
  });
};
const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
};
const handleMouseDownPassword2 = (event) => {
  event.preventDefault();
};
const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
};
const handleChange1 = (prop) => (event) => {
    setValues1({ ...values1, [prop]: event.target.value });
};

const handleChange2 = (prop) => (event) => {
  setValues2({ ...values2, [prop]: event.target.value });
};





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
  const [editPass, seteditPass] = useState(null);
  const [pass, setpass] = useState("");
  const [confirmError, setconfirmError] = useState(false);
  const [confirmPass, setconfirmPass] = useState("");
  const [oldPass, setoldPass] = useState("");
  const [confirmMess, setconfirmMess] = useState("");


  const [message, setmessage] = useState(null);
  const [successMess, setsuccess] = useState(null);
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  let history = useHistory();

  function agee() {
    if (Profile.birthDate) {
      return getAge(Profile.birthDate);
      
    }
    return Profile.age;
  }
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get('http://localhost:8000/user/myReservations', {
      headers: {
        'authorization': token,
      }
    })
      .then(res => {
        if (res.data.message === "Please log in to continue.") {
          history.push("/error");
        }
        else {
          setMyReservation(res.data);
          console.log("Reservation");
          console.log(res);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        history.push("/error");
      });
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
          setProfile(res.data); console.log(res);
          setProfileEdit(res.data);
          if (res.data.birthDate) {
             setage(getAge(res.data.birthDate));
            
          }
          else
          setage(getAge(res.data.age));
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
      const token = localStorage.getItem("token");
      axios.post(`http://localhost:8000/user/cancelReservation/${id}`, [], {
        headers: {
          'authorization': token
        }
      })
        .then((response) => {
          if (response.data === "Reservation not found." 
          || response.data ==="Cannot cancel reservation because less than 48 hours are left.") {
            store.addNotification({
              title: "Error",
              message:response.data,
              type: "danger",
              container: 'top-right',
              insert: "top",
              animationIn: ["animated", "fadeIn"],
              animationOut: ["animated", "fadeOut"],
              dismiss: {
                duration: 3000
              },
              width: 400
            });
          }
          else {
            store.addNotification({
              title: "Done",
              message: "Reservation canceled",
              type: "info",
              container: 'top-right',
              insert: "top",
              animationIn: ["animated", "fadeIn"],
              animationOut: ["animated", "fadeOut"],
              dismiss: {
                duration: 3000
              },
              width: 400
            });
            window.location.reload(true);
          }

        })

    }


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

  const onChangePass = () => {

    if (confirmError === false && pass !== "" && oldPass !== "" && confirmPass !== "") {
      const token = localStorage.getItem("token");
      axios.post('http://localhost:8000/user/changePassword/', {

        old: oldPass,
        new: pass

      }, {
        headers: {
          'authorization': token
        }
      })
        .then(res => {
          if (res.data.message === "Password updated successfully.") {
            seteditPass(null);
            setconfirmError(false); setconfirmPass("");
            setpass("");
            setoldPass("");
            setconfirmMess("");
            setsuccess(res.data.message);

          }
          else {
            setmessage(res.data.message);
          }
        }
        ).catch(err => { console.log(err) });
    }
    else {
      if (pass === "" || oldPass === "" || confirmPass === "") {
        setmessage("Please Fill all the Fields");
      }
    }
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
                      :(Profile.username === "tom") ? <img src={tom} alt="..." className={imageClasses} />:
                      <img src={buzz} alt="..." className={imageClasses} />}
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

                          {!edit && !editPass &&


                            <GridContainer justify="center">
                              {successMess ?
                                <GridItem xs={12} sm={12}>
                                  {/* <SnackbarContent

                                    message={
                                      <span>
                                        {successMess}
                                      </span>
                                    }
                                    close
                                    color="success"
                                    icon={Check}
                                  /> */}
                                  {store.addNotification({
                                    title: 'Done',
                                    message: successMess,
                                    type: 'success',
                                    container: 'top-right',
                                    insert: "top",
                                    animationIn: ["animated", "fadeIn"],
                                    animationOut: ["animated", "fadeOut"],
                                    dismiss: {
                                      duration: 3000
                                    },
                                    width: 400
                                  }),
                                    setsuccess(null)}


                                </GridItem> : null}
                              <GridItem xs={12} sm={12} >
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

                              <GridItem xs={8} sm={4} textAlign='center' >
                                <br />
                                <Button
                                  color="danger"
                                  size="lg"
                                  id="demo-customized-button"
                                  aria-controls="demo-customized-menu"
                                  aria-haspopup="true"
                                  variant="contained"
                                  // disableElevation
                                  onClick={(e) => {
                                    seteditPass(true);
                                  }}
                                >Change Password</Button>
                              </GridItem>
                              <GridItem xs={8} sm={4} textAlign='center' >
                                <br />
                                <Button
                                  color="warning"
                                  size="lg"
                                  id="demo-customized-button"
                                  aria-controls="demo-customized-menu"
                                  aria-haspopup="true"
                                  variant="contained"
                                  // disableElevation
                                  onClick={(e) => {
                                    setedit(true);
                                  }}
                                >Edit Info</Button>
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
                          {editPass &&
                            <GridContainer justify="center" >
                              {message ?
                                <GridItem xs={12} xm={12}>
                                  {/* <SnackbarContent
                                    message={
                                      <span>
                                        {message}
                                      </span>
                                    }
                                    close
                                    color="danger"

                                  /> */}
                                  {
                                    setmessage(null),
                                    store.addNotification({
                                      title: 'Invalid',
                                      message: message,
                                      type: 'danger',
                                      container: 'top-right',
                                      insert: "top",
                                      animationIn: ["animated", "fadeIn"],
                                      animationOut: ["animated", "fadeOut"],
                                      dismiss: {
                                        duration: 3000
                                      },
                                      width: 400
                                    })

                                  }
                                </GridItem> : null}

                              <GridItem xs={6} sm={6}>

                                <form className={classes.form}>
                                  <CardBody>
                                    <TextField
                                      required
                                      label="Curr Password"
                                      id="oldPass"
                                      name="oldPass"
                                      variant="standard"
                                      value={oldPass}
                                      type={values.showPassword ? "text" : "password"}
                                      fullWidth
                                      InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>,
                                    }}
                                    onChange=
                                    {(event) => {
                                      setoldPass(event.target.value);
                                      handleChange('password')

                                    }}
                                    // onChange={handleChange('password')}
                                     
                                    />
                                    <br /><br />
                                    <TextField
                                      required
                                      label="New Password"
                                      id="newPass"
                                      name="newPass"
                                      variant="standard"
                                      value={pass}
                                      type={values1.showPassword ? "text" : "password"}
                                      fullWidth
                                      InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword1}
                                                onMouseDown={handleMouseDownPassword1}
                                                edge="end"
                                            >
                                                {values1.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>,
                                    }}
                                      onChange=
                                      {(event) => {
                                        setpass(event.target.value);
                                        handleChange1('password');

                                      }}
                                      // onChange={handleChange1('password')}
                                    />
                                    <br /><br />
                                    <TextField
                                      label="Confirm New Password"
                                      required
                                      id="newPass"
                                      name="newPass"
                                      variant="standard"
                                      value={confirmPass}
                                      type={values2.showPassword ? "text" : "password"}
                                      fullWidth
                                      error={confirmError}
                                      helperText={confirmMess}
                                      InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword2}
                                                onMouseDown={handleMouseDownPassword2}
                                                edge="end"
                                            >
                                                {values2.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>,
                                    }}
                                      onChange=
                                      {(event) => {
                                        handleChange2('password');
                                        setconfirmPass(event.target.value);
                                        if (event.target.value === pass) {
                                          setconfirmError(false);
                                          setconfirmMess("");
                                        }
                                        else {
                                          setconfirmError(true);
                                          setconfirmMess("Passwords do not match");
                                        }



                                      }}
                                      // onChange={handleChange2('password')}
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
                                        seteditPass(null);
                                        setconfirmError(false); setconfirmPass("");
                                        setpass("");
                                        setoldPass("");
                                        setconfirmMess("");
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
                                        onChangePass(e);
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
                        <div className={classes.container}>
                          {loading ? <CustomLinearProgress color="info" /> :
                            <GridContainer justify="center">
                              {
                                MyReservation.map((curr) => (

                                  <GridContainer justify="center">
                                    <GridItem xs={8} sm={8}>
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

                                    <Grid container spacing={0} direction="row" justify="center" alignItems="center" >
                                      <Grid item xs textAlign='center'>
                                        <Button
                                          color="primary"
                                          size="lg"
                                          id="demo-customized-button"
                                          aria-controls="demo-customized-menu"
                                          aria-haspopup="true"
                                          variant="contained"
                                          // disableElevation
                                          onClick={(e) => {
                                            axios.post(`http://localhost:8000/user/sendItenrary/${id}`).then(res => {
                                              console.log(res.data);
                                            }).catch(err => console.log(err))
                                          }}
                                        >Send me my itinerary</Button>
                                      </Grid>
                                      {/* <GridItem  xs={12} sm={1} ></GridItem> */}
                                      <Grid item xs textAlign='center'>
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

                                                    res: curr,
                                                    type: "Dept"
                                                  }

                                                });
                                              }
                                              }>
                                              <h4>    change departure flight   </h4>
                                            </a>,
                                            <a
                                              className={classes.dropdownLink}
                                              onClick={(e) => {
                                                history.push({
                                                  pathname: "/changeRet",
                                                  state: {

                                                    res: curr,
                                                    type: "Ret"
                                                  }

                                                });
                                              }}>
                                              <h4>     change return flight   </h4>
                                            </a>,
                                            <a
                                              className={classes.dropdownLink}
                                              onClick={(e) => {
                                                history.push({
                                                  pathname: "/changeSeats",
                                                  state: {
                                                    resID: curr.reservation.resID,
                                                    id: curr.reservation._id
                                                  }

                                                });
                                              }}>
                                              <h4>     switch seats    </h4>
                                            </a>,
                                          ]}
                                        />
                                      </Grid>
                                      <Grid item xs textAlign='center'>

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
                                      </Grid>



                                    </Grid>
                                    <br /><br />

                                  </GridContainer>

                                ))
                              }
                            </GridContainer>}
                        </div>

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
