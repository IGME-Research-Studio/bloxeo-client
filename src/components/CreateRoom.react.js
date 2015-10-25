const React = require('react');

const CreateRoom = React.createClass({
  render: function() {
    return (
      <div className="createRoomButton">
        <a className="button" onClick={this.showModal}>Create a room</a>
      </div>
    );
  },
});

module.exports = CreateRoom;
