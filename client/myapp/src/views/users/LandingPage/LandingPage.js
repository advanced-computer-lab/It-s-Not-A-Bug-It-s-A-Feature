import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/styles";

// @material-ui/icons

// core components
import Header from "./../../../components/Header/Header.js";
import Footer from "./../../../components/Footer/Footer.js";
import GridContainer from "./../../../components/Grid/GridContainer.js";
import GridItem from "./../../../components/Grid/GridItem.js";
import Button from "./../../../components/CustomButtons/Button.js";
import HeaderLinks from "./../../../components/Header/HeaderLinks.js";
import Parallax from "./../../../components/Parallax/Parallax.js";

import styles from "./../../../assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";


//import SectionBasics from "./Sections/SectionBasics.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  // const location = useLocation();
  let isLogged = props.isLogged
  // const isLogged = useParams();
  console.log(isLogged);
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="OverReact"
        rightLinks={<HeaderLinks isLogged = {isLogged}/>}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter image={require("./../../../assets/img/landing-bg.jpg").default}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Story Starts With Us.</h1>
              <h4>
                You are in the right place.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Watch video
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          {/* <TeamSection />
          <WorkSection /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
