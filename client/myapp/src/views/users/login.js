import React from "react";
// @material-ui/core components
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
import Button from "./../../components/CustomButtons/Button.js";
import Card from "./../../components/Card/Card.js";
import CardBody from "./../../components/Card/CardBody.js";
import CardHeader from "./../../components/Card/CardHeader.js";
import CardFooter from "./../../components/Card/CardFooter.js";
import CustomInput from "./../../components/CustomInput/CustomInput.js";
import SnackbarContent from "./../../components/Snackbar/SnackbarContent.js";
import LockIcon from '@mui/icons-material/Lock';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "animate.css";
import "react-notifications-component/dist/theme.css";
import { store } from 'react-notifications-component';

import {
    BrowserRouter as Router,
    Switch,
    useLocation
} from "react-router-dom";


import styles from "./../../assets/jss/material-kit-react/views/loginPage.js";

import image from "./../../assets/img/bg7.jpg";
const useStyles = makeStyles(styles);

export default function Login(props) {
    const location = useLocation();
    const key = location.state;

    const [userName, setuserName] = useState("");
    const [password, setpassword] = useState("");
    const [message, setmessage] = useState(null);
    const [messagecolor, setmessagecolor] = useState("danger");

    useEffect(()=>{
       if(key!=null){
       setmessage(key.message);
       setmessagecolor("info");
    }
    console.log("state :",key);
    },[]);



    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;
    let history = useHistory();

    const [isLogged, setLogged] = useState(false);

    const onSubmit = (e) => {
        // i want to change the navbar links here

        setmessage(null);
        setmessagecolor("");
        axios.post('http://localhost:8000/login', {
            username: userName,
            password: password
        }).then(res => {
            console.log(res);
            if (res.data.message != "success") {
                setmessagecolor("danger");
                setmessage(res.data.message);

            }
            else {
                setLogged(true);//bar loggedIn
                setmessagecolor("success");
                console.log(res);
                setmessage(res.data.message);
                localStorage.setItem("token", res.data.token);
                const tokenWithout = res.data.token.split(' ')[1]
                document.cookie = "jwt=" + tokenWithout;
                if (res.data.isAdmin === false){
                    console.log("key",key);
                    if(key==null){
                        history.push("/profile");
                    }
                    else 
                    history.push({
                        pathname: "/reserveSeats",
                        state: key
            
                    });
                }
                else
                    history.push("/admin/createFlight");
            }

        }).catch(err => console.log(err))

        // e.preventDefault();
        // setLogged(true);
        // history.push('/profile'); 
    }
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
                    <GridContainer justify="center">
                        {message ?
                            <GridItem xs={12} xm={12}>
                                {/* <SnackbarContent
                                    message={
                                        <span>
                                            {message}
                                        </span>
                                    }
                                    close
                                    color={messagecolor}


                                /> */}
                                {store.addNotification({
                                      title: message,
                                      message: " ",
                                      type: messagecolor,
                                      container: 'top-right',
                                      insert: "top",
                                      animationIn: ["animated", "fadeIn"],
                                      animationOut: ["animated", "fadeOut"],
                                      dismiss: {
                                        duration: 3000
                                      },
                                      width: 400
                                    }),
                                    setmessage(null)}
                                 </GridItem> : null}
                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes[cardAnimaton]}>
                                <form className={classes.form}>
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h2>Welcome!</h2>
                                    </CardHeader>
                                    <CardBody>
                                        <CustomInput

                                            labelText="UserName"
                                            id="first"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                type: "text",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <People className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                ),
                                                readOnly: false,
                                                onChange: (event) => {
                                                    setuserName(event.target.value);

                                                },
                                            }}

                                        />

                                        <CustomInput
                                            labelText="Password"
                                            id="pass"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                type: "password",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <LockIcon className={classes.inputIconsColor}>
                                                        </LockIcon>
                                                    </InputAdornment>
                                                ),
                                                autoComplete: "off",
                                                readOnly: false,
                                                onChange: (event) => {
                                                    setpassword(event.target.value);
                                                },
                                            }}
                                        />
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <Button
                                            simple color="primary"
                                            size="lg"
                                            onClick={() => {
                                                history.push('/signUp') //add sign up page
                                            }}>
                                            Don't have an account?
                                        </Button>
                                        <Button simple color="primary"
                                            size="lg"
                                            onClick={(e) => { onSubmit(e); }}>
                                            Login
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer whiteFont />
            </div>
        </div>
    );
}
