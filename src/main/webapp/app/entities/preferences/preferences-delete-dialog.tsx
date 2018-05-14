import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IPreferences } from 'app/shared/model/preferences.model';
import { getEntity, deleteEntity } from './preferences.reducer';

export interface IPreferencesDeleteDialogProps {
  getEntity: ICrudGetAction<IPreferences>;
  deleteEntity: ICrudDeleteAction<IPreferences>;
  preferences: IPreferences;
  match: any;
  history: any;
}

export class PreferencesDeleteDialog extends React.Component<IPreferencesDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.preferences.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { preferences } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody>
          <Translate contentKey="twentyOnePointsReactApp.preferences.delete.question" interpolate={{ id: preferences.id }}>
            Are you sure you want to delete this Preferences?
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

const mapStateToProps = ({ preferences }) => ({
  preferences: preferences.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesDeleteDialog);
