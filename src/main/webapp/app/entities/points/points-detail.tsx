import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getEntity } from './points.reducer';
import { IPoints } from 'app/shared/model/points.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPointsDetailProps {
  getEntity: ICrudGetAction<IPoints>;
  points: IPoints;
  match: any;
}

export class PointsDetail extends React.Component<IPointsDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { points } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="twentyOnePointsReactApp.points.detail.title">Points</Translate> [<b>{points.id}</b>]
          </h2>
          <Row size="md">
            <dl className="jh-entity-details">
              <dt>
                <span id="date">
                  <Translate contentKey="twentyOnePointsReactApp.points.date">Date</Translate>
                </span>
              </dt>
              <dd>
                <TextFormat value={points.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
              </dd>
              <dt>
                <span id="exercise">
                  <Translate contentKey="twentyOnePointsReactApp.points.exercise">Exercise</Translate>
                </span>
              </dt>
              <dd>{points.exercise}</dd>
              <dt>
                <span id="meals">
                  <Translate contentKey="twentyOnePointsReactApp.points.meals">Meals</Translate>
                </span>
              </dt>
              <dd>{points.meals}</dd>
              <dt>
                <span id="alcohol">
                  <Translate contentKey="twentyOnePointsReactApp.points.alcohol">Alcohol</Translate>
                </span>
              </dt>
              <dd>{points.alcohol}</dd>
              <dt>
                <span id="notes">
                  <Translate contentKey="twentyOnePointsReactApp.points.notes">Notes</Translate>
                </span>
              </dt>
              <dd>{points.notes}</dd>
              <dt>
                <Translate contentKey="twentyOnePointsReactApp.points.user">User</Translate>
              </dt>
              <dd>{points.user ? points.user.login : ''}</dd>
            </dl>
          </Row>
          <Button tag={Link} to="/entity/points" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          <Button tag={Link} to={`/entity/points/${points.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ points }) => ({
  points: points.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(PointsDetail);
