import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
import Card from '@mui/material/Card';
import Carousel from "react-slick";
import LocationOn from "@material-ui/icons/LocationOn";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
// core components
import GridContainer from "./../../../../components/Grid/GridContainer.js";
import GridItem from "./../../../../components/Grid/GridItem.js";
import InfoArea from "./../../../../components/InfoArea/InfoArea.js";
// import React from "react";
// // react component for creating beautiful carousel
// import Carousel from "react-slick";
// // @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// // @material-ui/icons
// import LocationOn from "@material-ui/icons/LocationOn";
// core components
// import GridContainer from "./../../../../components/Grid/GridContainer.js";
// import GridItem from "./../../../../components/Grid/GridItem.js";
// import Card from "./../../../../components/Card/Card.js";
import medinaPic from "./../../../../assets/img/medina.jpg"
import venicePic from "./../../../../assets/img/venice.jpg"
import luxorPic from "./../../../../assets/img/luxor.jpg"

import styles from "./../../../../assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
// import styles from "./../../../../assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 2,
  //   slidesToScroll: 1,
  //   autoplay: true,
  // };
  return (
    // <div>hi</div>
    // <div className={classes.section}>
    //   <div className={classes.container}>
    //     <GridContainer>
    //       <GridItem xs={12} sm={12} md={12} className={classes.marginAuto}>
    //         <Card carousel>
    //           <Carousel {...settings}>
    //             <div>
    //               <img src={medinaPic} alt="First slide" className="slick-image" />
    //               <div className="slick-caption">
    //                 <h4>
    //                   <LocationOn className="slick-icons" />
    //                   Yellowstone National Park, United States
    //                 </h4>
    //               </div>
    //             </div>
    //             <div>
    //               <img
    //                 src={venicePic}
    //                 alt="Second slide"
    //                 className="slick-image"
    //               />
    //               <div className="slick-caption">
    //                 <h4>
    //                   <LocationOn className="slick-icons" />
    //                   Somewhere Beyond, United States
    //                 </h4>
    //               </div>
    //             </div>
    //             <div>
    //               <img src={luxorPic} alt="Third slide" className="slick-image" />
    //               <div className="slick-caption">
    //                 <h4>
    //                   <LocationOn className="slick-icons" />
    //                   Yellowstone National Park, United States
    //                 </h4>
    //               </div>
    //             </div>
    //           </Carousel>
    //         </Card>
    //       </GridItem>
    //     </GridContainer>
    //   </div>
    // </div>


    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Top Destinations</h2>
           {/* <h5 className={classes.description}>
            This is the paragraph where you can write more details about your
            product. Keep you user engaged by providing meaningful information.
            Remember that by this time, the user is curious, otherwise he wouldn
            {"'"}t scroll to get here. Add a button if you want the user to see
            more.
          </h5>  */}
        </GridItem>
      </GridContainer>
      <div>
        <br/>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
          <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image = {luxorPic}
                  alt="luxor"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Luxor, Egypt
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Seven-thousand year old civilization
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            {/* <InfoArea
              title="Verified Users"
              description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
              icon={VerifiedUser}
              iconColor="success"
              vertical
            /> */}
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image = {medinaPic}
                  alt="medina"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Medina, Saudi Arabia
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your peaceful, relegious getaway
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
          <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image = {venicePic}
                  alt="venice"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Venice, Itay
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    The heart of art and architecture
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
