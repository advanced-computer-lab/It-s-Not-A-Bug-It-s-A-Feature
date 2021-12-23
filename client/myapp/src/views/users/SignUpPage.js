import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "./../../components/Header/Header.js";
import HeaderLinks from "./../../components/Header/HeaderLinks.js";
import Footer from "./../../components/Footer/Footer.js";
import GridContainer from "./../../components/Grid/GridContainer.js";
import GridItem from "./../../components/Grid/GridItem.js";
import Button from "./../../components/CustomButtons/Button.js";
import Card from "./../../components/Card/Card.js";
import CardBody from "./../../components/Card/CardBody.js";
import CardHeader from "./../../components/Card/CardHeader.js";
import CardFooter from "./../../components/Card/CardFooter.js";
import CustomInput from "./../../components/CustomInput/CustomInput.js";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LockIcon from '@mui/icons-material/Lock';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Check from "@material-ui/icons/Check";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import { Icon } from '@iconify/react';
import CustomDropdown from "./../../components/CustomDropdown/CustomDropdown.js";
import styles from "./../../assets/jss/material-kit-react/views/loginPage.js";
import axios from 'axios';
import image from "./../../assets/img/reg.jpeg";
import NavPills from "./../../components/NavPills/NavPills.js";
import TextField from '@mui/material/TextField';
// import countries from  "client/myapp/src/views/users/Country.json";

const useStyles = makeStyles(styles);

