import React from 'react';
import ReactDOM from 'react-dom';
import { createHashHistory } from 'history'

import { App } from './App';
import './index.scss';

import configureStore from './configureStore';

const initialState = window.initialReduxState
const history = createHashHistory()

const store = configureStore(history, initialState)


ReactDOM.render(
  <App  store={store} history={history}/>, document.getElementById('root')
);

