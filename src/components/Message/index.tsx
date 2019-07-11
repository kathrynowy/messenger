import React, { Component } from 'react';

import './index.scss';


interface PropsFromContainer {
  text: string
  date: number,
  avatar: string
}

class Message extends Component<PropsFromContainer> {
  public render() {
    const { text, avatar } = this.props;

    return (
      <div className="message">
        <img className="message__avatar" src={avatar}/>

        <div className="message__info">
          <div  className="message__text">
            <p className="message__textt">{text}</p>
          </div>
          <div className="message__date">09:15 AM</div>
        </div>
     </div>
    );
  }
}


export {Message};
