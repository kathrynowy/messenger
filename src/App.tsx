import React, { Component, Fragment } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Store } from 'redux'
import { History } from 'history'
import { ApplicationState } from './store'
import { Dialogues } from './components/Dialogues/Dialogues';
import './App.scss';

interface MainProps {
  store: Store<ApplicationState>
  history: History
}


const App: React.FC<MainProps> = ({ store, history }) =>  {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="app-container">
          <Switch>
            <Route exact path="/" component={Dialogues} />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  );
}


export { App };
