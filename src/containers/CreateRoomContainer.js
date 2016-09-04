import React from 'react';

import ModalContainer from './ModalContainer';
import CreateForm from '../components/Modal/CreateForm';

const CreateRoomContainer = () => (
  <ModalContainer
    headerText='Create a room'
    restorePath='/'
  >
    <CreateForm />
  </ModalContainer>
);

export default CreateRoomContainer;
