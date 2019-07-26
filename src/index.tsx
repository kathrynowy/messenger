import React from 'react';
import ReactDOM from 'react-dom';
import { createHashHistory } from 'history'

import configureStore from './configureStore';
import { App } from './App';
import './index.scss';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

const initialState = window.initialReduxState
const history = createHashHistory()

const store = configureStore(history, initialState)


ReactDOM.render(
  <App  store={store} history={history}/>, document.getElementById('root')
);
