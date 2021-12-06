import businessSeat from '@mui/icons-material/ChairTwoTone';
import economySeat from '@mui/icons-material/ChairOutlined';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { List, ListItem, Tooltip } from "@material-ui/core";
import { useState, useEffect } from 'react';
import Button from "./../../components/CustomButtons/Button.js";
import { useHistory } from 'react-router-dom';

import SeatPicker from 'react-seat-picker';

//handle currbusiness and econ seats - maybe in parent component - update flight w new values

function createRows(business, econ, reserved, isBusiness) {
  // console.log("creating rows");
  const allSeats = business + econ;
  var res = [...Array(Math.ceil(allSeats / 6))].map(x => Array(6).fill(0));
  for (let k = 1, i = 0; i < res.length; i++) {
    for (let j = 0; j <= 6; j++) {
      if (j == 3 || k > allSeats) {
        res[i][j] = { number: "", isReserved: true };
      }
      else {
        if(reserved.includes(k) || (isBusiness && k>business) || (!isBusiness && k<=business)){
          res[i][j] = { number: k++, isReserved: true };
        }
        else{
        res[i][j] = { number: k++ };
        }
      }
    }
  }
  return res;
}


export default function Flight(props) {
  // const [loading, setLoading] = useState(false);
  // const [currBusSeats, setCurrBusSeats] = useState(Number(props.currBusinessSeats));
  // const [currEconSeats, setCurrEconSeats] = useState(Number(props.currEconomySeats));
  const [deptSeats, setDeptSeats] = useState([]);
  const [retSeats, setRetSeats] = useState([]);
  // let chosenSeats = [];
  const cabin = props.type;
  const passengers = props.passengers;
  const rows = createRows((Number)(props.businessSeats), (Number)(props.economySeats), props.reservedSeats, cabin ==="Business");
  const isReturn = props.isReturn === "true";

  // console.log("hello from select seats class");

  SeatPicker.defaultProps = {
    addSeatCallback: function addSeatCallback(row, number, id) {
      console.log('Added seat ' + number + ', row ' + row + ', id ' + id);
      // if (cabin === "Business" || cabin === "business") {
      //   setCurrBusSeats(currBusinessSeats - 1);
      // }
      // else {
      //   setCurrEconSeats(currEconSeats - 1);
      // }
      props.callback(prevState => [...prevState, number] );

      // console.log(currBusSeats);
      // console.log(currEconSeats);
      // console.log(deptSeats);
      // console.log(retSeats);
    },
    removeSeatCallback: function removeSeatCallback(row, number, id) {
      console.log('Removed seat ' + number + ', row ' + row + ', id ' + id);
      // if (cabin === "Business" || cabin === "business") {
      //   setCurrBusSeats(currBusinessSeats + 1);
      // }
      // else {
      //   setCurrEconSeats(currEconSeats + 1);
      // }

        // var index = deptSeats.indexOf(number);
        // if (index > -1) {
          // setDeptSeats(prevDeptSeats => prevDeptSeats.filter(item => item !== number));
          props.callback(prevState => prevState.filter(item => item !== number));
          console.log("set sel hena");
        // }
      
    
      // console.log(currBusSeats);
      // console.log(currEconSeats);
      // console.log(deptSeats);
      // console.log(retSeats);
    },
  };

  let title;
  if (isReturn) {
    title = <h4>Return flight</h4>
  }
  else {
    title = <h4>Departure flight</h4>
  }
  return (
    <div className="App">
      <div
        display="flex"
        flex-flexDirection="row"
      >
        <div >

          {title}
          <SeatPicker id="return" rows={rows} maxReservableSeats={passengers} visible />
        </div>
      </div>
    </div>
  );
}