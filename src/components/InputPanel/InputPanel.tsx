import React from 'react';

import { SendOutlined, SentimentSatisfiedAltOutlined } from '@material-ui/icons';
import { phrases } from '../../config/phrases';

import './InputPanel.scss';


interface PropsFromContainer {
  message: string;
  onTypeMessage(event: React.ChangeEvent<HTMLInputElement>): void;
  sendMessage(): void;
}

const InputPanel: React.SFC<PropsFromContainer> = (props: any) => {
  const { onTypeMessage, message, sendMessage } = props;

  return (
    <div className='input-panel'>
      <SentimentSatisfiedAltOutlined className='input-panel__icon'/>
      <input
        type='text'
        placeholder={phrases.messagePlaceholder}
        className='input-panel__input'
        onChange={onTypeMessage}
        value={message}
      />
      <SendOutlined className='input-panel__icon' onClick={sendMessage}/>
    </div>
  );
};


export { InputPanel };
