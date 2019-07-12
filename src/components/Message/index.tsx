import React, { Component } from 'react';

import './index.scss';


interface PropsFromContainer {
  text: string
  date: number,
  avatar: string,
  isAuthor: boolean
}

class Message extends Component<PropsFromContainer> {
  public render() {
    const { text, avatar, isAuthor } = this.props;

    return (
      <div className={`message ${isAuthor ? 'message_right' : 'message_left'}`}>
        <img className="message__avatar" src={avatar}/>

        <div className="message__info">
          <div  className={`message__text ${isAuthor ? 'message__text_right' : 'message__text_left'}`}>
            {text}
          </div>

          <div className={`message__date ${isAuthor ? 'message__date_right' : 'message__date_left'}`}>09:15 AM</div>
        </div>
     </div>
    );
  }
}


export {Message};
