import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './preferences.reducer';
import { IPreferences } from 'app/shared/model/preferences.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPreferencesDetailProps {
  getEntity: ICrudGetAction<IPreferences>;
  preferences: IPreferences;
  match: any;
}

export class PreferencesDetail extends React.Component<IPreferencesDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { preferences } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="twentyOnePointsReactApp.preferences.detail.title">Preferences</Translate> [<b>{preferences.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="weekly_goal">
                  <Translate contentKey="twentyOnePointsReactApp.preferences.weekly_goal">Weekly Goal</Translate>
                </span>
              </dt>
              <dd>{preferences.weekly_goal}</dd>
              <dt>
                <span id="weight_units">
                  <Translate contentKey="twentyOnePointsReactApp.preferences.weight_units">Weight Units</Translate>
                </span>
              </dt>
              <dd>{preferences.weight_units}</dd>
              <dt>
                <Translate contentKey="twentyOnePointsReactApp.preferences.user">User</Translate>
              </dt>
              <dd>{preferences.user ? preferences.user.login : ''}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/preferences" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          <Button tag={Link} to={`/entity/preferences/${preferences.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ preferences }) => ({
  preferences: preferences.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesDetail);
