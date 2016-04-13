import React, { PropTypes } from 'react';

const propTypes = {
  room: PropTypes.shape({
    boardName: PropTypes.string.isRequired,
    boardDesc: PropTypes.string.isRequired,
  }),
};

const RoomInfoBox = ({room}) => (
  <div className="sidebar-section">

    <h2>{room.boardName}</h2>

    <div className='room-description'>
      {room.boardDesc}
    </div>
  </div>
);

RoomInfoBox.propTypes = propTypes;
export default RoomInfoBox;
