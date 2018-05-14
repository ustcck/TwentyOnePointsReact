import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Weight from './weight';
import WeightDetail from './weight-detail';
import WeightUpdate from './weight-update';
import WeightDeleteDialog from './weight-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={WeightUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={WeightUpdate} />
      <Route exact path={`${match.url}/:id`} component={WeightDetail} />
      <Route path={match.url} component={Weight} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={WeightDeleteDialog} />
  </>
);

export default Routes;
