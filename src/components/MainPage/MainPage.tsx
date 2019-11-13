import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import classnames from 'classnames';
import { sendUserId } from '../../socket';
import { ApplicationState, ConnectedReduxProps } from '../../store';
import { addChat, fetchChats } from '../../store/chats/actions';
import { ChatsState } from '../../store/chats/types';
import { fetchMessages, sendMessage } from '../../store/messages/actions';
import { MessagesState } from '../../store/messages/types';
import { getUsers } from '../../store/users/actions';
import { UsersState } from '../../store/users/types';
import { ChatList } from '../ChatList/ChatList';
import { ChatRoom } from '../ChatRoom/ChatRoom';
import { Panel } from '../Panel/Panel';
import { Chat } from './../../store/chats/types';

import './MainPage.scss';


interface PropsFromState {
  loading: boolean;
  users: UsersState;
  chats: ChatsState;
  errors?: string;
  classes: any;
  currentChat: number;
  messages: MessagesState;
}

interface PropsFromDispatch {
  addChat: typeof addChat;
  fetchChats: typeof fetchChats;
  fetchMessages: typeof fetchMessages;
  sendMessage: typeof sendMessage;
  getUsers: typeof getUsers;
}

interface State {
  selectedChat: string;
  message: string;
  userId: string;
  isChatSelected: boolean;
  currentUser: any;
}

type AllProps = State &
  PropsFromState &
  PropsFromDispatch &
  RouteComponentProps<{}> &
  ConnectedReduxProps;

class MainPageContainer extends Component<AllProps> {
  public state = {
    isChatSelected: false,
    isNewChat: false,
    message: '',
    newUserId: '',
    selectedChat: '',
    userId: localStorage.getItem('userId')
  };

  public messagesEnd: any;

  public componentDidMount() {
    this.props.fetchChats({ userId: this.state.userId });
    sendUserId(this.state.userId);

    if (this.state.selectedChat) {
      this.props.fetchMessages({ chatId: this.state.selectedChat });
    }
  }

  public componentWillReceiveProps(nextProps: any) {
    if (nextProps.messages.data && nextProps.messages.data.length && !this.state.selectedChat) {
      this.setState({
        isNewChat: false,
        selectedChat: nextProps.messages.data[0].chat
      });
    }
  }

  public onSelectChat = (chatId: string) => {
    if (this.state.selectedChat === chatId) {
      return;
    }

    this.props.fetchMessages({ chatId });

    this.setState({
      isChatSelected: true,
      selectedChat: chatId
    });
  }

  public onTypeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      message: event.target.value,
    });
  }

  public sendMessage = async () => {
    let toUserId;

    if (this.state.isNewChat) {
      toUserId = this.state.newUserId;
    } else {
      const currentChat = this.props.chats.data.find((chat: Chat) => chat._id === this.state.selectedChat);
      const to = currentChat.participants.to;
      const from = currentChat.participants.from;
      toUserId = this.state.userId === to._id ? from._id : to._id;
    }

    this.props.sendMessage({
      chatId: this.state.selectedChat,
      isNewChat: this.state.isNewChat,
      text: this.state.message,
      toUserId,
      user: this.state.userId,
    });

    this.setState({ message: '' });
  }

  public backToChats = () => {
    this.setState({
      isChatSelected: false,
      isNewChat: false,
      message: '',
      selectedChat: ''
    });
  }

  public addChat = (userId: string) => {
    this.setState({
      isChatSelected: true,
      isNewChat: true,
      newUserId: userId,
      selectedChat: ''
    });
  }

  public render() {
    const { chats, messages, users } = this.props;
    const roomClass = classnames(
      'main-page__chat-container',
      { 'main-page__chat-container_selected': this.state.isChatSelected }
    );

    return (
      <div className='main-page'>
        <Panel
          name='Katya'
          avatar='https://i.pinimg.com/236x/47/69/f5/4769f534b5cba3b18ba6ab2929802448--t-girls-make-up.jpg'
          isChatSelected={this.state.isChatSelected}
        />

        <ChatList
          chats={chats.data}
          userId={this.state.userId}
          selectedChat={this.state.selectedChat}
          onSelectChat={this.onSelectChat}
          isChatSelected={this.state.isChatSelected}
          currentUser={users.currentUser}
          getUsers={this.props.getUsers}
          users={this.props.users.data}
          isLoading={this.props.users.loading}
          addChat={this.addChat}
        />

        <div className={roomClass}>
          {
            (this.state.selectedChat || this.state.isNewChat) && (
              <ChatRoom
                backToChats={this.backToChats}
                messages={!this.state.selectedChat && this.state.isNewChat ? [] : messages.data}
                userId={this.state.userId}
                message={this.state.message}
                onTypeMessage={this.onTypeMessage}
                sendMessage={this.sendMessage}
                selectedChat={this.state.selectedChat}
                isChatSelected={this.state.isChatSelected}
                isNewChat={this.state.isNewChat}
              />
            )
          }
          {
            !this.state.selectedChat && !this.state.isNewChat && (
              <div className='main-page__choose-chat'>
                Please select a chat to start messaging
              </div>
            )
          }
        </div>
     </div>
    );
  }
}

const mapStateToProps = ({ users, chats, messages }: ApplicationState) => ({
  chats,
  errors: users.errors,
  loading: users.loading,
  messages,
  users,
});

const mapDispatchToProps = {
  addChat,
  fetchChats,
  fetchMessages,
  getUsers,
  sendMessage
};


export const MainPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPageContainer);
