import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IBloodPressure } from 'app/shared/model/blood-pressure.model';
import { getEntity, deleteEntity } from './blood-pressure.reducer';

export interface IBloodPressureDeleteDialogProps {
  getEntity: ICrudGetAction<IBloodPressure>;
  deleteEntity: ICrudDeleteAction<IBloodPressure>;
  bloodPressure: IBloodPressure;
  match: any;
  history: any;
}

export class BloodPressureDeleteDialog extends React.Component<IBloodPressureDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.bloodPressure.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { bloodPressure } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody>
          <Translate contentKey="twentyOnePointsReactApp.bloodPressure.delete.question" interpolate={{ id: bloodPressure.id }}>
            Are you sure you want to delete this BloodPressure?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />&nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />&nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ bloodPressure }) => ({
  bloodPressure: bloodPressure.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

export default connect(mapStateToProps, mapDispatchToProps)(BloodPressureDeleteDialog);
