import React, { PropTypes } from 'react';

import Brand from './Brand';
import RoomInfoBox from './RoomInfoBox';
import MembersList from './MembersList';
import Wordbank from './Wordbank';
import IdeaCreate from './IdeaCreate';
import VotingModal from '../Voting/VotingModal';

const propTypes = {
  room: PropTypes.object.isRequired,
  ideas: PropTypes.array.isRequired,
  boardId: PropTypes.string.isRequired,
};

const Sidebar = ({room, ideas, boardId}) => (
  <div className="sidebar">
    <div className="sidebar-info">
      <Brand />
      <RoomInfoBox room={room} />
      <MembersList users={room.users}/>
      <VotingModal boardId={boardId}/>
    </div>

    <Wordbank data={ideas} />

    <div>
      <IdeaCreate />
    </div>
  </div>
);

Sidebar.propTypes = propTypes;
export default Sidebar;
