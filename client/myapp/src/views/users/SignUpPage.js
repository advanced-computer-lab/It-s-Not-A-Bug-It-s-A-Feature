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


import "animate.css";
import "react-notifications-component/dist/theme.css";
import { store } from 'react-notifications-component';

import { Link } from "react-router-dom";


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

import Grid from '@mui/material/Grid';
var worldMapData = require('city-state-country');

const useStyles1 = makeStyles((theme) => ({
    root: {

        // margin: theme.spacing(1),
        height: "50px",
        // flex: 2,
        // position: 'absolute',
        // direction: "flex",
        backgroundcolor: "white",
        msOverflowY: "auto",
        // position: "relative",
    },
    text: {
        // display: "flex",
        // flexDirection: "row",
        color: "black",
        backgroundcolor: "white"

    },
    a: {

        height: "20px",
        backgroundcolor: "white",
        '&:hover': {
            color: "grey",
            backgroundcolor: "white",
        },
        textdecoration: "none !important",
        color: "black",
    },

    testssss: {
        height: "100px",
        width: "100px",
        backgroundcolor: "green"
    },
    test: {
        position: "relative",
        zIndex: 20,
        backgroundcolor:"white",
        overflow:"hidden",
        msOverflowY:"auto",

    }

}
));



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
    const styles1 = useStyles1({});
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

    // error --> text field error
    const [Epass, setEpass] = useState(false);
    const [EEmail, setEmail] = useState(false);
    const [Euname, setEuname] = useState(false);
    const [Efname, setEfname] = useState(false);
    const [Elname, setElname] = useState(false);
    const [Epassword, setEpassword] = useState(false);
    const [Eadd, setEadd] = useState(false);
    const [Ecount, setEcount] = useState(false);
    const [Ephone, setEphone] = useState(false);
    const [Ebirth, setEBirth] = useState(false);
    const [Eport, setEport] = useState(false);
    const [Ecv, setEcv] = useState(false);
    const [Ecard, setEcard] = useState(false);
    const [Eexp, setEexp] = useState(false);
    const [Ecfname, setEcfname] = useState(false);
    const [Eclname, setEclname] = useState(false);


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
            setEpass(true);
        }
        if (firstname === "") {
            setfname("This field is required");
            setEfname(true);
        }
        if (lastname === "") {
            setlname("This field is required");
            setElname(true);
        }
        if (username === "") {
            setuname("This field is required");
            setEuname(true);
        }
        if (email === "") {
            setmail("This field is required");
            setEmail(true);
        }
        if (password1 === "") {
            setpassword("This field is required");
            setEpassword(true);
        }
        if (address === "") {
            setadd("This field is required");
            setEadd(true);
        }
        if (country === "") {
            setcount("This field is required");
            setEcount(true);
        }
        if (phone1 === "") {
            setphone("This field is required");
            setEphone(true);
        }
        if (birthdate === null) {
            setBirth("This field is required");
            setEBirth(true);
        }
        if (passport === "") {
            setport("This field is required");
            setEport(true);
        }
        if (credit === "") {
            setcard("This field is required");
            setEcard(true);
        }
        if (cvv === "") {
            setcv("This field is required");
            setEcv(true);
        }
        if (expirydate === null) {
            setexp("This field is required");
            setEexp(true);
        }
        if (creditfirstname === "") {
            setcfname("This field is required");
            setEcfname(true);
        }
        if (creditlastname === "") {
            setclname("This field is required");
            setEclname(true);
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
                if(res.data.message==="Username or email has already been taken"){

                    return (setuname("This user name is already taken"),
                    setEuname(true),
                    setEmail(true),
                    setmail("Username or email has already been taken"))
                }else{
                   
                    console.log("signed up succesfully");
                    history.push('/login')
                }
               ;
            }).catch((error) => {
                console.log(err);
            });
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
                                                                            error={Efname}
                                                                            onChange={(event) => {
                                                                                setfirstname(event.target.value);
                                                                                if (event.target.value !== "") {
                                                                                    setfname("");
                                                                                    setEfname(false);
                                                                                } else {
                                                                                    setfname("This field is required");
                                                                                    setEfname(true);
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
                                                                            error={Elname}
                                                                            variant="standard"
                                                                            onChange={(event) => {
                                                                                setlastname(event.target.value);
                                                                                if (event.target.value !== "") {
                                                                                    setlname("");
                                                                                    setElname(false);
                                                                                } else {
                                                                                    setlname("This field is required");
                                                                                    setElname(true);
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
                                                                            error={Euname}
                                                                            onChange={(event) => {
                                                                                setusername(event.target.value);
                                                                                if (event.target.value !== "") {
                                                                                    setuname("");
                                                                                    setEuname(false);
                                                                                } else {
                                                                                    setuname("This field is required");
                                                                                    setEuname(true);
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
                                                                            error={EEmail}
                                                                            onChange={(event) => {
                                                                                setemail(event.target.value);
                                                                                if (event.target.value !== "") {
                                                                                    if (!((event.target.value).toLowerCase()).endsWith("@gmail.com")) {
                                                                                        setmail("The email should end with @gmail.com");
                                                                                    } else {
                                                                                        setmail("");
                                                                                        setEmail(false);
                                                                                    }

                                                                                } else {
                                                                                    setmail("This field is required");
                                                                                    setEmail(true);
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
                                                                            error={Epassword}
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
                                                                                    setEpassword(false);
                                                                                } else {
                                                                                    setpassword("This field is required");
                                                                                    setEpassword(true);
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
                                                                            error={Epass}
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
                                                                                    setEpass(false);
                                                                                } else {
                                                                                    setpass("")
                                                                                    setEpass(false);
                                                                                }
                                                                                setpassword2(event.target.value);

                                                                            }}

                                                                        />
                                                                    </GridItem>
                                                                </GridContainer>
                                                            </CardBody>
                                                            <CardFooter className={classes.cardFooter}  >
                                                                {/* <Button simple color="primary"
                                                                    size="lg"
                                                                // onClick={(e) => { onSubmit(e); }}
                                                                >
                                                                    Next
                                                                </Button> */}
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
                                                                            error={Eadd}
                                                                            variant="standard"
                                                                            helperText={add}
                                                                            onChange={(event) => {
                                                                                setaddress(event.target.value);
                                                                                if (event.target.value !== "") {
                                                                                    setadd("");
                                                                                    setEadd(false);
                                                                                } else {
                                                                                    setadd("This field is required");
                                                                                    setEadd(true);
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
                                                                            error={Eport}
                                                                            onChange={(event) => {
                                                                                setpassport(event.target.value);
                                                                                if (event.target.value !== "") {
                                                                                    setport("");
                                                                                    setEport(false);
                                                                                } else {
                                                                                    setport("This field is required");
                                                                                    setEport(true);
                                                                                }
                                                                            }}
                                                                        />
                                                                    </GridItem>
                                                                    <GridItem xs={12} sm={6} >
                                                                        <form className={styles1.root} noValidate autoComplete="off">
                                                                            <div className={styles1.text}>

                                                                                <div className={styles1.test}>
                                                                                    <div className=  {styles1.test}>

                                                                                        <TextField
                                                                                            fullWidth
                                                                                            required
                                                                                            type="search"
                                                                                            label="Country"
                                                                                            variant="standard"
                                                                                            helperText={count}
                                                                                            value={wordEntered}
                                                                                            error={Ecount}
                                                                                            onChange={(event) => {
                                                                                                if(event.target.value==""){
                                                                                                    setcount("This field is required");
                                                                                                    setEcount(true);
                                                                                                }else{
                                                                                                    setcount("");
                                                                                                    setEcount(false);
                                                                                                }
                                                                                                handleFilter(event)
                                                                                             
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                    {filteredData.length != 0 && (
                                                                                        <div className={styles1.test} >

                                                                                            {filteredData.slice(0, 5).map((value, key) => {
                                                                                                return (
                                                                                                        <a className={styles1.test} onClick={(e) => clicked(value, e)} target="_blank">
                                                                                                            <p className={styles1.a} >{value.name} </p>
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
                                                                                    helperText={birth}
                                                                                    error={Ebirth}
                                                                                    variant="standard"
                                                                                />
                                                                                }
                                                                                value={birthdate}
                                                                                onChange={(newValue) => {
                                                                                    setbirthdate(newValue);
                                                                                    if (newValue !== "") {
                                                                                        setBirth("");
                                                                                        setEBirth(false);
                                                                                    } else {
                                                                                        setBirth("This field is required");
                                                                                        setEBirth(true);
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
                                                                            error={Ephone}
                                                                            InputProps={{
                                                                                startAdornment: <InputAdornment position="start">{"+" + countrycode}</InputAdornment>,
                                                                            }}
                                                                            onChange={(event) => {
                                                                                setphone1(event.target.value);
                                                                                if (event.target.value !== "") {
                                                                                    setphone("");
                                                                                    setEphone(false);
                                                                                } else {
                                                                                    setphone("This field is required");
                                                                                    setEphone(true);
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
                                                                {/* <Button
                                                                    simple color="primary"
                                                                    size="lg">
                                                                    back
                                                                </Button>
                                                                <Button simple color="primary"
                                                                    size="lg"
                                                                // onClick={(e) => { onSubmit(e); }}
                                                                >
                                                                    Next
                                                                </Button> */}
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
                                                                            error={Ecard}
                                                                            onChange={(event) => {
                                                                                setcredit(event.target.value);
                                                                                if (event.target.value !== "") {
                                                                                    setcard("");
                                                                                    setEcard(false);
                                                                                } else {
                                                                                    setcard("This field is required");
                                                                                    setEcard(true);
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
                                                                            error={Ecv}
                                                                            variant="standard"
                                                                            onChange={(event) => {
                                                                                setcvv(event.target.value);
                                                                                if (event.target.value !== "") {
                                                                                    setcv("");
                                                                                    setEcv(false);
                                                                                } else {
                                                                                    setcv("This field is required");
                                                                                    setEcv(true);
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
                                                                            error={Ecfname}
                                                                            variant="standard"
                                                                            onChange={(event) => {
                                                                                setcreditfirstname(event.target.value);
                                                                                if (event.target.value !== "") {
                                                                                    setcfname("");
                                                                                    setEcfname(false);
                                                                                } else {
                                                                                    setcfname("This field is required");
                                                                                    setEcfname(true);
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
                                                                            error={Eclname}
                                                                            onChange={(event) => {
                                                                                setcreditlastname(event.target.value);
                                                                                if (event.target.value !== "") {
                                                                                    setclname("");
                                                                                    setEclname(false);
                                                                                } else {
                                                                                    setclname("This field is required");
                                                                                    setEclname(true)
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
                                                                                    error={Eexp}
                                                                                    variant="standard"
                                                                                />
                                                                                }
                                                                                value={expirydate}
                                                                                minDate={currentdate}
                                                                                helperText={exp}
                                                                                onChange={(newValue) => {
                                                                                    setexpirydate(newValue);
                                                                                    if (newValue !== "") {
                                                                                        setexp("");
                                                                                        setEexp(false);
                                                                                    } else {
                                                                                        setexp("This field is required");
                                                                                        setEexp(true);
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </LocalizationProvider>
                                                                    </GridItem>
                                                                </GridContainer>
                                                            </CardBody>

                                                            <CardFooter className={classes.cardFooter}  >
                                                                {/* <Button
                                                                    simple color="primary"
                                                                    size="lg">
                                                                    back
                                                                </Button> */}
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

