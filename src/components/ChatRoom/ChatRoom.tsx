import React, { Component } from 'react';

import { Message } from '../../store/messages/types';
import { InputPanel } from '../InputPanel/InputPanel';
import { MessageComponent } from '../Message';
import './ChatRoom.scss';

interface PropsFromContainer {
  messages: Message[];
  message: string;
  userId: string;
  selectedChat: string;
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
    const { messages, userId, onTypeMessage, sendMessage, message } = this.props;

    return (
      <div className='chat-room'>
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
