import React, { PropTypes }  from 'react';
import Avatar from '../Avatar.react';

const propTypes = {
  users: PropTypes.array.isRequired,
};

const MembersList = ({users}) => (
  <div className="sidebar-section">
    {users.map((member) => <Avatar name={member.username} /> )}
  </div>
);

MembersList.propTypes = propTypes;
export default MembersList;
