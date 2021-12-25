import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
import GridContainer from "./../../../../components/Grid/GridContainer.js";
import GridItem from "./../../../../components/Grid/GridItem.js";
import Card from "./../../../../components/Card/Card.js";
import Button from "./../../../../components/CustomButtons/Button.js";
import image1 from "./../../../../assets/img/capetown.jpeg";
import image2 from "./../../../../assets/img/china.jpg";
import image3 from "./../../../../assets/img/sydney.jpg";
import image4 from "./../../../../assets/img/russia.jpg";
import image5 from "./../../../../assets/img/istanbul.jpg";
import image6 from "./../../../../assets/img/berlin.jpg";
import image7 from "./../../../../assets/img/budapest.jpg";
import image8 from "./../../../../assets/img/bali.jpg";

import styles from "./../../../../assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";

const useStyles = makeStyles(styles);



export default function SectionCarousel() {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,


  };
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={14} sm={14} md={10} className={classes.marginAuto}>
            <Card carousel>
              <Carousel {...settings}>

                <Button color="transparent">
                  <img src={image1} alt="First slide" className="slick-image" />
                  <div className="slick-caption">
                    <div className={classes.typo}>
                      <h2 className={classes.title}> <LocationOn className="slick-icons" /> Cape Town, South Africa</h2>
                    </div>
                  </div>
                </Button>

                <Button color="transparent">
                  <img src={image3} alt="Third slide" className="slick-image" />
                  <div className="slick-caption">
                    <div className={classes.typo}>
                      <h2 className={classes.title}> <LocationOn className="slick-icons" /> Sydney, Austrailia</h2>
                    </div>
                  </div>
                </Button>

                <Button color="transparent">
                  <img src={image4} alt="Third slide" className="slick-image" />
                  <div className="slick-caption">
                    <div className={classes.typo}>
                      <h2 className={classes.title}> <LocationOn className="slick-icons" />  Mosscow, Russia</h2>
                    </div>
                  </div>
                </Button>

                <Button color="transparent">
                  <img src={image5} alt="Third slide" className="slick-image" />
                  <div className="slick-caption">
                    <div className={classes.typo}>
                      <h2 className={classes.title}> <LocationOn className="slick-icons" />  Istanbul, Turkey</h2>
                    </div>
                  </div>
                </Button>

                <Button color="transparent">
                  <img src={image6} alt="Third slide" className="slick-image" />
                  <div className="slick-caption">
                    <div className={classes.typo}>
                      <h2 className={classes.title}> <LocationOn className="slick-icons" />   Berlin, Germany</h2>
                    </div>
                  </div>
                </Button>

                <Button color="transparent">
                  <img src={image7} alt="Third slide" className="slick-image" />
                  <div className="slick-caption">
                    <div className={classes.typo}>
                      <h2 className={classes.title}> <LocationOn className="slick-icons" />    Budapest, Hungary</h2>
                    </div>
                  </div>
                </Button>


                <Button color="transparent">
                  <img src={image8} alt="Third slide" className="slick-image" />
                  <div className="slick-caption">
                    <div className={classes.typo}>
                      <h2 className={classes.title}> <LocationOn className="slick-icons" />     Bali, Indonesia</h2>
                    </div>
                  </div>
                </Button>

              </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
