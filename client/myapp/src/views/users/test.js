import React, { Component } from 'react';
import CustomDropdown from "./../../components/CustomDropdown/CustomDropdown.js";
// note that you can also export the source data via CountryRegionData. It's in a deliberately concise format to 
// keep file size down
import { CountryDropdown} from 'react-country-region-selector';
import PhoneInput from 'react-phone-number-input'
import { useState } from "react";
import CustomInput from "./../../components/CustomInput/CustomInput.js";
import GridItem from "./../../components/Grid/GridItem.js";
import GridContainer from "./../../components/Grid/GridContainer.js";





export default function test() {
    const [value, setValue] = useState("");
    return (
        <GridContainer 
        display="flex"
        flex-flexDirection="row">
            
  <GridItem xs={2} sm={2} md={2}  display="flex"
        flex-flexDirection="row">
                   <PhoneInput
  international
  defaultCountry="RU"
  value={value}
  onChange={setValue}/>
</GridItem>
         </GridContainer>
      
       
    )
}


// class Test extends Component {
//     constructor (props) {
//       super(props);
//       this.state = { country: '', region: '' };
//     }
  
//     selectCountry (val) {
//       this.setState({ country: val });
//     }
//    selectRegion (val) {
//       this.setState({ region: val });
//     }
//     render () {
//         const { country} = this.state;
//         return (
//           <div>
//             <CustomDropdown
//               value={country}
//               onChange={(val) => this.selectCountry(val)} />
//           </div>
//         );
//       }
//     }

//     export default Test;

