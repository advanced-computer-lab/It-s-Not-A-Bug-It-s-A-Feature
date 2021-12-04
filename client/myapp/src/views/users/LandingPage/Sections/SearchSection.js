import * as React from 'react';

import Box from '@material-ui/core/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@material-ui/core/TextField';
import Location from '@material-ui/icons/LocationOnSharp';
import CssBaseline from '@mui/material/CssBaseline';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import Stack from '@mui/material/Stack';
// import Button from '@material-ui/core/Button';
import Color from 'color';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from "../../../../components/CustomButtons/Button.js";
import Button2 from "@material-ui/core/Button";
import { useHistory } from "react-router";

import axios from 'axios';


// new things  for drop down menue 
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import Tooltip from "@material-ui/core/Tooltip";
import { useState } from "react";

//Things from template
import CustomDropdown from "../../../../components/CustomDropdown/CustomDropdown.js";
import { Link } from "react-router-dom";
import styles from "../../../../assets/jss/material-kit-react/components/headerLinksStyle.js";
import { makeStyles } from "@material-ui/styles";


import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const useStyles = makeStyles(styles);
export default function Main() { 
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  // ----------------------------------  for the number of passengers ------------------------------

  const [countPassengers, setCountPassengers] = useState(1); //since we must have 1 adult
  const [cabin, setCabin] = useState("Economy"); // will store the name of the cabin that we choose 


  
var departFlights; // variable to hold the departure flights of the search query
var returnFlights; // variable to hold the return flights of the search query
// const [departFlights, setdepartFlights] = useState([]);
// const [returnFlights, setreturnFlights] = useState([]);

  // we will use this to to fade the buttons 
  const [buttonFade1 , setButtonFade1]= useState(false);
  const [buttonFade2 , setButtonFade2]= useState(false);

  //
  const [arrival, setarrival] = useState("");
  const [departure, setdeparture] = useState("");
  const [arrivalDate, setarrivalDate] = useState("");
  const [departureDate, setdepartureDate] = useState("");

  //_______ADULT__________
  const [countAdults, setCountAdults] = useState(1);
  const IncNumAdults = () => {
    setCountAdults(countAdults + 1);
    setCountPassengers(countPassengers+1);
    
  };
 
  const DecNumAdults = () => {
    if (countAdults > 1) {
        setCountPassengers(countPassengers-1);
        setCountAdults(countAdults - 1);
    }
    else {
        setCountAdults(1);
      // rather than alert we just need to make the button fadeout 
      alert("min limit reached");
    }
  };

   //_______CHILDREN_________

   const [countChild, setCountChild ]= useState(0);
   const IncNumChild = () => {
    setCountChild(countChild + 1);
    setCountPassengers(countPassengers+1);
   };
   const DecNumChild = () => {
     if (countChild > 0) {
        setCountPassengers(countPassengers-1);
        setCountChild(countChild - 1);
     }
     else {

        setCountChild(0);
       // rather than alert we just need to make the button fadeout 
     }
   };

   const onSubmit= ()=>{
     
    if(departure==""){alert('please enter a departuring destination');}
    else
    if(arrival==""){alert('please enter an arrival destination');}
    else
    if(departureDate==""&& arrivalDate==""){alert('please enter a Date');}
    else{
    history.push({
      pathname:"/search" ,
      state: {
        arrivalAirport:arrival,
      departureDate:departureDate,
      departureAirport:departure,
      arrivalDate:arrivalDate,
      adultsNo:countAdults,
      childrenNo:countChild,
        type:cabin,
        count:countPassengers
      } 
      
   });
  //  else
  //  alert("Sever is not working");
}
  };


  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  
 
    return (
  <Card margin="none"
   >
      <CardContent 
       >
           <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 0.5, width: '24ch'},
       
      }}
      noValidate
      autoComplete="on"
      textAlign="on"
      alignSelf="on"
      display="flex"
      flex-flexDirection="row"
     
    >
        <div>
        <Typography sx={{ fontSize: 17 }}  gutterBottom  >
        Leaving from
        </Typography>
      <TextField 
      id="departure" 
      variant="outlined" 
      placeholder="Select origin"
      value={departure}
      color="warning"
      onChange={(e) => {
        setdeparture(e.target.value);
      }}
      focused/>
      </div>
    
    {/* <SwapHorizIcon sx={{mt:28}}color="primary"/> */}
    <div>
    <Typography sx={{ fontSize: 17 }}  gutterBottom >
       Going to
        </Typography>
      <TextField 
      
      id="outlined-basic" 
      variant="outlined" 
      placeholder="Select destination"
      value={arrival}
      onChange={(e) => {
        setarrival(e.target.value);
      }}
      focused/>
      </div>

