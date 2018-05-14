import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './blood-pressure.reducer';
import { IBloodPressure } from 'app/shared/model/blood-pressure.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBloodPressureDetailProps {
  getEntity: ICrudGetAction<IBloodPressure>;
  bloodPressure: IBloodPressure;
  match: any;
}

export class BloodPressureDetail extends React.Component<IBloodPressureDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { bloodPressure } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="twentyOnePointsReactApp.bloodPressure.detail.title">BloodPressure</Translate> [<b>{bloodPressure.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="datetime">
                  <Translate contentKey="twentyOnePointsReactApp.bloodPressure.datetime">Datetime</Translate>
                </span>
              </dt>
              <dd>
                <TextFormat value={bloodPressure.datetime} type="date" format={APP_DATE_FORMAT} />
              </dd>
              <dt>
                <span id="systolic">
                  <Translate contentKey="twentyOnePointsReactApp.bloodPressure.systolic">Systolic</Translate>
                </span>
              </dt>
              <dd>{bloodPressure.systolic}</dd>
              <dt>
                <span id="diastolic">
                  <Translate contentKey="twentyOnePointsReactApp.bloodPressure.diastolic">Diastolic</Translate>
                </span>
              </dt>
              <dd>{bloodPressure.diastolic}</dd>
              <dt>
                <Translate contentKey="twentyOnePointsReactApp.bloodPressure.user">User</Translate>
              </dt>
              <dd>{bloodPressure.user ? bloodPressure.user.login : ''}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/blood-pressure" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          <Button tag={Link} to={`/entity/blood-pressure/${bloodPressure.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ bloodPressure }) => ({
  bloodPressure: bloodPressure.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(BloodPressureDetail);
