import React, { Component } from 'react';

import { Message } from '../../store/messages/types';
import { InputPanel } from '../InputPanel/InputPanel';
import { MessageComponent } from '../Message';
import './Chat.scss';

interface PropsFromContainer {
  messages: Message[];
  message: string;
  userId: string;
  selectedDialogue: string;
  onTypeMessage(event: React.ChangeEvent<HTMLInputElement>): void;
  sendMessage(): void;
}

class Chat extends Component<PropsFromContainer> {
  public componentDidMount() {
    this.scrollToBottom();
  }

  public componentDidUpdate() {
    this.scrollToBottom();
  }

  public scrollToBottom = () => {
    if (this.props.selectedDialogue) {
      const scrollHeight = this.messagesEnd.scrollHeight;
      const height = this.messagesEnd.clientHeight;
      const maxScrollTop = scrollHeight - height;
      this.messagesEnd.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }

  public render() {
    const { messages, userId, onTypeMessage, sendMessage, message } = this.props;

    return (
      <div className='chat'>
        <div className='chat__messages' ref={(div) => this.messagesEnd = div}>
          {
            messages.map((messageInfo) =>
              <MessageComponent
                key={messageInfo._id}
                isAuthor={userId === messageInfo.User}
                text={messageInfo.Text}
                time={messageInfo.Time}
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

export { Chat };