<div>
 <Typography sx={{ fontSize: 17 }}  gutterBottom >
       Check in
        </Typography>
      <TextField 
      id="outlined-basic" 
      type="date"
      variant="outlined" 
      placeholder="Select destination"
      value={departureDate}
      onChange={(e) => {
        setdepartureDate(e.target.value);  
      }}
      focused/>
      </div>
<div>
   <Typography sx={{ fontSize: 17 }}  gutterBottom >
       Check out
        </Typography>
      <TextField 
      id="outlined-basic" 
      type="date"
      variant="outlined" 
      Container=""
      placeholder="Select destination"
      value={arrivalDate}
      onChange={(e) => {
        setarrivalDate(e.target.value);
      }}
      focused/>
 </div>
   
        <div>
  <Typography sx={{ fontSize: 17 }}  gutterBottom >
       <br/>
        </Typography>
      < div/>
 <CustomDropdown
          noLiPadding
          buttonText={(countPassengers>1)?countPassengers+" Travellers":countPassengers+" Traveller"} //traveller handle
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
            
          }}
          dropdownList={[
            <Link className={classes.dropdownLink}>
                <h4>  Adults</h4>  
               <div className="main_div">
        <div className="center_div">
      
          <div className="btn_div">
            <Tooltip title="Delete">
            <Button2 onClick={DecNumAdults}>
              <RemoveCircleOutlineSharpIcon />
            </Button2>
            </Tooltip>
            {countAdults}
            <Button2 onClick={IncNumAdults}>
                < AddCircleOutlineSharpIcon />
              </Button2>
            </div>
        </div>
      </div>
            </Link>,
            <a
              className={classes.dropdownLink}
            >
     <h4>   Children</h4>     
     <br/>    
    <div className="main_div">
    <div className="center_div">
   
      <div className="btn_div">
        <Tooltip title="Delete">
        <Button2 onClick={DecNumChild}>
          <RemoveCircleOutlineSharpIcon />
        </Button2>
        </Tooltip>
        {countChild}
        <Button2
           onClick={IncNumChild}>
            < AddCircleOutlineSharpIcon />
          </Button2>
        </div>
    </div>
  </div>
            </a>,
          ]}
        />
     
 </div>
<div> 
   <div>
  <Typography sx={{ fontSize: 17 }}  gutterBottom >
       <br/>
        </Typography>
      < div/>
        <CustomDropdown
          noLiPadding
          buttonText={cabin}
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
            
          }}
          dropdownList={[
            <Link className={classes.dropdownLink}
            onClick={(e) => {setCabin("Economy");}}
            >
               <h4>  Economy </h4>  
         </Link>,
            <a 
              className={classes.dropdownLink}
              onClick={(e) => {setCabin("Business");}}
            >
     <h4>   Business</h4>     
        
            </a>,
          ]}
        />
  <div/>
  </div>
      {/* <Button
       
        id="demo-customized-button"
        aria-controls="demo-customized-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        // variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        size="large"
      >
       {countPassengers}_Traveller(s)
      </Button> */}
      {/* <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      > */}
            {/* Adults         
        <div className="main_div">
        <div className="center_div">
      
          <div className="btn_div">
            <Tooltip title="Delete">
            <Button2 onClick={DecNumAdults}>
              <RemoveCircleOutlineSharpIcon />
            </Button2>
            </Tooltip>
            {countAdults}
            <Button2 onClick={IncNumAdults}>
                < AddCircleOutlineSharpIcon />
              </Button2>
            </div>
        </div>
      </div> */}
 
        {/* <br/> */}
        
            {/* Children         
        <div className="main_div">
        <div className="center_div"> */}
        {/* <Typography sx={{ fontSize: 18 ,align :"right"}}  gutterBottom >
       Helloo
        </Typography> */}
          {/* <div className="btn_div">
            <Tooltip title="Delete">
            <Button2 onClick={DecNumChild}>
              <RemoveCircleOutlineSharpIcon />
            </Button2>
            </Tooltip> */}
            {/* {countChild}
            <Button2
               onClick={IncNumChild}>
                < AddCircleOutlineSharpIcon />
              </Button2>
            </div>
        </div>
      </div>
      <br/>
      </StyledMenu> */}
</div>

<div>

<Typography sx={{ fontSize: 17 }}  gutterBottom >
       <br/>
        </Typography>
<Button 

color = "warning"
// color="transparent"
size="lg"
id="demo-customized-button"
aria-controls="demo-customized-menu"
aria-haspopup="true"
variant="contained"
disableElevation
onClick={(e) => {onSubmit(e);
}}
>Search</Button>
</div>

</Box>

      </CardContent>
    </Card>


  
    );
        };
  