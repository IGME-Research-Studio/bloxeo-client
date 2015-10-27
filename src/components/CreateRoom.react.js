const React = require('react');
const Link  = require('react-router').Link;

const CreateRoom = React.createClass({
  render: function() {
    return (
      <div className="createRoomButton">
        <Link className="button" to="/workSpace">CreateRoom</Link>
      </div>
    );
  },
});

module.exports = CreateRoom;
