import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Store } from 'redux';

import { History } from 'history';
import './App.scss';
import { LoginPage } from './components/Auth';
import { MainPage } from './components/MainPage/MainPage';
import { ApplicationState } from './store';

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
            <Route exact path='/' component={MainPage} />
            <Route exact path='/login' component={LoginPage} />
            <Route component={() => <div>Not Found</div>} />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  );
};

export { App };
