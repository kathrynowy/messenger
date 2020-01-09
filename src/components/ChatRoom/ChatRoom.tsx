import React, { useLayoutEffect } from 'react';

import { ArrowBackOutlined } from '@material-ui/icons';
import classnames from 'classnames';
import { Message } from '../../store/messages/types';
import { User } from '../../store/users/types';
import { InputPanel } from '../InputPanel/InputPanel';
import { MessageComponent } from '../Message/Message';

import './ChatRoom.scss';


interface PropsFromContainer {
  isChatSelected: boolean;
  isNewChat: boolean;
  messages: Message[];
  message: string;
  userId: string;
  selectedChat: string;
  currentInterlocutor: User;
  backToChats(): void;
  clearMessages(): void;
  onTypeMessage(event: React.ChangeEvent<HTMLInputElement>): void;
  sendMessage(): void;
}

const ChatRoom: React.SFC<PropsFromContainer> = (props: any) => {
  const {
    messages,
    userId,
    onTypeMessage,
    sendMessage,
    message,
    isChatSelected,
    backToChats,
    currentInterlocutor
  } = props;
  const roomClass = classnames('chat-room', { 'chat-room_item-selected': isChatSelected});
  let messagesEnd: {
    scrollHeight: number,
    clientHeight: number,
    scrollTop: number
  };

  useLayoutEffect(() => {
    scrollToBottom();
  });

  const scrollToBottom = () => {
    if (props.selectedChat) {
      messagesEnd.scrollTop = messagesEnd.scrollHeight - messagesEnd.clientHeight;
    }
  };

  return (
    <div className={roomClass}>
      <div className='chat-room__user-panel user-panel'>
        <ArrowBackOutlined className='user-panel__icon' onClick={backToChats}/>
        <img
          src='https://sun9-26.userapi.com/c834203/v834203843/1a2542/L5w1nUXbJko.jpg'
          className='user-panel__avatar'
        />

        <div className='user-panel__info'>
          <div className='user-panel__user-info'>
            <div className='user-panel__name'> {currentInterlocutor.username || 'ooops!'} </div>
            <div className='user-panel__status-circle'/>
          </div>
          <div className='user-panel__status-text'> last seen just now </div>
        </div>

      </div>

      <div className='chat-room__messages' ref={(div) => messagesEnd = div}>
        {
          messages.map((messageInfo: any) => (
            <MessageComponent
              key={messageInfo._id}
              isAuthor={userId === messageInfo.user}
              text={messageInfo.text}
              time={messageInfo.time}
              avatar='https://sun9-68.userapi.com/c847221/v847221916/1f1e18/xi8dvnFcFxI.jpg'
            />
          ))
        }
      </div>

      <InputPanel
        onTypeMessage={onTypeMessage}
        message={message}
        sendMessage={sendMessage}
      />
    </div>
  );
};


export { ChatRoom };
