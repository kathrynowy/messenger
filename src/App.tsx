import React, { Component, Fragment } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { Dialogues } from './components/Dialogues/Dialogues';
import menuStore from './store/menu-store';
import './App.scss';


export const history = require("history").createBrowserHistory;

class App extends Component {
  render() {
    console.log(menuStore);
    return (
      <Fragment>
        {menuStore.show ? <div> hello </div> : ''}
      <Router  history={history}>
     <div className="app-container">
       
       <Switch>
        <Route exact path="/" component={Dialogues} />
       </Switch>
     </div>
     </Router>
     </Fragment>
    );
  }
}


export { App };
