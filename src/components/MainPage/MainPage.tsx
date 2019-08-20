import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { sendUserId } from '../../socket';
import { ApplicationState, ConnectedReduxProps } from '../../store';
import { fetchChats } from '../../store/chats/actions';
import { ChatsState } from '../../store/chats/types';
import { fetchMessages, sendMessage } from '../../store/messages/actions';
import { MessagesState } from '../../store/messages/types';
import { fetchRequest } from '../../store/users/actions';
import { User } from '../../store/users/types';
import { ChatList } from '../ChatList/ChatList';
import { ChatRoom } from '../ChatRoom/ChatRoom';
import { Panel } from '../Panel/Panel';
import './MainPage.scss';

interface PropsFromState {
  loading: boolean;
  users: User[];
  chats: ChatsState;
  errors?: string;
  classes: any;
  currentChat: number;
  messages: MessagesState;
}

interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest;
  fetchChats: typeof fetchChats;
  fetchMessages: typeof fetchMessages;
  sendMessage: typeof sendMessage;
}

interface State {
  selectedChat: string;
  message: string;
  userId: string;
}

type AllProps = State &
  PropsFromState &
  PropsFromDispatch &
  RouteComponentProps<{}> &
  ConnectedReduxProps;

class MainPageContainer extends Component<AllProps> {
    public state = {
      message: '',
      selectedChat: '',
      userId: localStorage.getItem('userId'),
    };

  public messagesEnd: any;

  public componentDidMount() {
    this.props.fetchChats({ userId: this.state.userId });
    sendUserId(this.state.userId);
    this.props.fetchRequest();
    this.state.selectedChat ? this.props.fetchMessages({ chatId: this.state.selectedChat }) : null;
  }

  public onSelectChat = (chatId: string) => {
    this.setState({
      selectedChat: chatId,
    });

    this.props.fetchMessages({ chatId });
  }

  public onTypeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      message: event.target.value,
    });
  }

  public sendMessage = () => {
    const currentChat = this.props.chats.data.find((chat) => chat._id === this.state.selectedChat);
    const to = currentChat.participants.to;
    const from = currentChat.participants.from;
    const toUser = this.state.userId === to._id ? from._id : to._id;

    this.props.sendMessage({
      chatId: this.state.selectedChat,
      text: this.state.message,
      toUserId: toUser,
      user: this.state.userId,
    });

    this.setState({
      message: '',
    });
  }

  public render() {
    const { chats, messages } = this.props;

    return (
      <div className='main-page'>
        <Panel
          name='Katya'
          avatar='https://i.pinimg.com/236x/47/69/f5/4769f534b5cba3b18ba6ab2929802448--t-girls-make-up.jpg'
        />

        <ChatList
          chats={chats.data}
          userId={this.state.userId}
          selectedChat={this.state.selectedChat}
          onSelectChat={this.onSelectChat}
        />

        <div className='main-page__chat-container'>
          {
            this.state.selectedChat && (
              <ChatRoom
                messages={messages.data}
                userId={this.state.userId}
                message={this.state.message}
                onTypeMessage={this.onTypeMessage}
                sendMessage={this.sendMessage}
                selectedChat={this.state.selectedChat}
              />
            )
          }
          {
            !this.state.selectedChat && (
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
  users: users.data,
});

const mapDispatchToProps = {
  fetchChats,
  fetchMessages,
  fetchRequest,
  sendMessage,
};

export const MainPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainPageContainer);