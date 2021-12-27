/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
axios.defaults.withCredentials = true
// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import Button from "../CustomButtons/Button.js";
import Login from '../../views/users/login.js';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Router } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';


import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);



export default function HeaderLinks(props) {
    const classes = useStyles();
    let history = useHistory();
    const [isLogged, setLogged] = useState(localStorage.getItem("token") != null);

    // const onSubmit = (e) => { 
    //   // i want to change the navbar links here
    //   e.preventDefault();
    //   if(e.target.id === 'login'){
    //       setLogged(true);}
    //   else{
    //       setLogged(false);}
    // }
    // let isLogged = props.isLogged
    let loginButton;
    if (!isLogged) {
        loginButton = <Button
            id="login"
            onClick={(e) => {
                // setLogged(true);
                history.push('/login')
                //onSubmit(e);
                // history.push('/login')
            }}
            color="transparent"
            target="_blank"
            className={classes.navLink}
        >

            <LoginIcon className={classes.icons} /> Login
        </Button>;
    }
    else {
        loginButton = <div>

            <Button
                onClick={(e) => {
                    history.push('/admin/allFlights')
                }}
                color="transparent"
                target="_blank"
                className={classes.navLink}

            >

                <AccountCircleIcon className={classes.icons} /> All Flights
            </Button>
            <Button
                onClick={(e) => {
                    history.push('/admin/createFlight')
                }}
                color="transparent"
                target="_blank"
                className={classes.navLink}

            >

                <AccountCircleIcon className={classes.icons} /> Create Flight
            </Button>
            <Button
                onClick={(e) => {
                    history.push('/admin/search')
                }}
                color="transparent"
                target="_blank"
                className={classes.navLink}

            >

                <AccountCircleIcon className={classes.icons} /> Search Flights
            </Button>
            <Button
                id="logout"
                onClick={(e) => {
                    setLogged(false);
                    const token = localStorage.getItem("token");
                    axios.delete('http://localhost:8000/user/logout/', {
                        headers: {
                            'authorization': token
                        },
                        data: {
                            token: token
                        }
                    }).then((response) => {
                        console.log('response', response.data)

                    })
                        .catch(err => {
                            console.log(err);
                            history.push("/error");
                        });
                    localStorage.removeItem("token");
                    document.cookie = 'jwt=; Max-Age=-99999999'

                    //onSubmit(e);
                    history.push('/login')
                }}
                color="transparent"
                target="_blank"
                className={classes.navLink}
            >

                <LogoutIcon className={classes.icons} /> Log Out
            </Button>

        </div>;
    }

    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                {/* <CustomDropdown
          noLiPadding
          buttonText="Components"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              All components
            </Link>,
            <a
              href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
              target="_blank"
              className={classes.dropdownLink}
            >
              Documentation
            </a>,
          ]}
        /> */}
            </ListItem>
            <ListItem className={classes.listItem}>
                {loginButton}
            </ListItem>
            <ListItem className={classes.listItem}>

            </ListItem>
        </List>
    );
}
