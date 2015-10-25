const React = require('react');

const JoinRoom = React.createClass({
  render: function() {
    return (
      <div className="joinRoomButton">
        <a className="button" onClick={this.showModal}>Join a room</a>
      </div>
    );
  },
});

module.exports = JoinRoom;
