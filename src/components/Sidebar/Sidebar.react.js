import React, { PropTypes } from 'react';

import Brand from './Brand.react';
import RoomInfoBox from './RoomInfoBox.react';
import MembersList from './MembersList.react';
import Wordbank from './Wordbank.react';
import IdeaCreate from './IdeaCreate.react';
import VotingModal from '../Voting/VotingModal.react';

const propTypes = {
  room: PropTypes.object.isRequired,
  ideas: PropTypes.array.isRequired,
  timerStatus: PropTypes.object,
};

const Sidebar = ({room, ideas, timerStatus}) => (
  <div className="sidebar">
    <div className="sidebar-info">
      <Brand />
      <RoomInfoBox room={room} />
      <MembersList users={room.users}/>
      <VotingModal />
    </div>

    <Wordbank data={ideas} />

    <div>
      <IdeaCreate timerStatus={timerStatus} />
    </div>
  </div>
);

Sidebar.propTypes = propTypes;
export default Sidebar;
