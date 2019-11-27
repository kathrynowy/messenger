import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import classnames from 'classnames';
import { SearchParamsEnum } from '../../enums';
import { Chat } from '../../store/chats/types';
import { User } from './../../store/users/types';
import { ChatListItem } from './ChatListItem/ChatListItem';
import { SearchItem } from './SearchItem/SearchItem';

import './ChatList.scss';
import { phrases } from 'src/config/phrases';


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

interface MyProps {
  foundUsers: any[];
  searchParameter: SearchParamsEnum;
  sortedChats: Chat[];
  users: any[];
}

interface PropsFromContainer {
  chats: Chat[];
  currentUser: any;
  isChatSelected: boolean;
  isLoading: boolean;
  selectedChat: string;
  userId: string;
  users: User[];
  addChat(userId: string): void;
  getUsers(): void;
  onSelectChat(chatId: string): void;
}

class ChatListComponent extends Component<PropsFromContainer & PropsFromState, MyProps> {
  constructor(props: any) {
    super(props);

    this.state = {
      foundUsers: [] as any,
      searchParameter: SearchParamsEnum.Messages,
      sortedChats: this.props.chats || [],
      users: [] as any
    };

    this.setSearchParameter = this.setSearchParameter.bind(this);
  }

  public componentWillReceiveProps(props: any) {
    if (props.chats) {
      this.setState({ sortedChats: props.chats });
    }

    if (props.users) {
      this.setState({ users: props.users });
    }
  }

  private getMatch = (word: string, param: string) => {
    return word.indexOf(param);
  }

  private search = async (e: any) => {
    const query = e.target.value.toLowerCase();

    if (this.state.searchParameter === SearchParamsEnum.Messages) {
      const sortedChats = this.props.chats.filter((chat: Chat) => {
          const toUser = chat.participants.to.username.toLowerCase();
          const fromUser = chat.participants.from.username.toLowerCase();

          return this.getMatch(toUser, query) >= 0 && this.getMatch(toUser, this.props.currentUser) < 0 ||
            this.getMatch(fromUser, query) >= 0 && this.getMatch(fromUser, this.props.currentUser) < 0;
        }
      );

      this.setState({ sortedChats });
    } else {
      if (!this.state.users.length) {
        this.props.getUsers();
      }

      const sortedUsers = this.state.users.filter((user: User) =>
        this.getMatch(user.username.toLowerCase(), query) >= 0
      );

      this.setState({
        foundUsers: query ? sortedUsers : []
      });
    }
  }

  private setSearchParameter = (searchParameter: number) => {
    this.setState({ searchParameter });

    if (searchParameter === SearchParamsEnum.Peoples && !this.state.users.length) {
      this.props.getUsers();
    }
  }

  public render() {
    const { chats, classes, userId, onSelectChat, selectedChat, isChatSelected, currentUser, addChat } = this.props;
    const chatClass = classnames('chats', { 'chats_item-selected': isChatSelected });
    const peopleSearchParameter = classnames(
      'chats__search-peoples',
      {'chats__search-peoples_selected': this.state.searchParameter === SearchParamsEnum.Peoples}
    );
    const messagesSearchParameter = classnames(
      'chats__search-messages',
      {'chats__search-messages_selected': this.state.searchParameter === SearchParamsEnum.Messages}
    );

    return (
      <div className={chatClass}>
        <div className='chats__search'>
          <Search className={classes.icon}/>
          <input
            type='text'
            className='chats__input'
            placeholder={phrases.searchInputPlaceholder}
            onChange={this.search}
          />
        </div>
        <div className='chats__choose-search'>
          <div
            className={peopleSearchParameter}
            onClick={this.setSearchParameter.bind(this, SearchParamsEnum.Peoples)}
          >
            peoples
          </div>
          <div
            className={messagesSearchParameter}
            onClick={this.setSearchParameter.bind(this, SearchParamsEnum.Messages)}
          >
            messages
          </div>
        </div>

        <div className='chats__container'>
          {
            this.state.searchParameter === SearchParamsEnum.Messages
              ? ( this.state.sortedChats.map((chat: Chat) => (
                    <ChatListItem
                      key={chat.chatId}
                      userId={userId || null}
                      text={chat.lastMessageText}
                      time={chat.lastMessageTime}
                      chat={chat}
                      isSelected={selectedChat === chat._id}
                      count={6}
                      avatar='https://i.pinimg.com/236x/47/69/f5/4769f534b5cba3b18ba6ab2929802448--t-girls-make-up.jpg'
                      onSelectChat={onSelectChat.bind(this, chat._id)}
                    />
                )))
              : ( this.state.foundUsers.map((user: Chat) => (
                  <SearchItem
                    username={user.username}
                    avatar='https://i.pinimg.com/236x/47/69/f5/4769f534b5cba3b18ba6ab2929802448--t-girls-make-up.jpg'
                    key={user._id}
                    userId={user._id}
                    addChat={addChat}
                  />
                )))
          }
        </div>
      </div>
    );
  }
}

export const ChatList = withStyles(styles as any)(ChatListComponent);
