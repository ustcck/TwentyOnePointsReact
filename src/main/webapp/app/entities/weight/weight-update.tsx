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
import { getEntity, updateEntity, createEntity, reset } from './weight.reducer';
import { IWeight } from 'app/shared/model/weight.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IWeightUpdateProps {
  getEntity: ICrudGetAction<IWeight>;
  updateEntity: ICrudPutAction<IWeight>;
  createEntity: ICrudPutAction<IWeight>;
  getUsers: ICrudGetAllAction<IUser>;
  users: IUser[];
  weight: IWeight;
  reset: Function;
  loading: boolean;
  updating: boolean;
  match: any;
  history: any;
}

export interface IWeightUpdateState {
  isNew: boolean;
  userId: number;
}

export class WeightUpdate extends React.Component<IWeightUpdateProps, IWeightUpdateState> {
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
    values.datetime = new Date(values.datetime);

    if (errors.length === 0) {
      const { weight } = this.props;
      const entity = {
        ...weight,
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
    this.props.history.push('/entity/weight');
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
    const { weight, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhi-weight-heading">
              <Translate contentKey="twentyOnePointsReactApp.weight.home.createOrEditLabel">Create or edit a Weight</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : weight} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="datetimeLabel" for="datetime">
                    <Translate contentKey="twentyOnePointsReactApp.weight.datetime">Datetime</Translate>
                  </Label>
                  <AvInput
                    type="datetime-local"
                    className="form-control"
                    name="datetime"
                    value={isNew ? null : convertDateTimeFromServer(this.props.weight.datetime)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="weigthLabel" for="weigth">
                    <Translate contentKey="twentyOnePointsReactApp.weight.weigth">Weigth</Translate>
                  </Label>
                  <AvField
                    type="number"
                    className="form-control"
                    name="weigth"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="user.login">
                    <Translate contentKey="twentyOnePointsReactApp.weight.user">User</Translate>
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
                <Button tag={Link} id="cancel-save" to="/entity/weight" replace color="info">
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
  weight: storeState.weight.entity,
  loading: storeState.weight.loading,
  updating: storeState.weight.updating
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(WeightUpdate);
