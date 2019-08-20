import React, { Component } from 'react';

import { Settings } from '@material-ui/icons';
import './Panel.scss';

interface PropsFromContainer {
  name: string;
  avatar: string;
}

class Panel extends Component<PropsFromContainer> {
  public render() {
    const { name, avatar } = this.props;

    return (
      <div className='panel'>
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
