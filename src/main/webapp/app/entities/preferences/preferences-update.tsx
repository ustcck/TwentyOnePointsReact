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
import { getEntity, updateEntity, createEntity, reset } from './preferences.reducer';
import { IPreferences } from 'app/shared/model/preferences.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IPreferencesUpdateProps {
  getEntity: ICrudGetAction<IPreferences>;
  updateEntity: ICrudPutAction<IPreferences>;
  createEntity: ICrudPutAction<IPreferences>;
  getUsers: ICrudGetAllAction<IUser>;
  users: IUser[];
  preferences: IPreferences;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface IPreferencesUpdateState {
  isNew: boolean;
  userId: number;
}

export class PreferencesUpdate extends React.Component<IPreferencesUpdateProps, IPreferencesUpdateState> {
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
      const { preferences } = this.props;
      const entity = {
        ...preferences,
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
    this.props.history.push('/entity/preferences');
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
    const { preferences, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-preferences-heading">
              <Translate contentKey="twentyOnePointsReactApp.preferences.home.createOrEditLabel">Create or edit a Preferences</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : preferences} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="weekly_goalLabel" for="weekly_goal">
                    <Translate contentKey="twentyOnePointsReactApp.preferences.weekly_goal">Weekly Goal</Translate>
                  </Label>
                  <AvField
                    type="number"
                    className="form-control"
                    name="weekly_goal"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      min: { value: 10, errorMessage: translate('entity.validation.min', { min: 10 }) },
                      max: { value: 21, errorMessage: translate('entity.validation.max', { max: 21 }) },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="weight_unitsLabel">
                    <Translate contentKey="twentyOnePointsReactApp.preferences.weight_units">Weight Units</Translate>
                  </Label>
                  <AvInput type="select" className="form-control" name="weight_units" value={(!isNew && preferences.weight_units) || 'kg'}>
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="user.login">
                    <Translate contentKey="twentyOnePointsReactApp.preferences.user">User</Translate>
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
                <Button tag={Link} id="cancel-save" to="/entity/preferences" replace color="info">
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
  preferences: storeState.preferences.entity,
  loading: storeState.preferences.loading,
  updating: storeState.preferences.updating
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesUpdate);
