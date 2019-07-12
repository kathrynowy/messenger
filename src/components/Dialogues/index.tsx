import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'

import { User } from 'src/store/users/types';
import { ApplicationState, ConnectedReduxProps } from 'src/store';
import {fetchRequest} from '../../store/users/actions'
/* import { Dispatch } from 'redux' */
import './index.scss';

import { Message } from '../Message';
import { Dialogue } from '../Dialogue';


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
        <div className="dialogues__panel">
        </div>
        <div className="dialogues__information">
          <Dialogue text="gfhgfhfghfg" name="Nancy J. Martins" count={6} avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvizXbhciL4R_fzPpRmD3pwti_qIBTQG7icTvosm4ohPqM9HEK"/>
          <Dialogue text="gfhgfhfghfg" name="Nancy J. Martins" count={6} avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvizXbhciL4R_fzPpRmD3pwti_qIBTQG7icTvosm4ohPqM9HEK"/>
          <Dialogue text="gfhgfhfghfg" name="Nancy J. Martins" count={6} avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvizXbhciL4R_fzPpRmD3pwti_qIBTQG7icTvosm4ohPqM9HEK"/>
          <Dialogue text="gfhgfhfghfg" name="Nancy J. Martins" count={6} avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvizXbhciL4R_fzPpRmD3pwti_qIBTQG7icTvosm4ohPqM9HEK"/>
          <Dialogue text="gfhgfhfghfg" name="Nancy J. Martins" count={6} avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvizXbhciL4R_fzPpRmD3pwti_qIBTQG7icTvosm4ohPqM9HEK"/>
        
        </div>
        <div className="dialogues__dialogue">
        <Message isAuthor={true} text='Hi there!' date={1}  avatar={data.length ? data[0].avatar : ''} /> 
          <Message isAuthor={false} text='Hey' date={1}  avatar={data.length ? data[0].avatar : ''} /> 
          <Message isAuthor={true} text='gfhgfhgfhfghretertdfgddgffgdgfgfdgdfgdfgdfgdgfertertertertertertfgdfgdgdfghfghfgh' date={1}  avatar={data.length ? data[0].avatar : ''} /> 
          <Message isAuthor={false} text='How are you doing?' date={1}  avatar={data.length ? data[0].avatar : ''} /> 
          <Message isAuthor={true} text='Great, thx. What about u?' date={1}  avatar={data.length ? data[0].avatar : ''} /> 
          <Message isAuthor={true} text="I'm fine" date={1}  avatar={data.length ? data[0].avatar : ''} /> 
        </div>
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
