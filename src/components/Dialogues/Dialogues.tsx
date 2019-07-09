import React, { Component } from 'react';
import { RouteComponentProps, Route, Switch } from 'react-router-dom'

import './Dialogues.scss';
import { User } from 'src/store/users/types';
import { ConnectedReduxProps } from 'src/store';


interface PropsFromState {
  loading: boolean
  data: User[]
  errors?: string
}

type AllProps = PropsFromState & RouteComponentProps<{}> & ConnectedReduxProps


class Dialogues extends Component<AllProps> {
  public render() {
      const { match } = this.props
    return (
      <div className="dialogues">
        <div className="dialogues__panel">{match.url}</div>
        <div className="dialogues__information"> </div>
        <div className="dialogues__dialogue"> </div>
     </div>
    );
  }
}


export { Dialogues };


