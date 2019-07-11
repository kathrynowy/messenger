import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'

import { User } from 'src/store/users/types';
import { ApplicationState, ConnectedReduxProps } from 'src/store';
import {fetchRequest} from '../../store/users/actions'
/* import { Dispatch } from 'redux' */
import './index.scss';

import {Message} from '../Message';


interface PropsFromState {
  loading: boolean
  data: User[]
  errors?: string
}

interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
}

type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps<{}> & ConnectedReduxProps


class DialoguesComponent extends Component<AllProps> {
  public componentDidMount() {
    this.props.fetchRequest();
  }

  public render() {
    const { data } = this.props;

    return (
      <div className="dialogues">
        <div className="dialogues__panel"></div>
        <div className="dialogues__information">
          <Message text='Приветик' date={15616546}  avatar={data.length ? data[0].avatar : ''} /> 
          <Message text='ok' date={15616546}  avatar={data.length ? data[0].avatar : ''} /> 
          <Message text='Приветикgfhgfhgfhfghfghfghfgh' date={15616546}  avatar={data.length ? data[0].avatar : ''} /> 
          <Message text='Приветик' date={15616546}  avatar={data.length ? data[0].avatar : ''} /> 
          <Message text='Приветик' date={15616546}  avatar={data.length ? data[0].avatar : ''} /> 
          <Message text='Приветик' date={15616546}  avatar={data.length ? data[0].avatar : ''} /> 
        
        </div>
        <div className="dialogues__dialogue"> </div>
     </div>
    );
  }
}

const mapStateToProps = ({ users }: ApplicationState) => ({
  loading: users.loading,
  errors: users.errors,
  data: users.data
})

const mapDispatchToProps = {
  fetchRequest
}


export const Dialogues = connect(
  mapStateToProps,
  mapDispatchToProps
)(DialoguesComponent); 
