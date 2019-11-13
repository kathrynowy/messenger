import React, { Component } from 'react';

import { Settings } from '@material-ui/icons';
import classnames from 'classnames';

import './Panel.scss';


interface PropsFromContainer {
  name: string;
  avatar: string;
  isChatSelected: boolean;
}

class Panel extends Component<PropsFromContainer> {
  public render() {
    const { name, avatar, isChatSelected } = this.props;
    const panelClass = classnames('panel', { 'panel_selected': isChatSelected });

    return (
      <div className={panelClass}>
          <div className='panel__user'>
            <img
              src={avatar}
              className='panel__avatar'
            />
            <span className='panel__name'> {name} </span>
          </div>

          <Settings className='panel__icon'/>
        </div>
    );
  }
}

export { Panel };
