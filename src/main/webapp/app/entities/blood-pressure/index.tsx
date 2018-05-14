import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import BloodPressure from './blood-pressure';
import BloodPressureDetail from './blood-pressure-detail';
import BloodPressureUpdate from './blood-pressure-update';
import BloodPressureDeleteDialog from './blood-pressure-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={BloodPressureUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={BloodPressureUpdate} />
      <Route exact path={`${match.url}/:id`} component={BloodPressureDetail} />
      <Route path={match.url} component={BloodPressure} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={BloodPressureDeleteDialog} />
  </>
);

export default Routes;
