import React, { Component } from 'react';

import classnames from 'classnames';
import { Message } from '../../store/messages/types';
import { InputPanel } from '../InputPanel/InputPanel';
import { MessageComponent } from '../Message/Message';
import './ChatRoom.scss';

interface PropsFromContainer {
  isChatSelected: boolean;
  messages: Message[];
  message: string;
  userId: string;
  selectedChat: string;
  backToChats(): void;
  onTypeMessage(event: React.ChangeEvent<HTMLInputElement>): void;
  sendMessage(): void;
}

class ChatRoom extends Component<PropsFromContainer> {
  public componentDidMount() {
    this.scrollToBottom();
  }

  public componentDidUpdate() {
    this.scrollToBottom();
  }

  public scrollToBottom = () => {
    if (this.props.selectedChat) {
      const scrollHeight = this.messagesEnd.scrollHeight;
      const height = this.messagesEnd.clientHeight;
      const maxScrollTop = scrollHeight - height;
      this.messagesEnd.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }

  public render() {
    const { messages, userId, onTypeMessage, sendMessage, message, isChatSelected, backToChats } = this.props;
    const roomClass = classnames('chat-room', { 'chat-room_item-selected': isChatSelected});

    return (
      <div className={roomClass}>
        <div className='chat-room__user-info' onClick={backToChats}> back to Chats </div>
        <div className='chat-room__messages' ref={(div) => this.messagesEnd = div}>
          {
            messages.map((messageInfo) =>
              <MessageComponent
                key={messageInfo._id}
                isAuthor={userId === messageInfo.user}
                text={messageInfo.text}
                time={messageInfo.time}
                avatar={'https://data.whicdn.com/images/169748367/large.jpg'}
              />,
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
}

export { ChatRoom };
