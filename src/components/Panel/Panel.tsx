import React, { Component } from 'react';

import { Settings } from '@material-ui/icons';
import classnames from 'classnames';

import './Panel.scss';


interface PropsFromContainer {
  name: string;
  avatar: string;
  isChatSelected: boolean;
}

const Panel: React.SFC<PropsFromContainer> = (props: any) => {
  const panelClass = classnames('panel', { 'panel_selected': props.isChatSelected });

  return (
    <div className={panelClass}>
      <div className='panel__user'>
        <img src={props.avatar} className='panel__avatar'/>
        <span className='panel__name'> {props.name} </span>
      </div>

      <Settings className='panel__icon'/>
    </div>
  );
}


export { Panel };
