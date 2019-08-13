import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { Search, SendOutlined, SentimentSatisfiedAltOutlined, Settings } from '@material-ui/icons';
import { sendUserId } from '../../socket';
import { ApplicationState, ConnectedReduxProps } from '../../store';
import { fetchDialogues } from '../../store/dialogues/actions';
import { DialoguesState } from '../../store/dialogues/types';
import { fetchMessages, sendMessage } from '../../store/messages/actions';
import { MessagesState } from '../../store/messages/types';
import {fetchRequest} from '../../store/users/actions';
import { User } from '../../store/users/types';
import { DialogueComponent } from '../Dialogue';
import { Message } from '../Message';
import './index.scss';

const styles = (theme: any) => ({
  icon: {
    color: '#a1b1cc',
    margin: '8px 0',
    padding: '5px 10px',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'static',
    width: 220,
    zIndex: 0,
    [theme.breakpoints.between('xs', 'sm')]: {
      width: 300,
    },
    [theme.breakpoints.up('sm')]: {
      width: 200,
    },
    [theme.breakpoints.up('md')]: {
      width: 220,
    },
  },
});

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
  selected: string;
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
      selected: '',
      userId: localStorage.getItem('userId'),
    };

  public messagesEnd: any;

  public componentDidMount() {
    this.props.fetchDialogues({ userId: this.state.userId });
    sendUserId(this.state.userId);
    this.props.fetchRequest();
    this.state.selected ? this.props.fetchMessages({ DialogueId: this.state.selected }) : null;
    this.scrollToBottom();
  }

  public componentDidUpdate() {
    this.scrollToBottom();
  }

  public onSelectDialogue = (dialogueId: string) => {
    this.setState({
      selected: dialogueId,
    });

    this.props.fetchMessages({ DialogueId: dialogueId });
  }

  public onTypeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      message: event.target.value,
    });
  }

  public sendMessage = () => {
    const currentDialogue = this.props.dialogues.data.find((dialogue) => dialogue._id === this.state.selected);
    const to = (currentDialogue.Between as any).To;
    const from = (currentDialogue.Between as any).From;

    const toUser = this.state.userId === to._id ? from._id : to._id;

    this.props.sendMessage({
      dialogueId: this.state.selected,
      text: this.state.message,
      toUserId: toUser,
      userId: this.state.userId,
    });

    this.setState({
      message: '',
    });
  }

  public scrollToBottom = () => {
    if (this.state.selected) {
      const scrollHeight = this.messagesEnd.scrollHeight;
      const height = this.messagesEnd.clientHeight;
      const maxScrollTop = scrollHeight - height;
      this.messagesEnd.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }

  public render() {
    const { dialogues, classes, messages } = this.props;

    return (
      <div className='dialogues'>
        <div className='dialogues__panel panel'>
          <div className='panel__user user'>
            <img
              src='https://i.pinimg.com/236x/47/69/f5/4769f534b5cba3b18ba6ab2929802448--t-girls-make-up.jpg'
              className='user__avatar'
            />
            <span className='user__name'>Alexa</span>
          </div>

          <Settings className='panel__icon'/>
        </div>

        <div className='dialogues__information'>
          <div className='dialogues__search search'>
            <Search className={classes.icon}/>
            <input type='text' className='search__input' placeholder='Search in your inbox...'/>
          </div>

          <div className='dialogues__container'>
            {
              dialogues.data.map((dialogue) =>
                <DialogueComponent
                  key={dialogue.DialogueId}
                  userId={this.state.userId ? this.state.userId : null}
                  text='gfhgfhfghfg'
                  dialogue={dialogue}
                  isSelected={this.state.selected === dialogue._id}
                  count={6}
                  avatar='https://i.pinimg.com/236x/47/69/f5/4769f534b5cba3b18ba6ab2929802448--t-girls-make-up.jpg'
                  onSelect={this.onSelectDialogue}
                />,
              )
            }
          </div>
        </div>

        <div className='dialogues__dialogue-container'>
          {
            this.state.selected && (
              <div className='dialogues__dialogue'>

                <div className='dialogues__messages' ref={(div) => this.messagesEnd = div}>
                  {
                    messages.data.map((message) =>
                      <Message
                        key={message._id}
                        isAuthor={this.state.userId === message.User}
                        text={message.Text}
                        time={message.Time}
                        avatar={'https://data.whicdn.com/images/169748367/large.jpg'}
                      />,
                    )
                  }
                </div>

                <div className='dialogues__message-input message-input'>
                  <SentimentSatisfiedAltOutlined className='message-input__icon'/>
                  <input
                    type='text'
                    placeholder='Type a message...'
                    className='message-input__input'
                    onChange={this.onTypeMessage}
                    value={this.state.message}
                  />
                  <SendOutlined className='message-input__icon' onClick={this.sendMessage}/>
                </div>
              </div>
            )
          }
          {
            !this.state.selected && (
              <div className='dialogues_choose-dialogue'>
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

export const Dialogues = withStyles(styles as any)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(DialoguesComponent));
