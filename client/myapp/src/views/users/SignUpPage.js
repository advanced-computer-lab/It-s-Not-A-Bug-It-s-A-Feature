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

import { Link } from "react-router-dom";


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { cssClasses } from "nouislider";
import { set } from "lodash";
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

  // ____________________________________________________search componenet_______________________________
  const styles = useStyles({
  });
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
};

  //____________________________________________________ done_____________________________________

// error --> text field color 
  const [Epass, setEpass] = useState("primary");
  const [EEmail, setEmail] = useState("primary");
  const [Euname, setEuname] = useState("primary");
  const [Efname, setEfname] = useState("primary");
  const [Elname, setElname] = useState("primary");
  const [Epassword, setEpassword] = useState("primary");
  const [Eadd, setEadd] = useState("primary");
  const [Ecount, setEcount] = useState("primary");
  const [Ephone, setEphone] = useState("primary");
  const [Ebirth, setEBirth] = useState("primary");
  const [Eport, setEport] = useState("primary");
  const [Ecv, setEcv] = useState("primary");
  const [Ecard, setEcard] = useState("primary");
  const [Eexp, setEexp] = useState("primary");
  const [Ecfname, setEcfname] = useState("primary");
  const [Eclname, setEclname] = useState("primary");


  // helper texts
  const [pass, setpass] = useState("");
  const [mail, setmail] = useState("");
  const [uname, setuname] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [password, setpassword] = useState("");
  const [add, setadd] = useState("");
  const [count, setcount] = useState("");
  const [phone, setphone] = useState("");
  const [birth, setBirth] = useState("");
  const [port, setport] = useState("");
  const [cv, setcv] = useState("");
  const [card, setcard] = useState("");
  const [exp, setexp] = useState("");
  const [cfname, setcfname] = useState("");
  const [clname, setclname] = useState("");

  function Sethelper() {
    if (passport === "") {
      setpass("This field is required");
      setEpass("error");
    }
    if (firstname === "") {
      setfname("This field is required");
      setEfname("error");
    }
    if (lastname === "") {
      setlname("This field is required");
      setElname("error");
    }
    if (username === "") {
      setuname("This field is required");
      setEuname("error");
    }
    if (email === "") {
      setmail("This field is required");
      setEmail("error");
    }
    if (password1 === "") {
      setpassword("This field is required");
      setEpassword("error");
    }
    if (address === "") {
      setadd("This field is required");
      setEadd("error");
    }
    if (country === "") {
      setcount("This field is required");
      setEcount("error");
    }
    if (phone1 === "") {
      setphone("This field is required");
      setEphone("error");
    }
    if (birthdate === null) {
      setBirth("This field is required");
      setEBirth("error");
    }
    if (passport === "") {
      setport("This field is required");
      setEport("error");
    }
    if (credit === "") {
      setcard("This field is required");
      setEcard("error");
    }
    if (cvv === "") {
      setcv("This field is required");
      setEcv("error");
    }
    if (expirydate === null) {
      setexp("This field is required");
      setEexp("error");
    }
    if (creditfirstname === "") {
      setcfname("This field is required");
      setEcfname("error");
    }
    if (creditlastname === "") {
      setclname("This field is required");
      setEclname("error");
    }

  }

  function validate() {
    return (password1 === "" || password2 === "" || email === "" || username === "" || firstname === "" || lastname === "" || password2 === "" || address === "" || country === "" || phone1 === "" || birthdate === null || passport === "" || cvv === "" || credit === "" || expirydate === null && creditfirstname === "" && creditlastname === "");
  }

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
    password: '',
    showPassword: false,
  });
  const [values1, setValues1] = React.useState({
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
  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleChange1 = (prop) => (event) => {
    setValues1({ ...values1, [prop]: event.target.value });
  };

  //_______________________________________________________________________________

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
    Sethelper();
    if (!validate()) {
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


  }

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  let history = useHistory();

  const [isLogged, setLogged] = useState(false);



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
                                      helperText={fname}
                                      color={Efname}
                                      onChange={(event) => {
                                        setfirstname(event.target.value);
                                        if (event.target.value !== "") {
                                          setfname("");
                                          setEfname("primary");
                                        } else {
                                          setfname("This field is required");
                                          setEfname("error");
                                        }
                                      }}

                                    />
                                  </GridItem>
                                  <GridItem xs={12} sm={6} >
                                    <TextField
                                      required
                                      label="Last Name"
                                      fullWidth
                                      helperText={lname}
                                      value={lastname}
                                      color={Elname}
                                      variant="standard"
                                      onChange={(event) => {
                                        setlastname(event.target.value);
                                        if (event.target.value !== "") {
                                          setlname("");
                                          setElname("primary");
                                        } else {
                                          setlname("This field is required");
                                          setElname("error");
                                        }
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
                                      helperText={uname}
                                      color={Euname}
                                      onChange={(event) => {
                                        setusername(event.target.value);
                                        if (event.target.value !== "") {
                                          setuname("");
                                          setEuname("primary");
                                        } else {
                                          setuname("This field is required");
                                          setEuname("error");
                                        }
                                      }}
                                      InputProps={{
                                        endAdornment: <InputAdornment position="end"><People /></InputAdornment>,
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
                                      helperText={mail}
                                      color={EEmail}
                                      onChange={(event) => {
                                        setemail(event.target.value);
                                        if (event.target.value !== "") {
                                          if (!((event.target.value).toLowerCase()).endsWith("@gmail.com")) {
                                            setmail("The email should end with @gmail.com");
                                          } else {
                                            setmail("");
                                            setEmail("primary");
                                          }

                                        } else {
                                          setmail("This field is required");
                                          setEmail("eroor");
                                        }

                                      }}
                                      InputProps={{
                                        endAdornment: <InputAdornment position="end"><Email /></InputAdornment>,
                                      }}

                                    />
                                  </GridItem>
                                  <GridItem xs={12} sm={12} >
                                    <TextField
                                      required
                                      label="Password"
                                      fullWidth
                                      type={values.showPassword ? "text" : "password"}
                                      value={password1}
                                      variant="standard"
                                      color={Epassword}
                                      helperText={password}
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
                                      onChange={handleChange('password')}
                                      onChange={(event) => {
                                        setpassword1(event.target.value);
                                        if (event.target.value !== "") {
                                          setpassword("");
                                          setEpassword("primary");
                                        } else {
                                          setpassword("This field is required");
                                          setEpassword("error");
                                        }
                                      }}


                                    />
                                  </GridItem>
                                  <GridItem xs={12} sm={12} >

                                    <TextField
                                      required
                                      label="Confirm Password"
                                      fullWidth
                                      type={values1.showPassword ? "text" : "password"}
                                      value={password2}
                                      variant="standard"
                                      helperText={pass}
                                      color={Epass}
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
                                      onChange={handleChange1('password')}
                                      onChange={(event) => {
                                        if (event.target.value !== password1) {
                                          setpass("passwords do not match ")
                                          setEpass("primary");
                                        } else {
                                          setpass("")
                                          setEpass("primary");
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
                                      color={Eadd}
                                      variant="standard"
                                      helperText={add}
                                      onChange={(event) => {
                                        setaddress(event.target.value);
                                        if (event.target.value !== "") {
                                          setadd("");
                                          setEadd("primary");
                                        } else {
                                          setadd("This field is required");
                                          setEadd("error");
                                        }
                                      }}
                                      InputProps={{
                                        endAdornment: <InputAdornment position="end"><HomeRoundedIcon /></InputAdornment>,
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
                                      helperText={port}
                                      color={Eport}
                                      onChange={(event) => {
                                        setpassport(event.target.value);
                                        if (event.target.value !== "") {
                                          setport("");
                                          setEport("primary");
                                        } else {
                                          setport("This field is required");
                                          setEport("error");
                                        }
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
                                              helperText={count}
                                              value={wordEntered}
                                              color={Ecount}
                                              onChange={(event) => {
                                                handleFilter(event)
                                              }}
                                            />
                                          </div>
                                          {filteredData.length != 0 && (
                                            <div className="dataResultTo" >

                                              {filteredData.slice(0, 15).map((value, key) => {
                                                return (
                                                  <a onClick={(e) => clicked(value, e)} target="_blank">
                                                    <MenuItem>{value.name} </MenuItem>
                                                  </a>);
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
                                          helperText={birth}
                                          color={Ebirth}
                                          variant="standard"
                                        />
                                        }
                                        value={birthdate}
                                        onChange={(newValue) => {
                                          setbirthdate(newValue);
                                          if (event.target.value !== "") {
                                            setbirth("");
                                            setEBirth("primary");
                                          } else {
                                            setbirth("This field is required");
                                            setEBirth("error");
                                          }
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
                                      helperText={phone}
                                      type="number"
                                      variant="standard"
                                      color={Ephone}
                                      InputProps={{
                                        startAdornment: <InputAdornment position="start">{"+" + countrycode}</InputAdornment>,
                                      }}
                                      onChange={(event) => {
                                        setphone1(event.target.value);
                                        if (event.target.value !== "") {
                                          setphone("");
                                          setEphone("primary");
                                        } else {
                                          setphone("This field is required");
                                          setEphone("error");
                                        }

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
                                      helperText={card}
                                      type="number"
                                      variant="standard"
                                      color={Ecard}
                                      onChange={(event) => {
                                        setcredit(event.target.value);
                                        if (event.target.value !=="") {
                                          setcard("");
                                          setEcard("primary");
                                        } else {
                                          setcard("This field is required");
                                          setEcard("error");
                                        }
                                      }}

                                    />
                                  </GridItem>

                                  <GridItem xs={12} sm={6} >
                                    <TextField
                                      required
                                      label="CVV"
                                      fullWidth
                                      value={cvv}
                                      helperText={cv}
                                      color={Ecv}
                                      variant="standard"
                                      onChange={(event) => {
                                        setcvv(event.target.value);
                                        if (event.target.value !== "") {
                                          setcv("");
                                          setEcv("primary");
                                        } else {
                                          setcv("This field is required");
                                          setEcv("error");
                                        }
                                      }}

                                    />
                                  </GridItem>

                                  <GridItem xs={12} sm={6}>
                                    <TextField
                                      required
                                      label="First Name"
                                      fullWidth
                                      value={creditfirstname}
                                      helperText={cfname}
                                      color={Ecfname}
                                      variant="standard"
                                      onChange={(event) => {
                                        setcreditfirstname(event.target.value);
                                        if (event.target.value !== "") {
                                          setcfname("");
                                          setEcfname("primary");
                                        } else {
                                          setcfname("This field is required");
                                          setEcfname("error");
                                        }
                                      }}
                                    />
                                  </GridItem>
                                  <GridItem xs={12} sm={6} >
                                    <TextField
                                      required
                                      label="Last Name"
                                      fullWidth
                                      helperText={clname}
                                      value={creditlastname}
                                      variant="standard"
                                      color={Eclname}
                                      onChange={(event) => {
                                        setcreditlastname(event.target.value);
                                        if (event.target.value !=="") {
                                          setclname("");
                                          setEclname("primary");
                                        } else {
                                          setclname("This field is required");
                                          setEclname("error")
                                        }
                                      }}
                                    />
                                  </GridItem>
                                  <GridItem xs={12} sm={6}  >
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                      <DatePicker

                                        renderInput={(props) => <TextField {...props} required
                                          label="Expiry Date"
                                          fullWidth
                                          color={Eexp}
                                          variant="standard"
                                        />
                                        }
                                        value={expirydate}
                                        minDate={currentdate}
                                        helperText={exp}
                                        onChange={(newValue) => {
                                          setexpirydate(newValue);
                                          if (event.target.value !== "") {
                                            setexp("");
                                            setEexp("primary");
                                          } else {
                                            setexp("This field is required");
                                            setEexp("error");
                                          }
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
