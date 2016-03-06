import React from 'react';

import ModalContainer from './ModalContainer.react';
import JoinForm from '../components/Modal/JoinForm.react';

const JoinRoomContainer = ({boardId}) => (
  <ModalContainer
    headerText='Join a room'
    restorePath='/'
  >
    <JoinForm boardId={boardId} />
  </ModalContainer>
);

export default JoinRoomContainer;
