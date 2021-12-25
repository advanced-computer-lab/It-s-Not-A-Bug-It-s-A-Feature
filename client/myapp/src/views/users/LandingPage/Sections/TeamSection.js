import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/styles";

// @material-ui/icons

// core components
import GridContainer from "./../../../../components/Grid/GridContainer.js";
import GridItem from "./../../../../components/Grid/GridItem.js";
import Button from "./../../../../components/CustomButtons/Button.js";
import Card from "./../../../../components/Card/Card.js";
import CardBody from "./../../../../components/Card/CardBody.js";
import CardFooter from "./../../../../components/Card/CardFooter.js";

import styles from "./../../../../assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import IconButton from '@mui/material/IconButton';

import aya from "./../../../../assets/img/faces/aya.jpg";
import basant from "./../../../../assets/img/faces/Basant.jpg";
import eman from "./../../../../assets/img/faces/iman.jpg";
import khadija from "./../../../../assets/img/faces/khadija.jpg";
import michael from "./../../../../assets/img/faces/michael.jpg";

import team2 from "./../../../../assets/img/faces/christian.jpg";
import team3 from "./../../../../assets/img/faces/kendall.jpg";

import codeforces from "./../../../../assets/img/icons/codeforces.jpg";
import linkedin from "./../../../../assets/img/icons/LinkedInIcon.png";
import github from "./../../../../assets/img/icons/gitHubIcon.png";
import leetcode from "./../../../../assets/img/icons/leetcode.png";





const useStyles = makeStyles(styles);

export default function TeamSection() {
    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    return (
        <div className={classes.section}>
            <h2 className={classes.title}>Here is our team</h2>
            <div>
                <GridContainer justify="center" alignItems="center" >
                    <GridItem xs={12} sm={12} md={4}>
                        <Card plain>
                            <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                                <img src={aya} alt="..." className={imageClasses} />
                            </GridItem>
                            <h4 className={classes.cardTitle}>
                                Aya Elgamal
                                <br />
                                <small className={classes.smallTitle}>Software Engineer</small>
                            </h4>
                            <CardBody>
                                <p className={classes.description}>
                                Spread happiness everywhere you go!

                                
                                </p>
                            </CardBody>
                            <CardFooter className={classes.justifyCenter}>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                    href="https://codeforces.com/profile/aya.elgamal"
                                >
                                    <img src={codeforces} alt="..." className={imageClasses} />
                                </Button>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                    href="https://github.com/ayaelgamall/"
                                >
                                    <img src={github} alt="..." className={imageClasses} />
                                </Button>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                    href="https://www.linkedin.com/in/ayaelgamal/"
                                >
                                    <img src={linkedin} alt="..." className={imageClasses} />
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    
                    <GridItem xs={12} sm={12} md={4}>
                        <Card plain>
                            <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                                <img src={basant} alt="..." className={imageClasses} />
                            </GridItem>
                            <h4 className={classes.cardTitle}>
                                Basant Allam
                                <br />
                                <small className={classes.smallTitle}>Software Engineer</small>
                            </h4>
                            <CardBody>
                                <p className={classes.description}>
                                If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.
                                </p>
                            </CardBody>
                            <CardFooter className={classes.justifyCenter}>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                    href="https://codeforces.com/profile/Basant.Allam"
                                >
                                    <img src={codeforces} alt="..." className={imageClasses} />
                                </Button>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                    href="https://github.com/Basantallam/"
                                >
                                    <img src={github} alt="..." className={imageClasses} />
                                </Button>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                    href="https://www.linkedin.com/in/basant-allam/"
                                >
                                    <img src={linkedin} alt="..." className={imageClasses} />
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card plain>
                            <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                                <img src={eman} alt="..." className={imageClasses} />
                            </GridItem>
                            <h4 className={classes.cardTitle}>
                                Eman Osama
                                <br />
                                <small className={classes.smallTitle}>Software Engineer</small>
                            </h4>
                            <CardBody>
                                <p className={classes.description}>
                                    You can write here details about one of your team members. You
                                
                                </p>
                            </CardBody>
                            <CardFooter className={classes.justifyCenter}>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                    href="https://leetcode.com/EmanOss/"
                                >
                                    <img src={leetcode} alt="..." className={imageClasses} />
                                </Button>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                    href="https://github.com/EmanOss/"
                                >
                                    <img src={github} alt="..." className={imageClasses} />
                                </Button>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                    href="https://www.linkedin.com/in/eman-osama-saad/"
                                >
                                    <img src={linkedin} alt="..." className={imageClasses} />
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card plain>
                            <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                                <img src={khadija} alt="..." className={imageClasses} />
                            </GridItem>
                            <h4 className={classes.cardTitle}>
                                Khadija Badrawy
                                <br />
                                <small className={classes.smallTitle}>Software Engineer</small>
                            </h4>
                            <CardBody>
                                <p className={classes.description}>
                                   Be the change you want to see in the world, and never let the world change you.
                                </p>
                            </CardBody>
                            <CardFooter className={classes.justifyCenter}>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                    href="https://codeforces.com/profile/Khadija_Badrawy"
                                >
                                    <img src={codeforces} alt="..." className={imageClasses} />
                                </Button>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                    href="https://github.com/kbadrawy/"
                                >
                                    <img src={github} alt="..." className={imageClasses} />
                                </Button>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                    href="https://www.linkedin.com/in/khadija-badrawy/"
                                >
                                    <img src={linkedin} alt="..." className={imageClasses} />
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card plain>
                            <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                                <img src={michael} alt="..." className={imageClasses} />
                            </GridItem>
                            <h4 className={classes.cardTitle}>
                                Michael Bassily
                                <br />
                                <small className={classes.smallTitle}>Software Engineer</small>
                            </h4>
                            <CardBody>
                                <p className={classes.description}>
                                   You only fail when you stop trying.
                                </p>
                            </CardBody>
                            <CardFooter className={classes.justifyCenter}>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                    href="https://codeforces.com/profile/MichaelT2"
                                >
                                    <img src={codeforces} alt="..." className={imageClasses} />
                                </Button>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                    href="https://github.com/MichaelTito1"
                                >
                                    <img src={github} alt="..." className={imageClasses} />
                                </Button>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                    href="https://www.linkedin.com/in/michael-girges/"
                                >
                                    <img src={linkedin} alt="..." className={imageClasses} />
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
}
