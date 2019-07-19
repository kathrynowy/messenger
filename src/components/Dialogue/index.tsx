import React, { Component } from 'react';

import './index.scss';
import { Dialogue } from 'src/store/dialogues/types';


interface PropsFromContainer {
  text: any
  avatar: string,
  count: number,
  dialogue: Dialogue,
  userId: string
}

class DialogueComponent extends Component<PropsFromContainer> {
  public render() {
    const { text, avatar, count, userId, dialogue } = this.props;
    const username = dialogue.length ? userId === (dialogue.Between as any).To ? (dialogue.Between as any).From : (dialogue.Between as any).Between.To : ' No name';
    return (
      <div className="dialogue">
        <img className="dialogue__avatar" src={avatar}/>

        <div className="dialogue__msg-info">
          <div className="dialogue__name">{username}</div>
          <div className="dialogue__text">{text}</div>
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
