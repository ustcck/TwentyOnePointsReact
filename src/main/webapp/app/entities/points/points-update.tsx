import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './points.reducer';
import { IPoints } from 'app/shared/model/points.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IPointsUpdateProps {
  getEntity: ICrudGetAction<IPoints>;
  updateEntity: ICrudPutAction<IPoints>;
  createEntity: ICrudPutAction<IPoints>;
  getUsers: ICrudGetAllAction<IUser>;
  users: IUser[];
  points: IPoints;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface IPointsUpdateState {
  isNew: boolean;
  userId: number;
}

export class PointsUpdate extends React.Component<IPointsUpdateProps, IPointsUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { points } = this.props;
      const entity = {
        ...points,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/points');
  };

  userUpdate = element => {
    const login = element.target.value.toString();
    if (login === '') {
      this.setState({
        userId: -1
      });
    } else {
      for (const i in this.props.users) {
        if (login === this.props.users[i].login.toString()) {
          this.setState({
            userId: this.props.users[i].id
          });
        }
      }
    }
  };

  render() {
    const isInvalid = false;
    const { points, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-points-heading">
              <Translate contentKey="twentyOnePointsReactApp.points.home.createOrEditLabel">Create or edit a Points</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : points} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dateLabel" for="date">
                    <Translate contentKey="twentyOnePointsReactApp.points.date">Date</Translate>
                  </Label>
                  <AvField
                    type="date"
                    className="form-control"
                    name="date"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="exerciseLabel" for="exercise">
                    <Translate contentKey="twentyOnePointsReactApp.points.exercise">Exercise</Translate>
                  </Label>
                  <AvField type="number" className="form-control" name="exercise" />
                </AvGroup>
                <AvGroup>
                  <Label id="mealsLabel" for="meals">
                    <Translate contentKey="twentyOnePointsReactApp.points.meals">Meals</Translate>
                  </Label>
                  <AvField type="number" className="form-control" name="meals" />
                </AvGroup>
                <AvGroup>
                  <Label id="alcoholLabel" for="alcohol">
                    <Translate contentKey="twentyOnePointsReactApp.points.alcohol">Alcohol</Translate>
                  </Label>
                  <AvField type="number" className="form-control" name="alcohol" />
                </AvGroup>
                <AvGroup>
                  <Label id="notesLabel" for="notes">
                    <Translate contentKey="twentyOnePointsReactApp.points.notes">Notes</Translate>
                  </Label>
                  <AvField
                    type="text"
                    name="notes"
                    validate={{
                      maxLength: { value: 140, errorMessage: translate('entity.validation.maxlength', { max: 140 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="user.login">
                    <Translate contentKey="twentyOnePointsReactApp.points.user">User</Translate>
                  </Label>
                  <AvInput type="select" className="form-control" name="user.login" onChange={this.userUpdate}>
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.login} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput type="hidden" name="user.id" value={this.state.userId} />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/points" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={isInvalid || updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  users: storeState.userManagement.users,
  points: storeState.points.entity,
  loading: storeState.points.loading,
  updating: storeState.points.updating
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(PointsUpdate);
