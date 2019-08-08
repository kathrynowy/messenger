import React, { Component } from "react";
import "./index.scss";

import Lock from "@material-ui/icons/Lock";
import User from "@material-ui/icons/PermIdentity";
import { withStyles } from "@material-ui/core/styles";


const styles = (theme: any) => ({
  userIcon: {
    color: "#a1b1cc",
    margin: "8px 0",
    padding: "5px 10px",
    width: '30px',
    left: 0,
    position: 'absolute',
    top: '-10px'
  },
  lockIcon: {
    color: "#a1b1cc",
    margin: "8px 0",
    padding: "5px 10px",
    width: '30px',
    left: 0,
    position: 'absolute',
    top: '52px'
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  root: {
    width: 220,
    backgroundColor: theme.palette.background.paper,
    zIndex: 0,
    position: "static",
    [theme.breakpoints.between("xs", "sm")]: {
      width: 300,
    },
    [theme.breakpoints.up("sm")]: {
      width: 200,
    },
    [theme.breakpoints.up("md")]: {
      width: 220,
    },
  }
});

interface PropsFromState {
  classes: any;
}

class Login extends Component<PropsFromState> {
  public render() {
    const { classes } = this.props;

    return (
      <div className="login-container" autoComplete="false">
        <div className="login-container__inputs inputs">
          <div classname="inputs__input-container">
            <User className={classes.userIcon}/>
            <input className="inputs__input" autoComplete="false"/>
          </div>

          <div classname="login-container__input-container">
            <Lock className={classes.lockIcon}/>
            <input className="inputs__input" type="password" autoComplete="false"/>
          </div>

          <button className="login-container__sign">Sign</button>
        </div>
      </div>
    );
  }
}

export const LoginPage = withStyles(styles)(Login);
