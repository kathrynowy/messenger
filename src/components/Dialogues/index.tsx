import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'

import { User } from 'src/store/users/types';
import { Dialogue, DialoguesState } from 'src/store/dialogues/types';
import { ApplicationState, ConnectedReduxProps } from 'src/store';
import {fetchRequest} from '../../store/users/actions'
import { fetchDialogues } from '../../store/dialogues/actions';
import Search from '@material-ui/icons/Search';
import Send from '@material-ui/icons/SendOutlined';
import Settings from '@material-ui/icons/Settings';
import Sentiment from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import { withStyles } from '@material-ui/core/styles';
import './index.scss';

import { DialogueComponent } from '../Dialogue';

const styles = theme => ({
  root: {
    width: 220,
    backgroundColor: theme.palette.background.paper,
    zIndex: 0,
    position: 'static',
    [theme.breakpoints.between('xs', 'sm')]: {
      width: 300
    },
    [theme.breakpoints.up('sm')]: {
      width: 200,
    },
    [theme.breakpoints.up('md')]: {
      width: 220,
    },
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  icon: {
    color: '#a1b1cc',
    padding: '5px 10px',
    margin: '8px 0'
  }
});
interface PropsFromState {
  loading: boolean
  users: User[]
  dialogues: DialoguesState
  errors?: string
  classes: any
}

interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
  fetchDialogues: typeof fetchDialogues
}

type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps<{}> & ConnectedReduxProps



class DialoguesComponent extends Component<AllProps> {
  public componentDidMount() {
    const userId = localStorage.getItem('userId');
    this.props.fetchDialogues({userId});
    this.props.fetchRequest();
  }

  public componentWillReceiveProps(props: any) {
    console.log(props);
  }

  public render() {
    const { dialogues, classes } = this.props;
    const userId = localStorage.getItem('userId');
    return (
      <div className="dialogues">
        <div className="dialogues__panel panel">
          <div className="panel__user user">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvizXbhciL4R_fzPpRmD3pwti_qIBTQG7icTvosm4ohPqM9HEK" className="user__avatar"/>
            <span className="user__name">Alexa v</span>
          </div>

          <Settings className="panel__icon"/>
        </div>

        <div className="dialogues__information">
          <div className="dialogues__search search">
            <Search className={classes.icon}/>
            <input type="text" className="search__input" placeholder="Search in your inbox..."/>
          </div>

          <div className="dialogues__container">
            {
              dialogues.data.map(dialogue =>
                <DialogueComponent 
                  key={dialogue.DialogueId}
                  userId={userId ? userId : '65'}
                  text="gfhgfhfghfg"
                  dialogue={dialogue}
                  count={6}
                  avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvizXbhciL4R_fzPpRmD3pwti_qIBTQG7icTvosm4ohPqM9HEK"
                />
              )
            }
          </div>
        </div>

        <div className="dialogues__dialogue">
          <div className="dialogues__messages">
           {/*  <Message isAuthor={true} text='Hi there!' date={1}  avatar={data.length ? data[0].avatar : ''} /> 
            <Message isAuthor={false} text='Hey' date={1}  avatar={data.length ? data[0].avatar : ''} /> 
            <Message isAuthor={true} text='gfhgfhgfhfghretertdfgddgffgdgfgfdgdfgdfgdfgdgfertertertertertertfgdfgdgdfghfghfgh' date={1}  avatar={data.length ? data[0].avatar : ''} /> 
            <Message isAuthor={false} text='How are you doing?' date={1}  avatar={data.length ? data[0].avatar : ''} /> 
            <Message isAuthor={true} text='Great, thx. What about u?' date={1}  avatar={data.length ? data[0].avatar : ''} /> 
            <Message isAuthor={true} text="I'm fine" date={1}  avatar={data.length ? data[0].avatar : ''} /> 
            <Message isAuthor={false} text='How are you doing?' date={1}  avatar={data.length ? data[0].avatar : ''} /> 
            <Message isAuthor={true} text='Great, thx. What about u?' date={1}  avatar={data.length ? data[0].avatar : ''} /> 
            <Message isAuthor={true} text="I'm fine" date={1}  avatar={data.length ? data[0].avatar : ''} />  */}
          </div>

          <div className="dialogues__message-input message-input">
            <Sentiment className="message-input__icon"/>
            <input type="text" placeholder="Type a message..." className="message-input__input"/>
            <Send className="message-input__icon"/>
          </div>
        </div>
     </div>
    );
  }
}

const mapStateToProps = ({ users, dialogues }: ApplicationState) => ({
  loading: users.loading,
  errors: users.errors,
  users: users.data,
  dialogues: dialogues
})

const mapDispatchToProps = {
  fetchRequest,
  fetchDialogues
}


export const Dialogues = withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(DialoguesComponent)); 
