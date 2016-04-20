import React from 'react';

import LandingContainer from './LandingContainer.react';
import JoinRoomContainer from './JoinRoomContainer.react';

const NotFoundContainer = () => (
  <LandingContainer>
    <JoinRoomContainer params={{boardId: null}} />
  </LandingContainer>
);

export default NotFoundContainer;
