import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import { Icon } from '@iconify/react';
import CustomDropdown from "./../../components/CustomDropdown/CustomDropdown.js";
import styles from "./../../assets/jss/material-kit-react/views/loginPage.js";
import axios from 'axios';
import image from "./../../assets/img/reg.jpeg";
import NavPills from "./../../components/NavPills/NavPills.js";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';




import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
var worldMapData = require('city-state-country');

// const useStyles = makeStyles((theme) => ({
//   root: {

//     margin: theme.spacing(1),
//     height: "71px",
//     flex: 1,
//     // position: 'absolute',
//     direction: "flex",
//   },
//   text: {
//     display: "flex",
//     flexDirection: "row",
//     color: "black",

//   },


//   a: {
//     '&:hover': {
//       color: "grey",
//     },
//     textdecoration: "none!important",
//     color: "black"
//   },

//   testssss: {
//     height: "100px",
//     width: "100px",
//     backgroundcolor: "green"
//   }


// }
// ));



function searchCountry({ placeholder, data }) {


  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

}


const useStyles = makeStyles(styles);

export default function SignUp(props) {

  // search componenet
  const styles = useStyles({

  });



  const [pass, setpass] = useState("");

  const [placeholder, setplaceholder] = useState("Country");
  const [filteredData, setFilteredData] = useState([]);
  const [destination, setdestination] = useState("");
  const [wordEntered, setWordEntered] = useState("");
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    console.log("value", searchWord)
    setWordEntered(searchWord);
    const newFilter = worldMapData.searchCountry(searchWord)
    console.log("new filter", newFilter)
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
    console.log("filteredData", filteredData)

  };

  const final = null;
  const clicked = (value, e) => {
    setWordEntered(value.name);
    setcountry(value.name);
    setcountrycode(value.phoneCode);
    console.log({ wordEntered });
    console.log({ value });
    setFilteredData([]);
    console.log("destination", destination);
    console.log("lets see");
    console.log(value.name);
    console.log(value.phoneCode);

  };

  //// done
  


  //________________________ variables send to backend__________________________

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password1, setpassword1] = useState("");
  const [password2, setpassword2] = useState("");
  const [address, setaddress] = useState("");
  const [country, setcountry] = useState("");
  const [phone1, setphone1] = useState("");
  const [phone2, setphone2] = useState("");
  const [birthdate, setbirthdate] = useState(null);
  const [passport, setpassport] = useState("");
  const [credit, setcredit] = useState("");
  const [cvv, setcvv] = useState("");
  const [expirydate, setexpirydate] = useState(null);
  const [creditfirstname, setcreditfirstname] = useState("");
  const [creditlastname, setcreditlastname] = useState("");
  const [countrycode, setcountrycode] = useState("20");


  const currentdate = new Date(); // the date of today minm of the expirydate in credit card 

  // __________________________________________________ for password visibility _______________________________
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
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

  //_______________________________________________________________________________
  // signup
  const onSubmit = (e) => {
    // country code 
    axios.post('http://localhost:8000/user/register', {
      username: username,
      password: password1,
      email: email,
      firstName: firstname,
      lastName: lastname,
      address: address,
      countryCode: countrycode,
      phoneNo: phone1,
      nationality: country,
      creditCardNo: credit,
      passportNo: passport,
      phoneNoOptional: phone2,
      birthDate: birthdate,

    }).then(res => {

      console.log(res);
      console.log("signed up succesfully");
      history.push('/login');
    }).catch(err => console.log(err))

  }

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
                                  </GridItem>
                                  <GridItem xs={12} sm={6} >
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
                                  </GridItem>
                                  <GridItem xs={12} sm={12} >
                                    {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                      <Input
                                        id="outlined-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                          <InputAdornment position="end">
                                            <IconButton
                                              aria-label="toggle password visibility"
                                              onClick={handleClickShowPassword}
                                              onMouseDown={handleMouseDownPassword}
                                              edge="end"
                                            >
                                              {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                          </InputAdornment>
                                        }
                                        label="Password"
                                      />
                                    </FormControl> */}

                                    <TextField
                                      required
                                      label="Confirm Password"
                                      fullWidth
                                      type="password"
                                      value={password2}
                                      variant="standard"
                                      helperText={pass}
                                      // endAdornment={
                                      //   <InputAdornment position="end">
                                      //     <IconButton
                                      //       aria-label="toggle password visibility"
                                      //       onClick={handleClickShowPassword}
                                      //       onMouseDown={handleMouseDownPassword}
                                      //       edge="end"
                                      //     >
                                      //       {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                      //     </IconButton>
                                      //   </InputAdornment>
                                      // }
                                      onChange={(event) => {
                                        if(event.target.value!==password1){
                                              setpass("passwords do not match ")
                                        }else{
                                          setpass("")
                                        }
                                        setpassword2(event.target.value);

                                      }}

                                    />
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
                              <CardHeader color="primary" className={classes.cardHeader}>
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
                                  </GridItem>
                                  <GridItem xs={12} sm={12} >

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
                                  </GridItem>
                                  <GridItem xs={12} sm={6} >
                                    <form className={styles.root} noValidate autoComplete="off">
                                      <div className={styles.text}>

                                        <div className="resultsTo">
                                          <div className="searchInputTo">

                                            <TextField
                                              fullWidth
                                              required
                                              type="search"
                                              label="Country"
                                              variant="standard"
                                              value={wordEntered}
                                              onChange={(event) => {
                                                handleFilter(event)
                                              }}
                                            />
                                          </div>
                                          {filteredData.length != 0 && (
                                            <div className="dataResultTo" >

                                              {filteredData.slice(0, 15).map((value, key) => {
                                                return (
                                                  <a className="aTo" onClick={(e) => clicked(value, e)} target="_blank">
                                                    <p>{value.name} </p>
                                                  </a>

                                                );
                                              })}
                                            </div>
                                          )}
                                        </div>


                                      </div>

                                    </form>

                                  </GridItem>

                                  <GridItem xs={12} sm={6} >

                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                      <DatePicker

                                        renderInput={(props) => <TextField {...props} required
                                          label="Birthdate"
                                          fullWidth
                                          variant="standard"
                                        />
                                        }
                                        value={birthdate}
                                        onChange={(newValue) => {
                                          setbirthdate(newValue);
                                        }}
                                      />
                                    </LocalizationProvider>
                                  </GridItem>


                                  <GridItem xs={12} sm={6}>
                                    <TextField
                                      required
                                      label="Phone Number"
                                      fullWidth
                                      value={phone1}
                                      type="number"
                                      variant="standard"
                                      InputProps={{
                                        startAdornment: <InputAdornment position="start">{"+" + countrycode}</InputAdornment>,
                                      }}
                                      onChange={(event) => {
                                        setphone1(event.target.value);

                                      }}

                                    />
                                  </GridItem>
                                  <GridItem xs={12} sm={6}>
                                    <TextField
                                      label="Phone Number (optional)"
                                      fullWidth
                                      value={phone2}
                                      type="number"
                                      variant="standard"
                                      InputProps={{
                                        startAdornment: <InputAdornment position="start">{"+" + countrycode}</InputAdornment>,
                                      }}
                                      onChange={(event) => {
                                        setphone2(event.target.value);
                                      }}

                                    />
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
                      <GridContainer justify="center" >
                        <GridItem xs={12} sm={12} md={7}>

                          <Card className={classes[cardAnimaton]}
                            display="flex"
                            flex-flexdirection="row">

                            <form className={classes.form}>
                              <CardHeader color="primary" className={classes.cardHeader}>
                                <h3> Sign up </h3>
                              </CardHeader>

                              <CardBody  >
                                <h5> Credit card details</h5>
                                <GridContainer  >
                                  <GridItem xs={12} sm={6} >
                                    <TextField
                                      required
                                      label="Card Number"
                                      fullWidth
                                      value={credit}

                                      type="number"
                                      variant="standard"
                                      onChange={(event) => {
                                        setcredit(event.target.value);
                                      }}

                                    />
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
                                  </GridItem>
                                  <GridItem xs={12} sm={6}  >
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                      <DatePicker

                                        renderInput={(props) => <TextField {...props} required
                                          label="Expiry Date"
                                          fullWidth
                                          variant="standard"
                                        />
                                        }
                                        value={expirydate}
                                        minDate={currentdate}
                                        onChange={(newValue) => {
                                          setexpirydate(newValue);
                                        }}
                                      />
                                    </LocalizationProvider>
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
