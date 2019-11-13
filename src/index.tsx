import { createHashHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import { App } from './App';
import { baseUrl } from './config';
import configureStore from './configureStore';
import './index.scss';
import { configureSocket } from './socket';


axios.defaults.baseURL = baseUrl;

const initialState = window.initialReduxState;
const history = createHashHistory();
const store = configureStore(history, initialState);
export const socket = configureSocket(store);

ReactDOM.render(
  <App store={store} history={history}/>,
  document.getElementById('root')
);
