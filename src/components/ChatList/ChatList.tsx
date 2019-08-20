import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import { Chat } from '../../store/chats/types';
import { ChatListItem } from './ChatListItem/ChatListItem';
import './ChatList.scss';

const styles = () => ({
  icon: {
    color: '#a1b1cc',
    margin: '8px 0',
    padding: '5px 10px',
  },
});

interface PropsFromState {
  classes: any;
}

interface PropsFromContainer {
  chats: Chat[];
  userId: string;
  selectedChat: string;
  onSelectChat(chatId: string): void;
}

class ChatListComponent extends Component<PropsFromContainer & PropsFromState> {
  public render() {
    const { chats, classes, userId, onSelectChat, selectedChat } = this.props;

    return (
      <div className='chats'>
        <div className='chats__search'>
          <Search className={classes.icon}/>
          <input type='text' className='chats__input' placeholder='Search in your inbox...'/>
        </div>

        <div className='chats__container'>
          {
            chats.map((chat) =>
              <ChatListItem
                key={chat.chatId}
                userId={userId ? userId : null}
                text={chat.lastMessageText}
                time={chat.lastMessageTime}
                chat={chat}
                isSelected={selectedChat === chat._id}
                count={6}
                avatar='https://i.pinimg.com/236x/47/69/f5/4769f534b5cba3b18ba6ab2929802448--t-girls-make-up.jpg'
                onSelectChat={onSelectChat}
              />,
            )
          }
        </div>
      </div>
    );
  }
}

export const ChatList = withStyles(styles as any)(ChatListComponent);
