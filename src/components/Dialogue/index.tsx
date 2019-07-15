import React, { Component } from 'react';

import './index.scss';


interface PropsFromContainer {
  text: string
  avatar: string,
  name: string,
  count: number
}

class Dialogue extends Component<PropsFromContainer> {
  public render() {
    const { text, avatar, name, count } = this.props;

    return (
      <div className="dialogue">
        <img className="dialogue__avatar" src={avatar}/>

        <div className="dialogue__msg-info">
          <div className="dialogue__name">{name}</div>
          <div className="dialogue__text">{text}</div>
        </div>

        <div className="dialogue__info">
          <div className="dialogue__date">12:38 AM</div>
          <div className="dialogue__count">{count}</div>
        </div>
     </div>
    );
  }
}


export { Dialogue } 
