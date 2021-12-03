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
import Button from "./../../components/CustomButtons/Button.js";
import Button2 from "@material-ui/core/Button";



// new things  for drop down menue 
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import Tooltip from "@material-ui/core/Tooltip";
import { useState } from "react";

//Things from template
import CustomDropdown from "./../../components/CustomDropdown/CustomDropdown.js";
import textBox from "./../..//components/CustomInput/CustomInput.js";
import { Apps, CloudDownload } from "@material-ui/icons";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { Link } from "react-router-dom";
import styles from "./../../assets/jss/material-kit-react/components/headerLinksStyle.js";
import { makeStyles } from "@material-ui/styles";


import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  // ----------------------------------  for the number of passengers ------------------------------

  const [countPassengers, setCountPassengers] = useState(1); //since we must have 1 adult
  const [cabin, setCabin] = useState(""); // will store the name of the cabin that we choose 

  // we will use this to to fade the buttons 
  const [buttonFade1 , setButtonFade1]= useState(false);
  const [buttonFade2 , setButtonFade2]= useState(false);


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

 //_______INFANTS_________


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
 
    return (



      

        // <Card sx={{ minWidth: 275 ,  backgroundColor:"black" , alignContent: "center",opacity:0.1}}
        <Card sx={{ minWidth: 275 }}>
      <CardContent 
       >
           <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '20ch'},
       
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
    //   sx={{ Color:"white"}} 
      id="outlined-basic" 
      variant="outlined" 
      placeholder="Select origin"
      focused/>
      </div>
    {/* <SwapHorizIcon/> */}
    <div>
    <Typography sx={{ fontSize: 17 }}  gutterBottom >
       Going to
        </Typography>
      <TextField 
      id="outlined-basic" 
      variant="outlined" 
      placeholder="Select destination"
      focused/>
      </div>

<div>
 <Typography sx={{ fontSize: 17 }}  gutterBottom >
       From
        </Typography>
      <TextField 
      id="outlined-basic" 
      type="date"
      variant="outlined" 
      placeholder="Select destination"
      focused/>
      </div>
<div>
   <Typography sx={{ fontSize: 17 }}  gutterBottom >
       To
        </Typography>
      <TextField 
      id="outlined-basic" 
      type="date"
      variant="outlined" 
      Container=""
      placeholder="Select destination"
      focused/>
 </div>
 
    {/* </Box> */}
    <div>
    <Typography sx={{ fontSize: 17 }}  gutterBottom >
       <br/>
        </Typography>

      <Button
       
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
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
                 
        {/* <Divider sx={{ my: 1 }}
        orientation='vertical' /> */}
        {/* <MenuItem disableRipple> */}
            Adults         
        <div className="main_div">
        <div className="center_div">
      
          <div className="btn_div">
            <Tooltip title="Delete">
            <Button onClick={DecNumAdults}>
              <RemoveCircleOutlineSharpIcon />
            </Button>
            </Tooltip>
            {countAdults}
            <Button onClick={IncNumAdults}>
                < AddCircleOutlineSharpIcon />
              </Button>
            </div>
        </div>
      </div>
   {/* </MenuItem> */}
        <br/>
        {/* <MenuItem disableRipple> */}
            Children         
        <div className="main_div">
        <div className="center_div">
        {/* <Typography sx={{ fontSize: 18 ,align :"right"}}  gutterBottom >
       Helloo
        </Typography> */}
          <div className="btn_div">
            <Tooltip title="Delete">
            <Button onClick={DecNumChild}>
              <RemoveCircleOutlineSharpIcon />
            </Button>
            </Tooltip>
            {countChild}
            <Button
               onClick={IncNumChild}>
                < AddCircleOutlineSharpIcon />
              </Button>
            </div>
        </div>
      </div>
      <br/>
      </StyledMenu>
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
>Search</Button>
</div>
</Box>
 <div>
 <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Components"
          buttonProps={{
            
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={[
            <gego>
              All components
            </gego>
            ,
            <a
              // href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
              // target="_blank"
              // className={classes.dropdownLink}
            >
              Documentation
            </a>,
          ]}
        />
      </ListItem>
 </div>
      </CardContent>
    </Card>


  
    );
        };
  