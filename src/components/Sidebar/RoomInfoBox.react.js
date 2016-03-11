import React, { PropTypes } from 'react';

const propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

const RoomInfoBox = ({room}) => (
  <div className="sidebar-section">

    <h2>{room.name}</h2>

    <div className='room-description'>
      {room.description}
    </div>
  </div>
);

RoomInfoBox.propTypes = propTypes;
export default RoomInfoBox;
