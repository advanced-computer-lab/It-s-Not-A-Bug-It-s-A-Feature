import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import tableCellClasses from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/styles';
// import DeleteIcon from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import { Link } from 'react-router-dom';



import { makeStyles } from "@material-ui/core/styles";

import Header from "./../../components/Header/HeaderAdmin.js";
import HeaderLinks from "./../../components/Header/HeaderLinksAdmin.js";
import Footer from "./../../components/Footer/Footer.js";
import styles from "./../../assets/jss/material-kit-react/views/loginPage.js";
import image from "./../../assets/img/bg2.jpg";

import { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(styles);

function ViewAllFlights(props) {

    let history = useHistory();
    const classes = useStyles();
    const { ...rest } = props;
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get('http://localhost:8000/Admin/allFlights', {
            headers: {
                'authorization': token
            }
        })
            .then(res => {
                console.log(res.data);
                if (res.data.message === "Access denied. Admins only are allowed.") {
                    history.push("/error");
                } else {
                    setRows(res.data); console.log(res)
                }
            }).catch(err => {
                console.log(err);
                history.push("/error");
            });

    }, []);

    // const refreshPage = () => {
    //   setRows({});
    // }

    return (
        <div>
            <Header
                absolute
                color="transparent"
                brand="OverReact"
                rightLinks={<HeaderLinks />}
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
                    {helper(rows)}
                </div>
                <Footer />
            </div>
        </div>
    )

}


const StyledTableCell = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableHead = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(DepartureDate, ArrivalDate, EconomySeats, BusinessSeats, ArrivalAirport, DepartureTerminal, ArrivalTerminal, DeleteIcon, UpdateIcon) {
    return { DepartureDate, ArrivalDate, EconomySeats, BusinessSeats, ArrivalAirport, DepartureTerminal, ArrivalTerminal, DeleteIcon, UpdateIcon };
}
function goToUpdate(id) {
    window.location = '/admin/editFlight/' + id;
}

// Not working as i want 
// function deleteButton(){
//   const noPointer = {cursor: 'default'};
//   return(<DeleteRoundedIcon style={noPointer} ></DeleteRoundedIcon>);
//   }

function deleteFlight(id) {
    // confirmation alert is shown before deletion
    const r = window.confirm("Do you really want to delete this item?");
    if (r === true) {
        axios.delete(`http://localhost:8000/admin/deleteFlight/${id}`)
            .then((response) => {
                window.location.reload(true);
            })
        // fetch(`http://localhost:8000/admin/deleteFlight/${id}`, {
        //   method: 'DELETE',
        //   header: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        //   }
        // })
        // .then(response => response.json()); // refreshing the page is not working !!!
        // window.location.reload();
        // // this.setRows({});
    }


}

function helper(rows) {
    return (<TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead>
                <TableRow>
                    <StyledTableHead>Flight Number</StyledTableHead>
                    <StyledTableHead align="right">Departure Date</StyledTableHead>
                    <StyledTableHead align="right">Arrival Date</StyledTableHead>
                    <StyledTableHead align="right">Economy Seats</StyledTableHead>
                    <StyledTableHead align="right">Business Seats</StyledTableHead>
                    <StyledTableHead align="right">Arrival Airport</StyledTableHead>
                    <StyledTableHead align="right">Departure Airport</StyledTableHead>
                    <StyledTableHead align="right">Arrival Terminal</StyledTableHead>
                    <StyledTableHead align="right">Departure Terminal</StyledTableHead>
                    <StyledTableHead align="right">  </StyledTableHead>
                    <StyledTableHead align="right">  </StyledTableHead>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <StyledTableRow key={row.flightNo}>
                        <StyledTableCell scope="row">
                            {row.flightNo}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.departureDate}</StyledTableCell>
                        <StyledTableCell align="right">{row.arrivalDate}</StyledTableCell>
                        <StyledTableCell align="right">{row.economySeats}</StyledTableCell>
                        <StyledTableCell align="right">{row.businessSeats}</StyledTableCell>
                        <StyledTableCell align="right">{row.arrivalAirport}</StyledTableCell>
                        <StyledTableCell align="right">{row.departureAirport}</StyledTableCell>
                        <StyledTableCell align="right">{row.arrivalTerminal}</StyledTableCell>
                        <StyledTableCell align="right">{row.departureTerminal}</StyledTableCell>
                        <StyledTableCell align="right">{
                            <Button variant="outlined" onClick={() => { deleteFlight(row._id) }} startIcon={<DeleteIcon />}>
                                Delete
                            </Button>
                        }</StyledTableCell>

                        <StyledTableCell onClick={() => goToUpdate(row._id)} align="right">{
                            <Button variant="outlined" >
                                Update
                            </Button>
                        }</StyledTableCell>

                    </StyledTableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>);
}

export default ViewAllFlights;