import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { sendUserId } from '../../socket';
import { ApplicationState, ConnectedReduxProps } from '../../store';
import { fetchDialogues } from '../../store/dialogues/actions';
import { DialoguesState } from '../../store/dialogues/types';
import { fetchMessages, sendMessage } from '../../store/messages/actions';
import { MessagesState } from '../../store/messages/types';
import { fetchRequest } from '../../store/users/actions';
import { User } from '../../store/users/types';
import { Chat } from '../Chat/Chat';
import { ChatsInfo } from '../ChatsInfo/ChatsInfo';
import { Panel } from '../Panel/Panel';
import './index.scss';

interface PropsFromState {
  loading: boolean;
  users: User[];
  dialogues: DialoguesState;
  errors?: string;
  classes: any;
  currentDialogue: number;
  messages: MessagesState;
}

interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest;
  fetchDialogues: typeof fetchDialogues;
  fetchMessages: typeof fetchMessages;
  sendMessage: typeof sendMessage;
}

interface State {
  selectedDialogue: string;
  message: string;
  userId: string;
}

type AllProps = State &
  PropsFromState &
  PropsFromDispatch &
  RouteComponentProps<{}> &
  ConnectedReduxProps;

class DialoguesComponent extends Component<AllProps> {
    public state = {
      message: '',
      selectedDialogue: '',
      userId: localStorage.getItem('userId'),
    };

  public messagesEnd: any;

  public componentDidMount() {
    this.props.fetchDialogues({ userId: this.state.userId });
    sendUserId(this.state.userId);
    this.props.fetchRequest();
    this.state.selectedDialogue ? this.props.fetchMessages({ DialogueId: this.state.selectedDialogue }) : null;
  }

  public onSelectDialogue = (dialogueId: string) => {
    this.setState({
      selectedDialogue: dialogueId,
    });

    this.props.fetchMessages({ DialogueId: dialogueId });
  }

  public onTypeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      message: event.target.value,
    });
  }

  public sendMessage = () => {
    const currentDialogue = this.props.dialogues.data.find((dialogue) => dialogue._id === this.state.selectedDialogue);
    const to = (currentDialogue.Between as any).To;
    const from = (currentDialogue.Between as any).From;

    const toUser = this.state.userId === to._id ? from._id : to._id;

    this.props.sendMessage({
      dialogueId: this.state.selectedDialogue,
      text: this.state.message,
      toUserId: toUser,
      userId: this.state.userId,
    });

    this.setState({
      message: '',
    });
  }

  public render() {
    const { dialogues, messages } = this.props;

    return (
      <div className='dialogues'>
        <Panel
          name='Katya'
          avatar='https://i.pinimg.com/236x/47/69/f5/4769f534b5cba3b18ba6ab2929802448--t-girls-make-up.jpg'
        />

        <ChatsInfo
          dialogues={dialogues.data}
          userId={this.state.userId}
          selectedDialogue={this.state.selectedDialogue}
          onSelectDialogue={this.onSelectDialogue}
        />

        <div className='dialogues__dialogue-container'>
          {
            this.state.selectedDialogue && (
              <Chat
                messages={messages.data}
                userId={this.state.userId}
                message={this.state.message}
                onTypeMessage={this.onTypeMessage}
                sendMessage={this.sendMessage}
                selectedDialogue={this.state.selectedDialogue}
              />
            )
          }
          {
            !this.state.selectedDialogue && (
              <div className='dialogues__choose-dialogue'>
                Please select a chat to start messaging
              </div>
            )
          }
        </div>
     </div>
    );
  }
}

const mapStateToProps = ({ users, dialogues, messages }: ApplicationState) => ({
  dialogues,
  errors: users.errors,
  loading: users.loading,
  messages,
  users: users.data,
});

const mapDispatchToProps = {
  fetchDialogues,
  fetchMessages,
  fetchRequest,
  sendMessage,
};

export const Dialogues = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DialoguesComponent);
