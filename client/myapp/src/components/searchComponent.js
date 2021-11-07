import * as React from 'react';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Location from '@material-ui/icons/LocationOnSharp';
// import DateIcon from '';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

import DateRangePicker from '@material-ui/lab/DateRangePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import Paper from '@material-ui/core/Container';
import Stack from '@material-ui/core/Stack';
import { styled } from '@material-ui/core/styles';
import DateRangeTwoToneIcon from '@material-ui/icons/DateRangeTwoTone';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

function onChangeFlightNo (){

}
function onChangeArrivalAirport (){
  
}
function onChangeDepartureAirport(){
  
}
function onChangeArrivalTerminal (){
  
}
function onChangeDepartureTerminal (){
  
}
function onChangeArrivalTime (){
  
}
function onChangeDepartureTime (){
  
}
function onChangeArrivalDate (){
  
}
function onChangeDepartureDate (){
  
}
export default function InputWithIcon() {
    const [value, setValue] = React.useState([null, null]);
  return (
    <div>
    
    <Stack direction="row" spacing={1}>
    
        <Box  sx={{ display: 'flex', alignItems: 'flex-end' }}>
       <Location sx={{ color: 'action.active', mr: 1, my: 2.8 }} />
       <TextField 
        id="input-with-sx" 
        label="City or Airport" 
        variant="standard" 
        helperText="Leaving from"
        onChange={this.onChangeDepartureAirport}
        />
        </Box>
  
    <div><SwapHorizIcon sx={{color: 'action.active' , mt:2.5}} /></div>
    
    <Box  sx={{ display: 'flex', alignItems: 'flex-end' }}>
     <Location sx={{ color: 'action.active', mr: 1, my: 2.8 }} />
     <TextField id="input-with-sx" 
        label="City or Airport" 
        variant="standard" 
        helperText="Going to" 
        onChange={this.onChangeArrivalAirport}

        />
      </Box> 
        
        
    <LocalizationProvider dateAdapter={AdapterDateFns}>
       <DateRangePicker
       sx={{ color: 'action.active'}}
        startText=""
        endText=""
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
           <DateRangeTwoToneIcon sx={{ color: 'action.active', mr: 1, mt: 1.5 }}/>
           <TextField {...startProps} 
             id="input-with-sx" 
             variant="standard" 
             helperText="Departing"
             onChange={this.onChangeDepartureDate}
            />
            <Box sx={{ mx: 3, my :0.5 }}>to</Box>
            <DateRangeTwoToneIcon sx={{ color: 'action.active', mr: 1, mt: 1.5 }}/>
            <TextField {...endProps} 
            id="input-with-sx"  
            variant="standard" 
            helperText="Arrival" 
            placeholder='mm/dd/yy'
            onChange={this.onChangeArrivalDate}

            />
          </React.Fragment>
        )}
      />
      </LocalizationProvider>

    </Stack>

    <Stack direction="row" spacing={1} sx={{ml:3.8,mt:1.5}}>

    <Box   sx={{color: 'action.active',display: 'flex', alignItems: 'right',mt:2 , mr:1.5}}>
    <TextField
        id="time1"
        type="time"
        variant="standard" 
        onChange={this.onChangeDepartureTime}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
    
        helperText="Departing Time"
      />
      </Box>
   <Box sx={{ color: 'action.active',display: 'flex', alignItems: 'right',mt:2,mr:1.5}}>
        <TextField
                id="time2"
                type="time"
                variant="standard" 
                onChange={this.onChangeArrivalTime}
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 300, // 5 min
                }}
              helperText="Arrival Time"
            /> 
            </Box>

     <Box  sx={{ display: 'flex', alignItems: 'right',mr:1.5 }}>

     <TextField 
        id="input-with-sx" 
        label="Terminal No" 
        variant="standard" 
        helperText="Departing"/>
        onChange={this.onChangeDepartureTerminal}

        </Box>
  
    
      <Box  sx={{ display: 'flex', alignItems: 'right' ,mr:1.5}}>
      <TextField 
        id="input-with-sx" 
        label="Terminal No" 
        variant="standard" 
        helperText="Arrial" 
        onChange={this.onChangeArrivalTerminal}
        />
      </Box> 
      <Box  sx={{ display: 'flex', alignItems: 'right',mr:1.5}}>
      <TextField 
        id="input-with-sx" 
        label="Flight No" 
        variant="standard" 
        onChange={this.onChangeFlightNo}

        />
      </Box> 
    </Stack>
     <Button variant="contained"  size='small' sx={{ alignItems: 'right',ml:100 , mb:10}}>
             Serach
        </Button>
      
    </div>


  );
}