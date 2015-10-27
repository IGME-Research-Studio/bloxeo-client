const React = require('react');
const Link  = require('react-router').Link;


const JoinRoom = React.createClass({
  render: function() {
    return (
      <div className="joinRoomButton">
          <Link to="/workSpace" className="button">Join a room</Link>
      </div>
    );
  },
});

module.exports = JoinRoom;
