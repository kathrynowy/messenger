import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';

import { withStyles } from '@material-ui/core/styles';
import { Lock, PermIdentity } from '@material-ui/icons';
import { signIn, signUp } from '../../store/users/actions';

import './LoginPage.scss';


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
  users: any;
  errors?: string;
  loading: boolean;
  history: any;
}

interface State {
  username: string;
  password: string;
}

interface PropsFromDispatch {
  signIn: typeof signIn;
  signUp: typeof signUp;
}

class Login extends Component<PropsFromState & State & PropsFromDispatch> {
  public state = {
    password: '',
    username: '',
  };

  private signIn = async () => {
    const data = {
      history: this.props.history,
      password: this.state.password,
      username: this.state.username,
    };

    this.props.signIn(data);
  }

  private signUp = async () => {
    const data = {
      history: this.props.history,
      password: this.state.password,
      username: this.state.username,
    };

    this.props.signUp(data);
  }

  private changeUsername = (event: any) => {
    this.setState({
      username: event.target.value
    });
  }

  private changePassword = (event: any) => {
    this.setState({
      password: event.target.value
    });
  }

  public render() {
    const { classes } = this.props;

    return (
      <div className='login'>
        <div className='login__header'>Login to your account</div>

        <div className='login__input-controller'>
          <div>
            <PermIdentity className={classes.userIcon}/>
            <input className='login__input' type='text' onChange={this.changeUsername}/>
          </div>

          <div>
            <Lock className={classes.lockIcon}/>
            <input className='login__input' type='password' onChange={this.changePassword} />
          </div>

          <div className='login__button-container'>
            <button className='login__button' onClick={this.signIn}>Sign in</button>
            <button className='login__button' onClick={this.signUp}>Sign up</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }: ApplicationState) => ({
  errors: users.errors,
  loading: users.loading,
  users: users.data,
});

const mapDispatchToProps = {
  signIn,
  signUp,
};

export const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles as any)(Login));
