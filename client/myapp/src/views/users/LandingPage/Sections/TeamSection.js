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
import team2 from "./../../../../assets/img/faces/christian.jpg";
import team3 from "./../../../../assets/img/faces/kendall.jpg";

import codeforces from "./../../../../assets/img/icons/codeforces.jpg";




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
                                    You can write here details about one of your team members. You
                                    can give more details about what they do. Feel free to add
                                    some <a href="#pablo">links</a> for people to be able to
                                    follow them outside the site.
                                </p>
                            </CardBody>
                            <CardFooter className={classes.justifyCenter}>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                    href="https://www.creative-tim.com/?ref=mkr-footer"
                                >
                                    <img src={codeforces} alt="..." className={imageClasses} />
                                </Button>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                >
                                    <img src={codeforces} alt="..." className={imageClasses} />
                                </Button>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                >
                                    <img src={codeforces} alt="..." className={imageClasses} />
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
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
                                    You can write here details about one of your team members. You
                                    can give more details about what they do. Feel free to add
                                    some <a href="#pablo">links</a> for people to be able to
                                    follow them outside the site.
                                </p>
                            </CardBody>
                            <CardFooter className={classes.justifyCenter}>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                    href="https://www.creative-tim.com/?ref=mkr-footer"
                                >
                                    <img src={codeforces} alt="..." className={imageClasses} />
                                </Button>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                >
                                    <img src={codeforces} alt="..." className={imageClasses} />
                                </Button>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                >
                                    <img src={codeforces} alt="..." className={imageClasses} />
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
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
                                    You can write here details about one of your team members. You
                                    can give more details about what they do. Feel free to add
                                    some <a href="#pablo">links</a> for people to be able to
                                    follow them outside the site.
                                </p>
                            </CardBody>
                            <CardFooter className={classes.justifyCenter}>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                    href="https://www.creative-tim.com/?ref=mkr-footer"
                                >
                                    <img src={codeforces} alt="..." className={imageClasses} />
                                </Button>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                >
                                    <img src={codeforces} alt="..." className={imageClasses} />
                                </Button>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                >
                                    <img src={codeforces} alt="..." className={imageClasses} />
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
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
                                    You can write here details about one of your team members. You
                                    can give more details about what they do. Feel free to add
                                    some <a href="#pablo">links</a> for people to be able to
                                    follow them outside the site.
                                </p>
                            </CardBody>
                            <CardFooter className={classes.justifyCenter}>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                    href="https://www.creative-tim.com/?ref=mkr-footer"
                                >
                                    <img src={codeforces} alt="..." className={imageClasses} />
                                </Button>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                >
                                    <img src={codeforces} alt="..." className={imageClasses} />
                                </Button>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                >
                                    <img src={codeforces} alt="..." className={imageClasses} />
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
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
                                    You can write here details about one of your team members. You
                                    can give more details about what they do. Feel free to add
                                    some <a href="#pablo">links</a> for people to be able to
                                    follow them outside the site.
                                </p>
                            </CardBody>
                            <CardFooter className={classes.justifyCenter}>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                    href="https://www.creative-tim.com/?ref=mkr-footer"
                                >
                                    <img src={codeforces} alt="..." className={imageClasses} />
                                </Button>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                >
                                    <img src={codeforces} alt="..." className={imageClasses} />
                                </Button>
                                <Button
                                    justIcon
                                    color="transparent"
                                    className={classes.margin5}
                                >
                                    <img src={codeforces} alt="..." className={imageClasses} />
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
}
