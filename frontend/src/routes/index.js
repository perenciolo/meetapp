import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Sign from '~/pages/Sign';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import Detail from '~/pages/Meetup/Detail';
import InsertEditForm from '~/pages/Meetup/InsertEditForm';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Sign} />
      <Route path="/register" component={Sign} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/meetup/detail" component={Detail} isPrivate />
      <Route path="/meetup/add" component={InsertEditForm} isPrivate />
      <Route path="/meetup/edit" component={InsertEditForm} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}
