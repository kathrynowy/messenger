import React, { Component, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Search from "@material-ui/icons/Search";
import Send from "@material-ui/icons/SendOutlined";
import Sentiment from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import Settings from "@material-ui/icons/Settings";
import { sendMessageWithSocket, sendUserId } from "../../socket";
import { ApplicationState, ConnectedReduxProps } from "../../store";
import { fetchDialogues } from "../../store/dialogues/actions";
import { DialoguesState } from "../../store/dialogues/types";
import { fetchMessages, sendMessage } from "../../store/messages/actions";
import { MessagesState } from "../../store/messages/types";
import {fetchRequest} from "../../store/users/actions";
import { User } from "../../store/users/types";
import { Message } from "../Message";
import "./index.scss";

import { DialogueComponent } from "../Dialogue";

const styles = (theme: any) => ({
  root: {
    width: 220,
    backgroundColor: theme.palette.background.paper,
    zIndex: 0,
    position: "static",
    [theme.breakpoints.between("xs", "sm")]: {
      width: 300,
    },
    [theme.breakpoints.up("sm")]: {
      width: 200,
    },
    [theme.breakpoints.up("md")]: {
      width: 220,
    },
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  icon: {
    color: "#a1b1cc",
    padding: "5px 10px",
    margin: "8px 0",
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
      selected: "",
      message: "",
      userId: localStorage.getItem("userId"),
    };

  public messagesEnd;

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

  public onSelectDialogue = (dialogueId) => {
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
      userId: this.state.userId,
      toUserId: toUser,
    });

    this.setState({
      message: "",
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
      <div className="dialogues">
        <div className="dialogues__panel panel">
          <div className="panel__user user">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvizXbhciL4R_fzPpRmD3pwti_qIBTQG7icTvosm4ohPqM9HEK" className="user__avatar"/>
            <span className="user__name">Alexa v</span>
          </div>

          <Settings className="panel__icon"/>
        </div>

        <div className="dialogues__information">
          <div className="dialogues__search search">
            <Search className={classes.icon}/>
            <input type="text" className="search__input" placeholder="Search in your inbox..."/>
          </div>

          <div className="dialogues__container">
            {
              dialogues.data.map((dialogue) =>
                <DialogueComponent
                  key={dialogue.DialogueId}
                  userId={this.state.userId ? this.state.userId : null}
                  text="gfhgfhfghfg"
                  dialogue={dialogue}
                  isSelected={this.state.selected === dialogue._id ? true : false}
                  count={6}
                  avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvizXbhciL4R_fzPpRmD3pwti_qIBTQG7icTvosm4ohPqM9HEK"
                  onSelect={this.onSelectDialogue}
                />,
              )
            }
          </div>
        </div>

        <div className="dialogues__dialogue-container">
          {
            this.state.selected && (
              <div className="dialogues__dialogue">

                <div className="dialogues__messages" ref={(div) => this.messagesEnd = div}>
                  {
                    messages.data.map((message) =>
                      <Message
                        key={message._id}
                        isAuthor={this.state.userId === message.User}
                        text={message.Text}
                        time={message.Time}
                        avatar={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvizXbhciL4R_fzPpRmD3pwti_qIBTQG7icTvosm4ohPqM9HEK"}
                      />,
                    )
                  }
                </div>

                <div className="dialogues__message-input message-input">
                  <Sentiment className="message-input__icon"/>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="message-input__input"
                    onChange={this.onTypeMessage}
                    value={this.state.message}
                  />
                  <Send className="message-input__icon" onClick={this.sendMessage}/>
                </div>
              </div>
            )
          }
          {
            !this.state.selected && (
              <div className="dialogues_choose-dialogue">
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
  loading: users.loading,
  errors: users.errors,
  users: users.data,
  dialogues,
  messages,
});

const mapDispatchToProps = {
  fetchRequest,
  fetchDialogues,
  fetchMessages,
  sendMessage,
};

export const Dialogues = withStyles(styles as any)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(DialoguesComponent));
