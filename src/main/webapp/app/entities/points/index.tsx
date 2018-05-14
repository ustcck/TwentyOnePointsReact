import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Points from './points';
import PointsDetail from './points-detail';
import PointsUpdate from './points-update';
import PointsDeleteDialog from './points-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={PointsUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={PointsUpdate} />
      <Route exact path={`${match.url}/:id`} component={PointsDetail} />
      <Route path={match.url} component={Points} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={PointsDeleteDialog} />
  </>
);

export default Routes;
