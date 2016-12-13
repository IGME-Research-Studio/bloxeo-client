import React, { PropTypes } from 'react';

import Brand from './Brand';
import RoomInfoBox from './RoomInfoBox';
import MembersList from './MembersList';
import Wordbank from './Wordbank';
import IdeaCreate from './IdeaCreate';

const propTypes = {
  room: PropTypes.object.isRequired,
  ideas: PropTypes.array.isRequired,
  boardId: PropTypes.string.isRequired,
};

const Sidebar = ({room, ideas}) => (
  <div className="sidebar">
    <div className="sidebar-info">
      <Brand />
      <RoomInfoBox room={room} />
      <MembersList users={room.users}/>
    </div>

    <Wordbank data={ideas} />

    <div>
      <IdeaCreate />
    </div>
  </div>
);

Sidebar.propTypes = propTypes;
export default Sidebar;
