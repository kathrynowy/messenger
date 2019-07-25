import React, { Component } from 'react';

import './index.scss';
import { Dialogue } from 'src/store/dialogues/types';


interface PropsFromContainer {
  text: any
  avatar: string,
  count: number,
  dialogue: Dialogue,
  userId: string
  isSelected: boolean
}

class DialogueComponent extends Component<PropsFromContainer> {
  public render() {
    const { text, avatar, count, userId, dialogue, isSelected } = this.props;
    const username = userId === (dialogue.Between as any).To._id ? (dialogue.Between as any).From.Username : (dialogue.Between as any).Between.To.Username;

    return (
      <div className="dialogue">
        <img className="dialogue__avatar" src={avatar}/>

        <div className="dialogue__msg-info">
          <div className="dialogue__name">{username}</div>
          <div className="dialogue__text">{isSelected ? '1' : '2'}</div>
        </div>

        <div className="dialogue__info">
          <div className="dialogue__date">12:38 AM</div>
          <div className="dialogue__count">{count}</div>
        </div>
     </div>
    );
  }
}


export { DialogueComponent } 
