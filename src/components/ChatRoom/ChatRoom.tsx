import React, { useEffect, useLayoutEffect } from 'react';

import classnames from 'classnames';
import { Message } from '../../store/messages/types';
import { InputPanel } from '../InputPanel/InputPanel';
import { MessageComponent } from '../Message/Message';
import { ArrowBackOutlined } from '@material-ui/icons';

import './ChatRoom.scss';


interface PropsFromContainer {
  isChatSelected: boolean;
  isNewChat: boolean;
  messages: Message[];
  message: string;
  userId: string;
  selectedChat: string;
  backToChats(): void;
  clearMessages(): void;
  onTypeMessage(event: React.ChangeEvent<HTMLInputElement>): void;
  sendMessage(): void;
}

const ChatRoom: React.SFC<PropsFromContainer> = (props: any) => {
  const { messages, userId, onTypeMessage, sendMessage, message, isChatSelected, backToChats, clearMessages } = props;
  const roomClass = classnames('chat-room', { 'chat-room_item-selected': isChatSelected});
  let messagesEnd: {
    scrollHeight: number,
    clientHeight: number,
    scrollTop: number
  };

  useLayoutEffect(() => {
    scrollToBottom();
  });

  let scrollToBottom = () => {
    if (props.selectedChat) {
      messagesEnd.scrollTop = messagesEnd.scrollHeight - messagesEnd.clientHeight;
    }
  }

  return (
    <div className={roomClass}>
      <div className='chat-room__user-panel user-panel'>
        <ArrowBackOutlined className='user-panel__icon' onClick={backToChats}/>
        <img src='https://data.whicdn.com/images/169748367/large.jpg' className='user-panel__avatar'/>

        <div className='user-panel__info'>
          <div className='user-panel__user-info'>
            <div className='user-panel__name'> Katya </div>
            <div className='user-panel__status-circle'></div>
          </div>
          <div className='user-panel__status-text'> last seen just now </div>
        </div>

      </div>

      <div className='chat-room__messages' ref={(div) => messagesEnd = div}>
        {
          messages.map((messageInfo) =>
            <MessageComponent
              key={messageInfo._id}
              isAuthor={userId === messageInfo.user}
              text={messageInfo.text}
              time={messageInfo.time}
              avatar={'https://data.whicdn.com/images/169748367/large.jpg'}
            />
          )
        }
      </div>

      <InputPanel
        onTypeMessage={onTypeMessage}
        message={message}
        sendMessage={sendMessage}
      />
    </div>
  );
}


export { ChatRoom };
