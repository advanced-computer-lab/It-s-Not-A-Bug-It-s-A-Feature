import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
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
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LockIcon from '@mui/icons-material/Lock';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Check from "@material-ui/icons/Check";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import { Icon } from '@iconify/react';
import CustomDropdown from "./../../components/CustomDropdown/CustomDropdown.js";


import styles from "./../../assets/jss/material-kit-react/views/loginPage.js";

import image from "./../../assets/img/reg.jpeg";
const useStyles = makeStyles(styles);

export default function SignUp(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  let history = useHistory();

  const [isLogged, setLogged] = useState(false);

  const [checked, setChecked] = useState([24, 22]);
  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const onSubmit = (e) => {
    // i want to change the navbar links here
    e.preventDefault();
    setLogged(true);
    history.push('/profile');
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
          <GridContainer justify="center" >
            <GridItem xs={12} sm={12} md={7} 
            >
              <Card className={classes[cardAnimaton]}
                display="flex"
                flex-flexDirection="row">
                
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4> Sign up </h4>
                  </CardHeader>

                  <CardBody  >
                  <h5> User details</h5>
                  <GridContainer>
                
                 
                     <GridItem xs={12} sm={6}>
                    <CustomInput
                      labelText="First name"
                      id="FirstName"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                      }}
                    />
                    </GridItem>
                    <GridItem xs={12} sm={6} >
                    <CustomInput
                      labelText="Lastname"
                      id="Last name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                      }}
                    />
                    </GridItem>
                    <GridItem xs={12} sm={12} >
                    <CustomInput
                      labelText="Username"
                      id="Username"
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
                      }}
                    />
                 </GridItem>
                    <GridItem xs={12} sm={12} >
                    <CustomInput
                      labelText="Email"
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor}>
                            </Email>
                          </InputAdornment>
                        ),

                      }}
                    />
                    </GridItem>
                    <GridItem xs={12} sm={12} >
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
                      }}
                    />
                    </GridItem>
                    <GridItem xs={12} sm={12} >
                    <CustomInput
                      labelText="Confirm password"
                      id="confirm pass"
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
                      }}
                    />
                     </GridItem>
                    <GridItem xs={12} sm={12}>
                    <CustomInput
                      labelText="Address"
                      id="address"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <HomeRoundedIcon className={classes.inputIconsColor}>
                            </HomeRoundedIcon>
                          </InputAdornment>
                        ),

                      }}
                    />
                    </GridItem>
                 <GridItem xs={12} sm={4} >
                    <CustomInput
                      labelText="Select country"
                      id="phone"
                      inputProps={{
                        type: "text",
                        }}
                    />
                    </GridItem>
                  <GridItem xs={12} sm={4} >
                     <CustomInput
                      labelText="Country code"
                      id="phone"
                      inputProps={{
                        type: "text",
                        }}
                    />
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                     <CustomInput
                      labelText="Phone number"
                      id="phone"
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <PhoneIphoneRoundedIcon className={classes.inputIconsColor}>
                            </PhoneIphoneRoundedIcon>
                          </InputAdornment>
                        ),

                      }}
                    />
                    </GridItem>
                    <GridItem xs={12} sm={6} >
                    <CustomInput
                      labelText=" "
                      id="date"
                      inputProps={{
                        type: "date",
                       }}
                    />
                    </GridItem>
                   
                    <GridItem xs={12} sm={6} >
                    <CustomInput
                      labelText="Passport number"
                      id="pssport"
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon icon="mdi:passport" width="26" height="27" className={classes.inputIconsColor}/>
                          </InputAdornment>
                        ),

                      }}
                    />
                      </GridItem>
                    
                    {/* <CustomDropdown
                      noLiPadding
                      buttonText={cabin}
                      buttonProps={{
                        className: classes.navLink,
                        color: "transparent",

                      }}
                      dropdownList={[
                        <Link className={classes.dropdownLink}
                          onClick={(e) => { setCabin("Economy"); }}
                        >
                          <h4>  Economy </h4>
                        </Link>,
                        <a
                          className={classes.dropdownLink}
                          onClick={(e) => { setCabin("Business"); }}
                        >
                          <h4>   Business</h4>

                        </a>,
                      ]}
                    /> */}

   {/* {was trying to make a check box to agree to terms and conditions but failed} */}

{/* <div
                className={
                  classes.checkboxAndRadio +
                  " " +
                  classes.checkboxAndRadioHorizontal
                }
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle(22)}
                      checked={checked.indexOf(22) !== -1 ? true : false}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                        root: classes.checkRoot,
                      }}
                    />
                  }
                  classes={{ label: classes.label, root: classes.labelRoot }}
                  label="Checked"
                />
              </div> */}
              
                    </GridContainer>

                 
                  </CardBody>
                  <CardFooter className={classes.cardFooter}  >
                    <Button simple color="primary"
                      size="lg"
                      onClick={(e) => { onSubmit(e); }}>
                      Next
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>

            
          </GridContainer>
          <GridContainer justify="center" >
            <GridItem xs={12} sm={12} md={7} 
            >
              <Card className={classes[cardAnimaton]}
                display="flex"
                flex-flexDirection="row">
                
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4> Sign up </h4>
                  </CardHeader>

                  <CardBody  >
                    <h5> credit card details</h5>
                  <GridContainer>
                 <GridItem xs={12} sm={6} >
                    <CustomInput
                      labelText="Credit card number "
                      id="email"
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor}>
                            </Email>
                          </InputAdornment>
                        ),

                      }}
                    />
                    </GridItem>

                    <GridItem xs={12} sm={6} >
                    <CustomInput
                      labelText="CVV "
                      id="cvv"
                      inputProps={{
                        type: "text",
                       }}
                    />
                    </GridItem>
                    <GridItem xs={12} sm={12} >
                    <CustomInput
                      labelText=" "
                      id="date"
                      inputProps={{
                        type: "date",
                       }}
                    />
                    </GridItem>
                     <GridItem xs={12} sm={6}>
                    <CustomInput
                      labelText="First name"
                      id="FirstName"
                      inputProps={{
                        type: "text",
                      }}
                    />
                    </GridItem>
                    <GridItem xs={12} sm={6} >
                    <CustomInput
                      labelText="Lastname"
                      id="Last name"
                      inputProps={{
                        type: "text",
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
                      onClick={(e) => { onSubmit(e); }}>
                      Sign up
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
