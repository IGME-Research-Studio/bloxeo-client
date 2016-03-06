import React from 'react';

import ModalContainer from './ModalContainer.react';
import CreateForm from '../components/Modal/CreateForm.react';

const CreateRoomContainer = () => (
  <ModalContainer
    headerText='Create a room'
    restorePath='/'
  >
    <CreateForm />
  </ModalContainer>
);

export default CreateRoomContainer;
