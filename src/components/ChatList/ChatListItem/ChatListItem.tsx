import React, { Component } from 'react';

import { Chat } from '../../../store/chats/types';
import './ChatListItem.scss';

interface PropsFromContainer {
  text: any;
  avatar: string;
  count: number;
  chat: Chat;
  userId: string;
  isSelected: boolean;
  onSelectChat(chatId: string): void;
}

class ChatListItem extends Component<PropsFromContainer> {
  public render() {
    const { text, avatar, count, userId, chat, isSelected, onSelectChat } = this.props;
    const to = chat.participants.to;
    const from = chat.participants.from;
    const username = userId === to._id ? from.username : to.username;

    return (
      <div className={isSelected ? 'chat chat_selected' : 'chat'} onClick={() => onSelectChat(chat._id)}>
        <img className='chat__avatar' src={avatar}/>

        <div className='chat__msg-info'>
          <div className='chat__name'>{username}</div>
          <div className='chat__text'>{isSelected ? '1' : '2'}</div>
        </div>

        <div className='chat__info'>
          <div className='chat__date'>12:38 AM</div>
          <div className={isSelected ? 'chat__count chat__count_selected' : 'chat__count'}>{count}</div>
        </div>
     </div>
    );
  }
}

export { ChatListItem };
