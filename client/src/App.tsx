import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './Components/Login';
import HomePage from './Components/Home';

export default () => {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={LoginPage} />
        </Switch>
      </HashRouter>
    </div>
  );
};
