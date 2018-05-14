import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IPoints } from 'app/shared/model/points.model';
import { getEntity, deleteEntity } from './points.reducer';

export interface IPointsDeleteDialogProps {
  getEntity: ICrudGetAction<IPoints>;
  deleteEntity: ICrudDeleteAction<IPoints>;
  points: IPoints;
  match: any;
  history: any;
}

export class PointsDeleteDialog extends React.Component<IPointsDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.points.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { points } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody>
          <Translate contentKey="twentyOnePointsReactApp.points.delete.question" interpolate={{ id: points.id }}>
            Are you sure you want to delete this Points?
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

const mapStateToProps = ({ points }) => ({
  points: points.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

export default connect(mapStateToProps, mapDispatchToProps)(PointsDeleteDialog);
