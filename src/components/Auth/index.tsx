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
      <div className='login'>
        <div className='login__header'>Login to your account</div>

        <div className='login__input-controller'>
          <div>
            <PermIdentity className={classes.userIcon}/>
            <input className='login__input'/>
          </div>

          <div>
            <Lock className={classes.lockIcon}/>
            <input className='login__input' type='password'/>
          </div>

          <button className='login__button'>Sign in</button>
        </div>
      </div>
    );
  }
}

export const LoginPage = withStyles(styles as any)(Login);
