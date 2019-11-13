import React, { Component } from 'react';

import classnames from 'classnames';
import './Message.scss';

interface PropsFromContainer {
  text: string;
  time: number;
  avatar: string;
  isAuthor: boolean;
}

class MessageComponent extends Component<PropsFromContainer> {
  public render() {
    const { text, avatar, isAuthor, time } = this.props;
    const msgClass = classnames('message', { 'message_right': isAuthor, 'message_left': !isAuthor });
    const textClass = classnames('message__text', { 'message__text_right': isAuthor, 'message__text_left': !isAuthor });
    const dateClass = classnames('message__date', { 'message__date_right': isAuthor, 'message__date_left': !isAuthor });

    return (
      <div className={msgClass}>
        <img className='message__avatar' src={avatar}/>

        <div className='message__info'>
          <div  className={textClass}>
            {text}
          </div>

          <div className={dateClass}>
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
