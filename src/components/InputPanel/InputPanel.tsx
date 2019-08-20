import React, { Component } from 'react';

import { SendOutlined, SentimentSatisfiedAltOutlined } from '@material-ui/icons';
import './InputPanel.scss';

interface PropsFromContainer {
  message: string;
  onTypeMessage(event: React.ChangeEvent<HTMLInputElement>): void;
  sendMessage(): void;
}

class InputPanel extends Component<PropsFromContainer> {
  public render() {
    const { onTypeMessage, sendMessage, message } = this.props;

    return (
      <div className='input-panel'>
        <SentimentSatisfiedAltOutlined className='input-panel__icon'/>
        <input
          type='text'
          placeholder='Type a message...'
          className='input-panel__input'
          onChange={onTypeMessage}
          value={message}
        />
        <SendOutlined className='input-panel__icon' onClick={sendMessage}/>
      </div>
    );
  }
}

export { InputPanel };
