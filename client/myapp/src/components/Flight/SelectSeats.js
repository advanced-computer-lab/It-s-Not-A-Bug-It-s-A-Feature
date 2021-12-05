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

//TODO - RESERVED seats should be disabled
//TODO - make sure they're reserving in the right cabin/class
//handle currbusiness and econ seats - maybe in parent component - update flight w new values
//get the dept and arr selected seats to ust in post request


function createRows(business, econ) {
  // console.log("creating rows");
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
  // const [loading, setLoading] = useState(false);
  const [currBusSeats, setCurrBusSeats] = useState(Number(props.currBusinessSeats));
  const [currEconSeats, setCurrEconSeats] = useState(Number(props.currEconomySeats));
  const [deptSeats, setDeptSeats] = useState([]);
  const [retSeats, setRetSeats] = useState([]);
  // let chosenSeats = [];
  const cabin = props.type;
  const passengers = props.passengers;
  const rows = createRows((Number)(props.businessSeats), (Number)(props.economySeats));
  const isReturn = props.isReturn === "true";

  // console.log("hello from select seats class");

  SeatPicker.defaultProps = {
    addSeatCallback: function addSeatCallback(row, number, id) {
      console.log('Added seat ' + number + ', row ' + row + ', id ' + id);
      if (cabin === "Business" || cabin === "business") {
        setCurrBusSeats(currBusinessSeats - 1);
      }
      else {
        setCurrEconSeats(currEconSeats - 1);
      }
      // if( !isReturn){ 
      // props.callback(prevState => { return { ...prevState, ["reservedSeats"]: [...prevState.reservedSeats, number] }; });
      props.callback(prevState => [...prevState, number] );

      // setDeptSeats(prevDeptSeats => [...prevDeptSeats, number]);
      // }
      // else{
      //   // setRetData(prevState => { return { ...prevState, ["reservedSeats"]: [...retData.reservedSeats, number] }; });
      //   props.callback(prevState => { return { ...prevState, ["reservedSeats"]: [...prevState.reservedSeats, number] }; });
      //   setRetSeats(prevRetSeats => [...prevRetSeats, number]);
      // }
      console.log(currBusSeats);
      console.log(currEconSeats);
      console.log(deptSeats);
      console.log(retSeats);
    },
    removeSeatCallback: function removeSeatCallback(row, number, id) {
      console.log('Removed seat ' + number + ', row ' + row + ', id ' + id);
      if (cabin === "Business" || cabin === "business") {
        setCurrBusSeats(currBusinessSeats + 1);
      }
      else {
        setCurrEconSeats(currEconSeats + 1);
      }

      if (!isReturn) {
        var index = deptSeats.indexOf(number);
        if (index > -1) {
          setDeptSeats(prevDeptSeats => prevDeptSeats.filter(item => item !== number));
          console.log("set sel hena");
        }
      }
      else {
        var index = retSeats.indexOf(number);
        if (index > -1) {
          setRetSeats(prevRetSeats => prevRetSeats.filter(item => item !== number));
        }
      }
      console.log(currBusSeats);
      console.log(currEconSeats);
      console.log(deptSeats);
      console.log(retSeats);
    },
  };
  let history = useHistory();
  const onSubmit = () => {

    // axios.post('http://localhost:8000/user/res', {
    //     body:
    //     {
    //         resID: Number(props.resID),
    //         adultsNo: Number(props.adultsNo),

    //         childrenNo: Number(props.childrenNo),
    //         seatClass: type,
    //         deptFlight: deptFlight,
    //         arrFlight: retFlight,
    //         deptSeats: deptSeats, //???????
    //         arrSeats: arrSeats, //??????


    //     }
    // }).then(res => {
    //     console.log(res.data);
    // }).catch(err => console.log(err))
    // history.push({
    //   pathname: "/home", //ARO7 FEEEN B3D KEDA - mmkn profile
    //   state: {
    //     deptSeats: ,
    //     retSeats: retSeats
    //   }
    // });
  };

  let title, submitButton;
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
      <div>

        {/* <Button
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
    >Save</Button> */}
        {/* {submitButton} */}
      </div>
    </div>
  );
}