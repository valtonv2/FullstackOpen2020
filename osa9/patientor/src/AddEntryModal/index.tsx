import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { NewHealthCheckEntry, NewOccupationalEntry, NewHospitalEntry } from '../types';
import AddHealthCheckForm from './AddHealthCheckForm';
import AddOccupationalEntryForm from './AddOccupationalEntryForm';
import AddHospitalEntryForm from './AddHospitalEntryForm';


interface CommonModalProps {

    modalOpen: boolean;
    onClose: () => void;
    error?: string;

}

interface HealthCheckProps extends CommonModalProps {
  
  onSubmit: (values: NewHealthCheckEntry) => void;
  
}

interface OccupationalProps extends CommonModalProps {
   
    onSubmit: (values: NewOccupationalEntry) => void;
    
  }

  interface HospitalProps extends CommonModalProps{
    
    onSubmit: (values: NewHospitalEntry) => void;
    
  }

export const AddHealthCheckModal = ({ modalOpen, onClose, onSubmit, error }: HealthCheckProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new Health check entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddHealthCheckForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const AddOccupationalCheckModal = ({ modalOpen, onClose, onSubmit, error }: OccupationalProps) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new occupational check entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddOccupationalEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
  );

export const AddHospitalCheckModal = ({ modalOpen, onClose, onSubmit, error }: HospitalProps) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new occupational check entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
  );



