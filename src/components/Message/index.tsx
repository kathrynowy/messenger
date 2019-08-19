import React, { Component } from 'react';

import './index.scss';

interface PropsFromContainer {
  text: string;
  time: number;
  avatar: string;
  isAuthor: boolean;
}

class MessageComponent extends Component<PropsFromContainer> {
  public render() {
    const { text, avatar, isAuthor, time } = this.props;

    return (
      <div className={`message ${isAuthor ? 'message_right' : 'message_left'}`}>
        <img className='message__avatar' src={avatar}/>

        <div className='message__info'>
          <div  className={`message__text ${isAuthor ? 'message__text_right' : 'message__text_left'}`}>
            {text}
          </div>

          <div className={`message__date ${isAuthor ? 'message__date_right' : 'message__date_left'}`}>
          {
            new Date(time).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
          }
          </div>
        </div>
     </div>
    );
  }
}

export { MessageComponent };
