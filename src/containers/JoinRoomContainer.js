import React from 'react';

import ModalContainer from './ModalContainer';
import JoinForm from '../components/Modal/JoinForm';

const JoinRoomContainer = ({params: {boardId}}) => (
  <ModalContainer
    headerText='Join a room'
    restorePath='/'
  >
    <JoinForm boardId={boardId} />
  </ModalContainer>
);

export default JoinRoomContainer;
