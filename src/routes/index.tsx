import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Debts from '../pages/Debts';
import Debtors from '../pages/Debtors/List';
import DebtorDetail from '../pages/Debtors/Details';
import Profile from '../pages/Profile';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/register" component={SignUp} />

    <Route path="/dashboard" isPrivate component={Dashboard} />
    <Route path="/debts" exact isPrivate component={Debts} />
    <Route path="/debtors" exact isPrivate component={Debtors} />
    <Route
      path="/debtors/detail/:debtor_id"
      isPrivate
      component={DebtorDetail}
    />
    <Route path="/profile" isPrivate component={Profile} />
  </Switch>
);

export default Routes;
