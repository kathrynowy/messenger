import React, { Component } from 'react';

import { Add } from '@material-ui/icons';

import './SearchItem.scss';


interface PropsFromContainer {
  username: string;
  avatar: string;
  userId: string;
  addChat(userId: string): void;
}

class SearchItem extends Component<PropsFromContainer> {
  public render() {
    const { username, avatar, addChat, userId } = this.props;

    return (
      <div className='user'>
        <img className='user__avatar' src={avatar}/>
        <div className='user__name'>{username}</div>
        <div className='user__add-button'>
          <Add className='user__icon'/>
          <p className='user__add-note' onClick={() => addChat(userId)}> start messaging </p>
        </div>
     </div>
    );
  }
}

export { SearchItem };
