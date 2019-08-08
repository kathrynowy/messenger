import React, { Component } from "react";

import { Dialogue } from "../../store/dialogues/types";
import "./index.scss";

interface PropsFromContainer {
  text: any;
  avatar: string;
  count: number;
  dialogue: Dialogue;
  userId: string;
  isSelected: boolean;
  onSelect(dialogueId): void;
}

class DialogueComponent extends Component<PropsFromContainer> {
  public render() {
    const { text, avatar, count, userId, dialogue, isSelected, onSelect } = this.props;
    const to = (dialogue.Between as any).To;
    const from = (dialogue.Between as any).From;
    const username = (userId === to._id) ? from.Username : to.Username;

    return (
      <div className={isSelected ? "dialogue dialogue_selected" : "dialogue"} onClick={() => onSelect(dialogue._id)}>
        <img className="dialogue__avatar" src={avatar}/>

        <div className="dialogue__msg-info">
          <div className="dialogue__name">{username}</div>
          <div className="dialogue__text">{isSelected ? "1" : "2"}</div>
        </div>

        <div className="dialogue__info">
          <div className="dialogue__date">12:38 AM</div>
          <div className={isSelected ? "dialogue__count dialogue__count_selected" : "dialogue__count"}>{count}</div>
        </div>
     </div>
    );
  }
}

export { DialogueComponent };
