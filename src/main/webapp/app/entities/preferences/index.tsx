import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Preferences from './preferences';
import PreferencesDetail from './preferences-detail';
import PreferencesUpdate from './preferences-update';
import PreferencesDeleteDialog from './preferences-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={PreferencesUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={PreferencesUpdate} />
      <Route exact path={`${match.url}/:id`} component={PreferencesDetail} />
      <Route path={match.url} component={Preferences} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={PreferencesDeleteDialog} />
  </>
);

export default Routes;
