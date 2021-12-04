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

//TODO - RESERVED seat should be disabled
//TODO - make sure they're reserving in the right cabin/class


function createRows(business, econ) {
  const allSeats = business + econ;
  var res = [...Array(Math.ceil(allSeats / 6))].map(x => Array(6).fill(0));
  for (let k = 1, i = 0; i < res.length; i++) {
    for (let j = 0; j <= 6; j++) {
      if (j == 3 || k > allSeats) {
        res[i][j] = { number: "", isReserved: true };
      }
      else {
        res[i][j] = { number: k++ };
      }
    }
  }
  return res;
}


export default function Flight(props) {
  const [loading, setLoading] = useState(false);
  const [currBusSeats, setCurrBusSeats] = useState((Number)(props.currBusinessSeats));
  const [currEconSeats, setCurrEconSeats] = useState((Number)(props.currEconomySeats));
  const [deptSeats, setDeptSeats] = useState([]);
  // const [retSeats, setRetSeats] = useState([]);
  // let chosenSeats = [];
  const cabin = props.type;
  const passengers = props.Number;
  const rows = createRows((Number)(props.businessSeats), (Number)(props.economySeats));
  const isReturn = props.isReturn ==="true";

  SeatPicker.defaultProps = {
    addSeatCallback: function addSeatCallback(row, number, id) {
      console.log('Added seat ' + number + ', row ' + row + ', id ' + id);
      if (cabin === "Business") {
        setCurrBusSeats(prevCurrBusSeats => prevCurrBusSeats + 1);
      }
      else {
        setCurrEconSeats(prevCurrEconSeats => prevCurrEconSeats + 1);
      }
      // if( === "dept"){
      setDeptSeats(prevDeptSeats => [...prevDeptSeats, number]);
      // }
      // else{
      //   setRetSeats(prevRetSeats => [...prevRetSeats, number]);
      // }
      console.log(currBusSeats);
      console.log(deptSeats);
      // console.log(retSeats);
    },
    removeSeatCallback: function removeSeatCallback(row, number, id) {
      console.log('Removed seat ' + number + ', row ' + row + ', id ' + id);
      if (cabin === "Business") {
        setCurrBusSeats(prevCurrBusSeats => prevCurrBusSeats - 1);
      }
      else {
        setCurrEconSeats(prevCurrEconSeats => prevCurrEconSeats - 1);
      }
      var index = deptSeats.indexOf(number);
      if (index > -1) {
        setDeptSeats(prevDeptSeats => prevDeptSeats.filter(item => item !== number));

      }
      console.log(currBusSeats);
      console.log(deptSeats);
      // console.log(retSeats);
    },
  };
  let history = useHistory();
  const onSubmit = () => {
    history.push({
      pathname: "/home", //ARO7 FEEEN B3D KEDA - mmkn profile
      state: {
        deptSeats: deptSeats
        // retSeats: retSeats
      }
    });
  };

  let title, submitButton;
  if(isReturn){
    title = <h4>Choose your seats - return flight</h4>
    submitButton = <Button
          color="warning"
          // color="transparent"
          size="lg"
          id="demo-customized-button"
          aria-controls="demo-customized-menu"
          aria-haspopup="true"
          variant="contained"
          disableElevation
          onClick={(e) => {
            onSubmit(e);
          }}
        >Next</Button>
  }
  else{
    title = <h4>Choose your seats - departure flight</h4>
    submitButton = <div></div>
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
      <div>
        
        {submitButton}
      </div>
    </div>
  );
}