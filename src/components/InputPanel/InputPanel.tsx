import React, { Component } from 'react';

import { SendOutlined, SentimentSatisfiedAltOutlined } from '@material-ui/icons';

import './InputPanel.scss';


interface PropsFromContainer {
  message: string;
  onTypeMessage(event: React.ChangeEvent<HTMLInputElement>): void;
  sendMessage(): void;
}

const InputPanel: React.SFC<PropsFromContainer> = (props: any) => {
  return (
    <div className='input-panel'>
      <SentimentSatisfiedAltOutlined className='input-panel__icon'/>
      <input
        type='text'
        placeholder='Type a message...'
        className='input-panel__input'
        onChange={props.onTypeMessage}
        value={props.message}
      />
      <SendOutlined className='input-panel__icon' onClick={props.sendMessage}/>
    </div>
  );
}


export { InputPanel };
