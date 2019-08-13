import { createHashHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';

import openSocket from 'socket.io-client';
import { App } from './App';
import configureStore from './configureStore';
import './index.scss';
import { configureSocket } from './socket';

const initialState = window.initialReduxState;
const history = createHashHistory();

const store = configureStore(history, initialState);
export const socket = configureSocket(store);

ReactDOM.render(
  <App  store={store} history={history}/>, document.getElementById('root'),
);
