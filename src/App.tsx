import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Store } from 'redux';

import { History } from 'history';
import { LoginPage } from './components/LoginPage/LoginPage';
import { MainPage } from './components/MainPage/MainPage';
import { ApplicationState } from './store';

import './App.scss';


interface MainProps {
  store: Store<ApplicationState>;
  history: History;
}

const App: React.FC<MainProps> = ({ store, history }) =>  {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className='app-container'>
          <Switch>
            <Redirect exact from='/' to='login' />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/main' component={MainPage} />
            <Route component={() => <div> Not Found </div>} />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  );
};

export { App };
