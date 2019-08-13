import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Lock, PermIdentity } from '@material-ui/icons';
import './index.scss';

const styles = (theme: any) => ({
  lockIcon: {
    color: '#a1b1cc',
    left: 0,
    margin: '8px 0',
    padding: '5px 10px',
    position: 'absolute',
    top: '52px',
    width: '30px',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'static',
    width: 220,
    zIndex: 0,
    [theme.breakpoints.between('xs', 'sm')]: {
      width: 300,
    },
    [theme.breakpoints.up('sm')]: {
      width: 200,
    },
    [theme.breakpoints.up('md')]: {
      width: 220,
    },
  },
  userIcon: {
    color: '#a1b1cc',
    left: 0,
    margin: '8px 0',
    padding: '5px 10px',
    position: 'absolute',
    top: '-10px',
    width: '30px',
  },
});

interface PropsFromState {
  classes: any;
}

class Login extends Component<PropsFromState> {
  public render() {
    const { classes } = this.props;

    return (
      <div className="login-container">
        <div className="login-container__label">Login to your account</div>
        <div className="login-container__inputs inputs">
          <div className="inputs__input-container">
            <PermIdentity className={classes.userIcon}/>
            <input className="inputs__input"/>
          </div>

          <div className="login-container__input-container">
            <Lock className={classes.lockIcon}/>
            <input className="inputs__input" type="password"/>
          </div>

          <button className="login-container__sign">Sign</button>
        </div>
      </div>
    );
  }
}

export const LoginPage = withStyles(styles as any)(Login);
