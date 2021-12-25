/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { useHistory } from 'react-router-dom';



// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "./../../assets/jss/material-kit-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  let history = useHistory();
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            {/* <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.creative-tim.com/?ref=mkr-footer"
                className={classes.block}
                target="_blank"
              >
                Creative Tim
              </a>
            </ListItem> */}
            <ListItem className={classes.inlineBlock}>
              <a
                
                onClick={() => {
                  history.push("/aboutUs");
                }
                }
                className={classes.block}
                target="_blank"
              >
                About us
              </a>
            </ListItem>
            {/* <ListItem className={classes.inlineBlock}>
              <a
                href="http://blog.creative-tim.com/?ref=mkr-footer"
                className={classes.block}
                target="_blank"
              >
                Blog
              </a>
            </ListItem> */}
            {/* <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.creative-tim.com/license?ref=mkr-footer"
                className={classes.block}
                target="_blank"
              >
                Licenses
              </a>
            </ListItem> */}
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} , made 
          {/* with{" "}
          <Favorite className={classes.icon} />  */}
          by{" "}
          <Tooltip title="Aya, Basant, Iman, Khadija, Michael">
          <a
            // href="https://www.creative-tim.com?ref=mkr-footer"
            className={aClasses}
            target="_blank"
          >
            overReact team
          </a>
          </Tooltip>
          {" "}
          for better flying.
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
