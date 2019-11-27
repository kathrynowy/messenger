import React from 'react';

import classnames from 'classnames';
import { Chat } from '../../../store/chats/types';

import './ChatListItem.scss';


interface PropsFromContainer {
  text: string;
  avatar: string;
  count: number;
  chat: Chat;
  time: string;
  userId: string;
  isSelected: boolean;
  onSelectChat(chatId: string): void;
}

const ChatListItem: React.SFC<PropsFromContainer> = (props: any) => {
  const { text, time, avatar, count, userId, chat, isSelected, onSelectChat } = props;
  const to = chat.participants.to;
  const from = chat.participants.from;
  const username = userId === to._id ? from.username : to.username;
  const chatClass = classnames('chat', { 'chat_selected': isSelected });
  const chatCountClass = classnames('chat__count', { 'chat__count_selected': isSelected });

  return (
    <div className={chatClass} onClick={onSelectChat.bind(this, chat._id)}>
      <img className='chat__avatar' src={avatar}/>

      <div className='chat__msg-info'>
        <div className='chat__name'>{username}</div>
        <div className='chat__text'>{text}</div>
      </div>

      <div className='chat__info'>
        <div className='chat__date'>
        {
          new Date(+time).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        }
        </div>
        <div className={chatCountClass}>{count}</div>
      </div>
   </div>
  );
};


export { ChatListItem };
