import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Debts from '../pages/Debts';
import Debtors from '../pages/Debtors';
import Profile from '../pages/Profile';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/register" component={SignUp} />

    <Route path="/dashboard" isPrivate component={Dashboard} />
    <Route path="/debts" isPrivate component={Debts} />
    <Route path="/debtors" isPrivate component={Debtors} />
    <Route path="/profile" isPrivate component={Profile} />
  </Switch>
);

export default Routes;
