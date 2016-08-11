import React from 'react';

import LandingContainer from './LandingContainer';
import JoinRoomContainer from './JoinRoomContainer';

const NotFoundContainer = () => (
  <LandingContainer>
    <JoinRoomContainer params={{boardId: null}} />
  </LandingContainer>
);

export default NotFoundContainer;