export default function SignUp(props) {

  //________________________ variables send to backend__________________________

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password1, setpassword1] = useState("");
  const [password2, setpassword2] = useState("");
  const [address, setaddress] = useState("");
  const [country, setcountry] = useState("");
  const [phone, setphone] = useState([]);
  const [birthdate, setbirthdate] = useState("");
  const [passport, setpassport] = useState("");
  const [credit, setcredit] = useState("");
  const [cvv, setcvv] = useState([]);
  const [expirydate, setexpirydate] = useState("");
  const [creditfirstname, setcreditfirstname] = useState("");
  const [creditlastname, setcreditlastname] = useState("");


  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  let history = useHistory();

  const [isLogged, setLogged] = useState(false);


  // errors handeling
  const onNext1 = (e) => {
    e.preventDefault();
  }
  // errors handeling
  const onNext2 = (e) => {
    e.preventDefault();
  };

  // signup
  const onSubmit = (e) => {
    e.preventDefault();

    // if (validateData()) {

    // axios.post('http://localhost:8000/admin/createFlight/' , flightData)
    // .then(res => alert('Flight Added Successfuly'), )
    // .catch((error) => {});
    history.push('/profile');
    // }
  };

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="OverReact"
        rightLinks={<HeaderLinks isLogged={isLogged} />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center" >
            <GridItem xs={12} sm={12} md={7}
            >
              <NavPills
                alignCenter
                color="primary"
                tabs={[
                  {
                    tabButton: "Step 1",
                    tabContent: (
                      <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={7}>
                          <Card className={classes[cardAnimaton]}
                            display="flex"
                            flex-flexdirection="row">

                            <form className={classes.form}>
                              <CardHeader color="primary" className={classes.cardHeader}>
                                <h3> Sign up </h3>
                              </CardHeader>

                              <CardBody  >
                                <h5> User details I </h5>
                                <GridContainer>


                                  <GridItem xs={12} sm={6}>
                                    <TextField
                                      required
                                      label="First Name"
                                      fullWidth
                                      value={firstname}
                                      variant="standard"
                                      onChange={(event) => {
                                        setfirstname(event.target.value);
                                      }}

                                    />
                                    {/* <CustomInput
                                      labelText="First name"
                                      id="FirstName"
                                      formControlProps={{
                                        fullWidth: true,
                                      }}
                                      inputProps={{
                                        type: "text",
                                        readOnly: false,
                                        onChange: (event) => {
                                          setfirstname(event.target.value);
                                        },
                                      }}
                                    /> */}
                                  </GridItem>
                                  <GridItem xs={12} sm={6} >
                                    {/* <CustomInput
                                      labelText="Last name"
                                      id="Last name"
                                      formControlProps={{
                                        fullWidth: true,
                                      }}
                                      inputProps={{
                                        type: "text",
                                        readOnly: false,
                                        onChange: (event) => {
                                          setlastname(event.target.value);
                                        },
                                      }}
                                    /> */}
                                    <TextField
                                      required
                                      label="Last Name"
                                      fullWidth
                                      value={lastname}
                                      variant="standard"
                                      onChange={(event) => {
                                        setlastname(event.target.value);
                                      }}

                                    />
                                  </GridItem>
                                  <GridItem xs={12} sm={12} >
                                    <TextField
                                      required
                                      label="Username"
                                      fullWidth
                                      value={username}
                                      variant="standard"
                                      onChange={(event) => {
                                        setusername(event.target.value);
                                      }}

                                    />
                                    {/* <CustomInput
                                      labelText="Username"
                                      id="Username"
                                      formControlProps={{
                                        fullWidth: true,
                                      }}
                                      inputProps={{
                                        type: "text",
                                        readOnly: false,
                                        onChange: (event) => {
                                          setusername(event.target.value);
                                        },
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <People className={classes.inputIconsColor} />
                                          </InputAdornment>
                                        ),
                                      }}
                                    /> */}
                                  </GridItem>
                                  <GridItem xs={12} sm={12} >
                                    <TextField
                                      required
                                      label="Email"
                                      fullWidth
                                      value={email}
                                      variant="standard"
                                      onChange={(event) => {
                                        setemail(event.target.value);
                                      }}

                                    />
                                    {/* <CustomInput
                                      labelText="Email"
                                      id="email"
                                      formControlProps={{
                                        fullWidth: true,
                                      }}
                                      inputProps={{
                                        type: "text",
                                        readOnly: false,
                                        onChange: (event) => {
                                          setemail(event.target.value);
                                        },
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <Email className={classes.inputIconsColor}>
                                            </Email>
                                          </InputAdornment>
                                        ),

                                      }}
                                    /> */}
                                  </GridItem>
                                  <GridItem xs={12} sm={12} >
                                    <TextField
                                      required
                                      label="Password"
                                      fullWidth
                                      type="password"
                                      value={password1}
                                      variant="standard"
                                      onChange={(event) => {
                                        setpassword1(event.target.value);
                                      }}

                                    />
                                    {/* <CustomInput
                                      labelText="Password"
                                      id="pass"
                                      formControlProps={{
                                        fullWidth: true,
                                      }}
                                      inputProps={{
                                        type: "password",
                                        readOnly: false,
                                        onChange: (event) => {
                                          setpassword1(event.target.value);

                                        },
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <LockIcon className={classes.inputIconsColor}>
                                            </LockIcon>
                                          </InputAdornment>
                                        ),
                                        autoComplete: "off",
                                      }}
                                    /> */}
                                  </GridItem>
                                  <GridItem xs={12} sm={12} >
                                    <TextField
                                      required
                                      label="Confirm Password"
                                      fullWidth
                                      type="password"
                                      value={password2}
                                      variant="standard"
                                      onChange={(event) => {
                                        setpassword2(event.target.value);
                                      }}

                                    />
                                    {/* <CustomInput
                                      labelText="Confirm password"
                                      id="confirm pass"
                                      formControlProps={{
                                        fullWidth: true,
                                      }}
                                      inputProps={{
                                        type: "password",
                                        onChange: (event) => {
                                          setpassword2(event.target.value);
                                        },
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <LockIcon className={classes.inputIconsColor}>
                                            </LockIcon>
                                          </InputAdornment>
                                        ),
                                        autoComplete: "off",
                                      }}
                                    /> */}
                                  </GridItem>
                                </GridContainer>
                              </CardBody>
                              <CardFooter className={classes.cardFooter}  >
                                <Button simple color="primary"
                                  size="lg"
                                // onClick={(e) => { onSubmit(e); }}
                                >
                                  Next
                                </Button>
                              </CardFooter>
                            </form>
                          </Card>
                        </GridItem>
                      </GridContainer>
                    ),
                  },
                  {
                    tabButton: "Step 2",
                    tabContent: (
                      <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={7}>
                          <Card className={classes[cardAnimaton]}
                            display="flex"
                            flex-flexdirection="row">

                            <form className={classes.form}>
                              <CardHeader color="warning" className={classes.cardHeader}>
                                <h3> Sign up </h3>
                              </CardHeader>

                              <CardBody  >
                                <h5> User details II </h5>
                                <GridContainer>
                                  <GridItem xs={12} sm={12}>
                                    <TextField
                                      required
                                      label="Address"
                                      fullWidth
                                      value={address}
                                      variant="standard"
                                      onChange={(event) => {
                                        setaddress(event.target.value);
                                      }}

                                    />
                                    {/* <CustomInput
                                      labelText="Address"
                                      id="address"
                                      formControlProps={{
                                        fullWidth: true,
                                      }}
                                      inputProps={{
                                        type: "text",
                                        onChange: (event) => {
                                          setaddress(event.target.value);
                                        },
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <HomeRoundedIcon className={classes.inputIconsColor}>
                                            </HomeRoundedIcon>
                                          </InputAdornment>
                                        ),

                                      }}
                                    /> */}
                                  </GridItem>
                                  <GridItem xs={12} sm={6} >
                                    <TextField
                                      required
                                      label="Select Country"
                                      fullWidth
                                      value={country}
                                      variant="standard"
                                      onChange={(event) => {
                                        setcountry(event.target.value);
                                      }}

                                    />
                                    {/* <CustomInput
                                      labelText="Select country"
                                      id="country"
                                      formControlProps={{
                                        fullWidth: true,
                                      }}
                                      inputProps={{
                                        type: "text",
                                        onChange: (event) => {
                                          setcountry(event.target.value);
                                        },
                                      }}
                                    /> */}
                                  </GridItem>
                                  <GridItem xs={12} sm={6}>
                                    <TextField
                                      required
                                      label="Phone Number"
                                      fullWidth
                                      value={phone}
                                      variant="standard"
                                      onChange={(event) => {
                                        setphone(event.target.value);
                                      }}

                                    />
                                    {/* <CustomInput
                                      labelText="Phone number"
                                      id="phone"
                                      formControlProps={{
                                        fullWidth: true,
                                      }}
                                      inputProps={{
                                        type: "text",
                                        onChange: (event) => {
                                          setphone(event.target.value);
                                        },
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <PhoneIphoneRoundedIcon className={classes.inputIconsColor}>
                                            </PhoneIphoneRoundedIcon>
                                          </InputAdornment>
                                        ),

                                      }}
                                    /> */}
                                  </GridItem>
                                  <GridItem xs={12} sm={6} >
                                    <TextField
                                      id="departureDate"
                                      label="Departure Date"
                                      type="date"
                                      value={birthdate}
                                      name="departureDate"
                                      defaultValue="2017-05-24"
                                      // sx={{ width: 220 }}
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      onChange={(event) => {
                                        const { name, value } = event.target;
                                        setbirthdate((prevState => {
                                          return {
                                            ...prevState,
                                            [name]: value
                                          };
                                        }));
                                      }
                                      }
                                    />
                                    {/* <CustomInput
                                      labelText=" "
                                      id="date"
                                      formControlProps={{
                                        fullWidth: true,
                                      }}
                                      inputProps={{
                                        type: "date",
                                      }}
                                    /> */}
                                  </GridItem>

                                  <GridItem xs={12} sm={6} >

                                    <TextField
                                      required
                                      label="Passport Number"
                                      fullWidth
                                      value={passport}
                                      variant="standard"
                                      onChange={(event) => {
                                        setpassport(event.target.value);
                                      }}

                                    />
                                    {/* <CustomInput
                                      labelText="Passport number"
                                      id="pssport"
                                      formControlProps={{
                                        fullWidth: true,
                                      }}
                                      inputProps={{
                                        type: "text",
                                        onChange: (event) => {
                                          setpassport(event.target.value);
                                        },
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <Icon icon="mdi:passport" width="26" height="27" className={classes.inputIconsColor} />
                                          </InputAdornment>
                                        ),

                                      }}
                                    /> */}
                                  </GridItem>



                                </GridContainer>
                              </CardBody>
                              <CardFooter className={classes.cardFooter}  >
                                <Button
                                  simple color="primary"
                                  size="lg">
                                  back
                                </Button>
                                <Button simple color="primary"
                                  size="lg"
                                // onClick={(e) => { onSubmit(e); }}
                                >
                                  Next
                                </Button>
                              </CardFooter>
                            </form>
                          </Card>
                        </GridItem>
                      </GridContainer>
                    ),
                  },
                  {
                    tabButton: "Step 3",
                    tabContent: (
                      <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={7}>

                          <Card className={classes[cardAnimaton]}
                            display="flex"
                            flex-flexdirection="row">

                            <form className={classes.form}>
                              <CardHeader color="info" className={classes.cardHeader}>
                                <h3> Sign up </h3>
                              </CardHeader>

                              <CardBody  >
                                <h5> Credit card details</h5>
                                <GridContainer>
                                  <GridItem xs={12} sm={6} >
                                    <TextField
                                      required
                                      label="Card Number"
                                      fullWidth
                                      value={credit}
                                      variant="standard"
                                      onChange={(event) => {
                                        setcredit(event.target.value);
                                      }}

                                    />
                                    {/* <CustomInput
                                      labelText="Credit card number "
                                      id="email"
                                      formControlProps={{
                                        fullWidth: true,
                                      }}
                                      inputProps={{
                                        type: "text",
                                        onChange: (event) => {
                                          setcredit(event.target.value);
                                        },

                                      }}
                                    /> */}
                                  </GridItem>

                                  <GridItem xs={12} sm={6} >
                                    <TextField
                                      required
                                      label="CVV"
                                      fullWidth
                                      value={cvv}
                                      variant="standard"
                                      onChange={(event) => {
                                        setcvv(event.target.value);
                                      }}

                                    />
                                    {/* <CustomInput
                                      labelText="CVV "
                                      id="cvv"
                                      formControlProps={{
                                        fullWidth: true,
                                      }}
                                      inputProps={{
                                        type: "text",
                                      }}
                                    /> */}
                                  </GridItem>

                                  <GridItem xs={12} sm={6}>
                                    <TextField
                                      required
                                      label="First Name"
                                      fullWidth
                                      value={creditfirstname}
                                      variant="standard"
                                      onChange={(event) => {
                                        setcreditfirstname(event.target.value);
                                      }}
                                    />
                                    {/* <CustomInput
                                      labelText="First name"
                                      id="First name"
                                      formControlProps={{
                                        fullWidth: true,
                                      }}
                                      inputProps={{
                                        type: "text",
                                      }}
                                    /> */}
                                  </GridItem>
                                  <GridItem xs={12} sm={6} >
                                    <TextField
                                      required
                                      label="Last Name"
                                      fullWidth
                                      value={creditlastname}
                                      variant="standard"
                                      onChange={(event) => {
                                        setcreditlastname(event.target.value);
                                      }}
                                    />
                                    {/* <CustomInput
                                      labelText="Last name"
                                      id="Last name"
                                      formControlProps={{
                                        fullWidth: true,
                                      }}
                                      inputProps={{
                                        type: "text",
                                      }}
                                    /> */}
                                  </GridItem>
                                  <GridItem xs={12} sm={6} >
                                    <TextField
                                      label="Expiry Date"
                                      type="date"
                                      value={expirydate}
                                      defaultValue="2017-05-24"
                                      sx={{ width: 220 }}
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      onChange={(event) => {
                                        const { name, value } = event.target;
                                        setexpirydate((prevState => {
                                          return {
                                            ...prevState,
                                            [name]: value
                                          };
                                        }));
                                      }
                                      }
                                    />
                                    {/* <CustomInput
                                      labelText=""
                                      id="date"
                                      formControlProps={{
                                        fullWidth: true,
                                      }}
                                      inputProps={{
                                        type: "date",
                                      }}
                                    /> */}
                                  </GridItem>


                                </GridContainer>
                              </CardBody>

                              <CardFooter className={classes.cardFooter}  >
                                <Button
                                  simple color="primary"
                                  size="lg">
                                  back
                                </Button>
                                <Button simple color="primary"
                                  size="lg"
                                  onClick={(e) => { onSubmit(e); }}
                                >
                                  Sign up
                                </Button>
                              </CardFooter>
                            </form>
                          </Card>
                        </GridItem>
                      </GridContainer>
                    ),
                  },
                ]}
              />

            </GridItem>
          </GridContainer>
        </div>

        <Footer whiteFont />

      </div>
    </div>
  );
}
