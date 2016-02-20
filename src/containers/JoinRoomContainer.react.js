import React from 'react';

import ModalContainer from './ModalContainer.react';
import JoinForm from '../components/Modal/JoinForm.react';

const JoinRoomContainer = () => (
  <ModalContainer
    headerText='Join a room'
  >
    <JoinForm />
  </ModalContainer>
);

export default JoinRoomContainer;
